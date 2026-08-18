const Task = require("../models/Task");


exports.getStatusBreakdown = async (req, res) => {
  try {
    const { projectId } = req.query;

    const filter = {};

    if (projectId) {
      filter.projectId = projectId;
    }

    const tasks = await Task.find(filter)
      .select("status");

    const result = {
      todo: 0,
      in_progress: 0,
      done: 0,
      blocked: 0
    };

    tasks.forEach((task) => {
      if (result[task.status] !== undefined) {
        result[task.status]++;
      }
    });

    res.json(result);

  } catch (error) {
    console.error("STATUS ERROR:", error);

    res.status(500).json({
      error: error.message
    });
  }
};




exports.getUserPerformance = async (req, res) => {
  try {

    const tasks = await Task.find()
      .select("status assignedTo")
      .populate({
        path: "assignedTo",
        select: "name"
      });


    const users = {};


    tasks.forEach((task) => {

      // Task has no assigned user
      if (!task.assignedTo) {
        return;
      }


      const userId =
        task.assignedTo._id.toString();


      if (!users[userId]) {

        users[userId] = {
          userId: task.assignedTo._id,
          name: task.assignedTo.name,
          total: 0,
          completed: 0
        };

      }


      users[userId].total++;


      if (task.status === "done") {
        users[userId].completed++;
      }

    });


    const result =
      Object.values(users).map((user) => {

        const completionRate =
          user.total > 0
            ? (user.completed / user.total) * 100
            : 0;


        return {
          userId: user.userId,
          name: user.name,
          total: user.total,
          completed: user.completed,
          completionRate:
            Number(completionRate.toFixed(1))
        };

      });


    result.sort(
      (a, b) =>
        b.completionRate -
        a.completionRate
    );


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


exports.getOverdueTasks = async (req, res) => {
  try {

    const now = new Date();


    const tasks = await Task.find({

      status: {
        $ne: "done"
      },

      dueDate: {
        $exists: true,
        $ne: null,
        $lt: now
      }

    })
      .select(
        "title status dueDate assignedTo"
      )
      .populate({
        path: "assignedTo",
        select: "name"
      });


    const result =
      tasks.map((task) => {

        let daysOverdue = 0;


        if (task.dueDate) {

          const difference =
            Date.now() -
            task.dueDate.getTime();


          daysOverdue =
            Math.floor(
              difference /
              (1000 * 60 * 60 * 24)
            );

        }


        return {

          title: task.title,

          status: task.status,

          dueDate: task.dueDate,

          assignee:
            task.assignedTo
              ? task.assignedTo.name
              : "Unassigned",

          daysOverdue

        };

      });


    result.sort(
      (a, b) =>
        b.daysOverdue -
        a.daysOverdue
    );


    res.json(result);

  } catch (error) {

    console.error(
      "OVERDUE TASK ERROR:",
      error
    );

    res.status(500).json({
      error: error.message
    });

  }
};


// ==========================================
// 4. TREND
// ==========================================

exports.getTrend = async (req, res) => {
  try {

    const tasks = await Task.find()
      .select(
        "createdAt completedAt"
      );


    const created = {};

    const completed = {};


    tasks.forEach((task) => {

      if (task.createdAt) {

        const week =
          getWeek(task.createdAt);


        if (!created[week]) {
          created[week] = 0;
        }

        created[week]++;

      }


      if (task.completedAt) {

        const week =
          getWeek(task.completedAt);


        if (!completed[week]) {
          completed[week] = 0;
        }

        completed[week]++;

      }

    });


    res.json({
      created,
      completed
    });

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


function getWeek(date) {

  const d = new Date(date);

  const day = d.getDay();

  const diff =
    d.getDate() -
    day +
    (day === 0 ? -6 : 1);


  const monday =
    new Date(d);

  monday.setDate(diff);


  return monday
    .toISOString()
    .split("T")[0];

}


// ==========================================
// 5. PRIORITY DISTRIBUTION
// ==========================================

exports.getPriorityDistribution = async (req, res) => {
  try {

    const tasks = await Task.find()
      .select(
        "projectId priority"
      )
      .populate({
        path: "projectId",
        select: "name"
      });


    const projects = {};


    tasks.forEach((task) => {

      if (!task.projectId) {
        return;
      }


      const projectId =
        task.projectId._id.toString();


      if (!projects[projectId]) {

        projects[projectId] = {

          projectName:
            task.projectId.name,

          total: 0,

          breakdown: {

            low: 0,

            medium: 0,

            high: 0

          }

        };

      }


      projects[projectId].total++;


      if (
        projects[projectId]
          .breakdown[task.priority]
        !== undefined
      ) {

        projects[projectId]
          .breakdown[task.priority]++;

      }

    });


    res.json(
      Object.values(projects)
    );

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


// ==========================================
// 6. COMPLETION TIME
// ==========================================

exports.getCompletionTime = async (req, res) => {
  try {

    const tasks = await Task.find({

      status: "done",

      completedAt: {
        $ne: null
      }

    }).select(
      "priority createdAt completedAt"
    );


    const priorities = {};


    tasks.forEach((task) => {

      const hours =
        (
          task.completedAt -
          task.createdAt
        ) /
        (1000 * 60 * 60);


      if (!priorities[task.priority]) {

        priorities[task.priority] = {

          totalHours: 0,

          count: 0

        };

      }


      priorities[task.priority]
        .totalHours += hours;


      priorities[task.priority]
        .count++;

    });


    const result =
      Object.entries(
        priorities
      ).map(
        ([priority, data]) => {

          return {

            priority,

            avgHours:
              Number(
                (
                  data.totalHours /
                  data.count
                ).toFixed(1)
              ),

            count:
              data.count

          };

        }
      );


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


// ==========================================
// 7. SUMMARY
// ==========================================

exports.getSummary = async (req, res) => {
  try {

    const tasks = await Task.find()
      .select(
        "status priority dueDate"
      );


    const statusBreakdown = {};

    const priorityBreakdown = {};

    let overdueCount = 0;


    tasks.forEach((task) => {

      // Status

      if (
        !statusBreakdown[task.status]
      ) {

        statusBreakdown[task.status] = 0;

      }

      statusBreakdown[task.status]++;


      // Priority

      if (
        !priorityBreakdown[task.priority]
      ) {

        priorityBreakdown[task.priority] = 0;

      }

      priorityBreakdown[task.priority]++;


      // Overdue

      if (

        task.status !== "done" &&

        task.dueDate &&

        task.dueDate < new Date()

      ) {

        overdueCount++;

      }

    });


    res.json({

      totalTasks:
        tasks.length,

      statusBreakdown,

      priorityBreakdown,

      overdueCount

    });

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