const fs = require("fs");
const { pipeline } = require("stream");

const LineTransform = require("./line-transform");
const LogTransform = require("./log-transform");
const StatsWriter = require("./stats-writer");

const input = fs.createReadStream("./logs/server.log", {
  highWaterMark: 20
});

const lineTransform = new LineTransform();
const logTransform = new LogTransform();
const statsWriter = new StatsWriter();

pipeline(
  input,
  lineTransform,
  logTransform,
  statsWriter,
  (error) => {
    if (error) {
      console.error("Pipeline failed:", error.message);
      return;
    }

    console.log("Pipeline completed successfully");

    console.log("\nLOG ANALYSIS");
    console.log("============");

    console.log(statsWriter.getStats());
  }
);