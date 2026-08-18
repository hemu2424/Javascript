const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    status: {
      type: String,
      enum: ["todo", "in_progress", "done", "blocked"],
      default: "todo"
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },

    dueDate: {
      type: Date
    },

    completedAt: {
      type: Date,
      default: null
    },

    tags: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: false
    }
  }
);

// Indexes
taskSchema.index({ status: 1 });
taskSchema.index({ assignedTo: 1, status: 1 });
taskSchema.index({ projectId: 1 });
taskSchema.index({ dueDate: 1 });
taskSchema.index({ createdAt: 1 });

module.exports = mongoose.model("Task", taskSchema);