const Task = require("../models/Task");

// ==========================================
// GET ALL TASKS
// GET /api/tasks
// ==========================================

exports.listTasks = async (req, res) => {
  try {
    const { status, assignedTo, projectId } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (assignedTo) {
      filter.assignedTo = assignedTo;
    }

    if (projectId) {
      filter.projectId = projectId;
    }

    const tasks = await Task.find(filter)
      .sort({ createdAt: -1 })
      .limit(200);

    res.json(tasks);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};


// ==========================================
// GET SINGLE TASK
// GET /api/tasks/:id
// ==========================================

exports.getTask = async (req, res) => {
  try {

    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        error: "Task not found"
      });
    }

    res.json(task);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};


// ==========================================
// CREATE TASK
// POST /api/tasks
// ==========================================

exports.createTask = async (req, res) => {
  try {

    const {
      title,
      description,
      projectId,
      assignedTo,
      createdBy,
      priority,
      dueDate,
      tags
    } = req.body;


    const task = await Task.create({

      title,

      description,

      projectId,

      assignedTo,

      createdBy,

      priority,

      dueDate,

      tags

    });


    res.status(201).json(task);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};


// ==========================================
// UPDATE TASK STATUS
// PATCH /api/tasks/:id/status
// ==========================================

exports.updateStatus = async (req, res) => {
  try {

    const { status } = req.body;


    const update = {

      status,

      completedAt:
        status === "done"
          ? new Date()
          : null

    };


    const task =
      await Task.findByIdAndUpdate(
        req.params.id,
        update,
        {
          new: true,
          runValidators: true
        }
      );


    if (!task) {

      return res.status(404).json({
        error: "Task not found"
      });

    }


    res.json(task);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};


// ==========================================
// UPDATE TASK
// PUT /api/tasks/:id
// ==========================================

exports.updateTask = async (req, res) => {
  try {

    const task =
      await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );


    if (!task) {

      return res.status(404).json({
        error: "Task not found"
      });

    }


    res.json(task);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};


// ==========================================
// DELETE TASK
// DELETE /api/tasks/:id
// ==========================================

exports.deleteTask = async (req, res) => {
  try {

    const task =
      await Task.findByIdAndDelete(
        req.params.id
      );


    if (!task) {

      return res.status(404).json({
        error: "Task not found"
      });

    }


    res.json({
      message: "Task deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};