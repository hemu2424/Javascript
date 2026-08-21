const mongoose = require("mongoose");
const Task = require("../models/Task");


// ======================================================
// 1. STATUS BREAKDOWN
// GET /api/reports/status
// GET /api/reports/status?projectId=PROJECT_ID
// ======================================================

exports.getStatusBreakdown = async (req, res) => {
  try {
    const { projectId } = req.query;

    const pipeline = [];

    // Optional project filter
    if (projectId) {
      pipeline.push({
        $match: {
          projectId: new mongoose.Types.ObjectId(projectId)
        }
      });
    }

    // Group tasks according to status
    pipeline.push({
      $group: {
        _id: "$status",
        count: { $sum: 1 }
      }
    });

    // Sort highest count first
    pipeline.push({
      $sort: {
        count: -1
      }
    });

    const result = await Task.aggregate(pipeline);

    res.json(result);

  } catch (error) {
    console.error("STATUS ERROR:", error);

    res.status(500).json({
      error: error.message
    });
  }
};


// ======================================================
// 2. USER PERFORMANCE
// GET /api/reports/users
// ======================================================

exports.getUserPerformance = async (req, res) => {
  try {

    const result = await Task.aggregate([

      // Group tasks by assigned user
      {
        $group: {
          _id: "$assignedTo",

          total: {
            $sum: 1
          },

          completed: {
            $sum: {
              $cond: [
                { $eq: ["$status", "done"] },
                1,
                0
              ]
            }
          }
        }
      },

      // Calculate completion percentage
      {
        $addFields: {
          completionRate: {
            $multiply: [
              {
                $divide: [
                  "$completed",
                  "$total"
                ]
              },
              100
            ]
          }
        }
      },

      // Get user information
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },

      // Convert user array into object
      {
        $unwind: "$user"
      },

      // Select required fields
      {
        $project: {
          _id: 0,

          userId: "$user._id",

          name: "$user.name",

          total: 1,

          completed: 1,

          completionRate: {
            $round: [
              "$completionRate",
              1
            ]
          }
        }
      },

      // Highest completion rate first
      {
        $sort: {
          completionRate: -1
        }
      }

    ]);

    res.json(result);

  } catch (error) {

    console.error(
      "USER PERFORMANCE ERROR:",
      error
    );

    res.status(500).json({
      error: error.message
    });
  }
};


// ======================================================
// 3. OVERDUE TASKS
// GET /api/reports/overdue
// ======================================================

exports.getOverdueTasks = async (req, res) => {
  try {

    const result = await Task.aggregate([

      // Find incomplete tasks whose due date has passed
      {
        $match: {
          status: {
            $ne: "done"
          },

          dueDate: {
            $exists: true,
            $ne: null,
            $lt: new Date()
          }
        }
      },

      // Get user information
      {
        $lookup: {
          from: "users",
          localField: "assignedTo",
          foreignField: "_id",
          as: "user"
        }
      },

      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true
        }
      },

      // Calculate days overdue
      {
        $project: {

          title: 1,

          status: 1,

          dueDate: 1,

          assignee: {
            $ifNull: [
              "$user.name",
              "Unassigned"
            ]
          },

          daysOverdue: {
            $dateDiff: {
              startDate: "$dueDate",
              endDate: "$$NOW",
              unit: "day"
            }
          }
        }
      },

      // Most overdue first
      {
        $sort: {
          daysOverdue: -1
        }
      }

    ]);

    res.json(result);

  } catch (error) {

    console.error(
      "OVERDUE ERROR:",
      error
    );

    res.status(500).json({
      error: error.message
    });
  }
};


// ======================================================
// 4. WEEKLY TREND
// GET /api/reports/trend
// ======================================================

exports.getTrend = async (req, res) => {
  try {

    const result = await Task.aggregate([

      {
        $facet: {

          // --------------------------
          // Created tasks
          // --------------------------

          created: [

            {
              $group: {

                _id: {
                  $dateTrunc: {
                    date: "$createdAt",
                    unit: "week"
                  }
                },

                count: {
                  $sum: 1
                }

              }
            },

            {
              $sort: {
                _id: 1
              }
            }

          ],


          // --------------------------
          // Completed tasks
          // --------------------------

          completed: [

            {
              $match: {
                completedAt: {
                  $ne: null
                }
              }
            },

            {
              $group: {

                _id: {
                  $dateTrunc: {
                    date: "$completedAt",
                    unit: "week"
                  }
                },

                count: {
                  $sum: 1
                }

              }
            },

            {
              $sort: {
                _id: 1
              }
            }

          ]

        }
      }

    ]);

    res.json(result[0]);

  } catch (error) {

    console.error(
      "TREND ERROR:",
      error
    );

    res.status(500).json({
      error: error.message
    });
  }
};


// ======================================================
// 5. PRIORITY DISTRIBUTION BY PROJECT
// GET /api/reports/priority
// ======================================================

exports.getPriorityDistribution = async (req, res) => {
  try {

    const result = await Task.aggregate([

      // First group by project + priority
      {
        $group: {

          _id: {
            project: "$projectId",
            priority: "$priority"
          },

          count: {
            $sum: 1
          }

        }
      },


      // Group again by project
      {
        $group: {

          _id: "$_id.project",

          total: {
            $sum: "$count"
          },

          breakdown: {
            $push: {

              priority: "$_id.priority",

              count: "$count"

            }
          }

        }
      },


      // Get project information
      {
        $lookup: {

          from: "projects",

          localField: "_id",

          foreignField: "_id",

          as: "project"

        }
      },


      {
        $unwind: "$project"
      },


      // Final response
      {
        $project: {

          _id: 0,

          projectName:
            "$project.name",

          total: 1,

          breakdown: 1

        }
      }

    ]);

    res.json(result);

  } catch (error) {

    console.error(
      "PRIORITY ERROR:",
      error
    );

    res.status(500).json({
      error: error.message
    });
  }
};


// ======================================================
// 6. AVERAGE COMPLETION TIME
// GET /api/reports/completion-time
// ======================================================

exports.getCompletionTime = async (req, res) => {
  try {

    const result = await Task.aggregate([

      // Only completed tasks
      {
        $match: {

          status: "done",

          completedAt: {
            $ne: null
          }

        }
      },


      // Calculate hours taken
      {
        $project: {

          priority: 1,

          hoursToComplete: {

            $divide: [

              {
                $subtract: [
                  "$completedAt",
                  "$createdAt"
                ]
              },

              1000 * 60 * 60

            ]

          }

        }
      },


      // Group by priority
      {
        $group: {

          _id: "$priority",

          avgHours: {
            $avg: "$hoursToComplete"
          },

          count: {
            $sum: 1
          }

        }
      },


      // Round average
      {
        $project: {

          _id: 0,

          priority: "$_id",

          avgHours: {
            $round: [
              "$avgHours",
              1
            ]
          },

          count: 1

        }
      },


      {
        $sort: {
          priority: 1
        }
      }

    ]);

    res.json(result);

  } catch (error) {

    console.error(
      "COMPLETION TIME ERROR:",
      error
    );

    res.status(500).json({
      error: error.message
    });
  }
};


// ======================================================
// 7. DASHBOARD SUMMARY
// GET /api/reports/summary
// ======================================================

exports.getSummary = async (req, res) => {
  try {

    const result = await Task.aggregate([

      {
        $facet: {

          // --------------------------
          // Status
          // --------------------------

          statusBreakdown: [

            {
              $group: {

                _id: "$status",

                count: {
                  $sum: 1
                }

              }
            }

          ],


          // --------------------------
          // Priority
          // --------------------------

          priorityBreakdown: [

            {
              $group: {

                _id: "$priority",

                count: {
                  $sum: 1
                }

              }
            }

          ],


          // --------------------------
          // Overdue
          // --------------------------

          overdueCount: [

            {
              $match: {

                status: {
                  $ne: "done"
                },

                dueDate: {
                  $exists: true,
                  $ne: null,
                  $lt: new Date()
                }

              }
            },

            {
              $count: "count"
            }

          ],


          // --------------------------
          // Total tasks
          // --------------------------

          totalTasks: [

            {
              $count: "count"
            }

          ]

        }
      }

    ]);


    res.json(result[0]);

  } catch (error) {

    console.error(
      "SUMMARY ERROR:",
      error
    );

    res.status(500).json({
      error: error.message
    });
  }
};