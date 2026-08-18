require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User");
const Project = require("./models/Project");
const Task = require("./models/Task");

const STATUSES = ["todo", "in_progress", "done", "blocked"];
const PRIORITIES = ["low", "medium", "high"];
const TAG_POOL = ["frontend", "backend", "ui", "bug", "api", "infra", "docs", "testing"];

const USER_NAMES = [
  "Riya Shah", "Aarav Patel", "Meera Joshi", "Karan Mehta",
  "Sneha Rao", "Dev Malhotra", "Isha Kapoor", "Vikram Nair"
];

const PROJECT_NAMES = ["Website Redesign", "Mobile App v2", "API Migration", "Internal Tools"];

const TASK_TITLES = [
  "Design login page", "Fix navbar overlap bug", "Set up CI pipeline",
  "Write API documentation", "Implement OAuth flow", "Optimize DB queries",
  "Build settings page", "Add unit tests for auth", "Refactor payment module",
  "Create onboarding flow", "Fix memory leak in worker", "Add dark mode",
  "Migrate to new API version", "Set up error monitoring", "Improve load time",
  "Add pagination to list view", "Write integration tests", "Design email templates",
  "Fix mobile layout issues", "Set up staging environment"
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomSubset(arr, max) {
  const count = Math.floor(Math.random() * max) + 1;
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
}

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

function daysFromNow(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
}

async function seed() {
  await connectDB();

  await Promise.all([User.deleteMany({}), Project.deleteMany({}), Task.deleteMany({})]);

  const users = await User.insertMany(
    USER_NAMES.map((name, i) => ({
      name,
      email: `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      role: i === 0 ? "admin" : i < 3 ? "manager" : "member"
    }))
  );

  const projects = await Project.insertMany(
    PROJECT_NAMES.map((name) => ({
      name,
      createdBy: randomItem(users)._id
    }))
  );

  const tasks = [];
  const totalTasks = 90;

  for (let i = 0; i < totalTasks; i++) {
    const status = randomItem(STATUSES);
    const createdAt = daysAgo(Math.floor(Math.random() * 60));
    const dueDate = daysFromNow(Math.floor(Math.random() * 30) - 15);
    let completedAt = null;

    if (status === "done") {
      const completionOffsetHours = Math.floor(Math.random() * 96) + 2;
      completedAt = new Date(createdAt.getTime() + completionOffsetHours * 60 * 60 * 1000);
    }

    tasks.push({
      title: randomItem(TASK_TITLES),
      description: "Auto-generated seed task for dashboard testing.",
      projectId: randomItem(projects)._id,
      assignedTo: randomItem(users)._id,
      createdBy: randomItem(users)._id,
      status,
      priority: randomItem(PRIORITIES),
      dueDate,
      createdAt,
      completedAt,
      tags: randomSubset(TAG_POOL, 3)
    });
  }

  await Task.insertMany(tasks);

  console.log(`Seeded ${users.length} users, ${projects.length} projects, ${tasks.length} tasks.`);
  await mongoose.connection.close();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
