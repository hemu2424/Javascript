const express = require("express");

const router = express.Router();

const {
  getStatusBreakdown,
  getUserPerformance,
  getOverdueTasks,
  getTrend,
  getPriorityDistribution,
  getCompletionTime,
  getSummary
} = require("../controllers/reportController");


router.get(
  "/status",
  getStatusBreakdown
);

router.get(
  "/users",
  getUserPerformance
);

router.get(
  "/overdue",
  getOverdueTasks
);

router.get(
  "/trend",
  getTrend
);

router.get(
  "/priority",
  getPriorityDistribution
);

router.get(
  "/completion-time",
  getCompletionTime
);

router.get(
  "/summary",
  getSummary
);


module.exports = router;