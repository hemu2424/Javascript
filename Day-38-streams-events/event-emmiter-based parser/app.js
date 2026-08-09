const fs = require("fs");
const { pipeline } = require("stream");

const LineTransform = require("./line-transform");
const LogTransform = require("./log-transform");
const StatsWriter = require("./stats-writer");
const EventParser = require("./event-parser");

const eventParser = new EventParser();

const input = fs.createReadStream("./logs/server.log", {
  highWaterMark: 20
});

const lineTransform = new LineTransform();
const logTransform = new LogTransform(eventParser);
const statsWriter = new StatsWriter();

eventParser.once("start", () => {
  console.log("Starting log parser...\n");
});

eventParser.on("info", (log) => {
  console.log("INFO:", log.message);
});

eventParser.on("warn", (log) => {
  console.log("WARN:", log.message);
});

eventParser.on("errorLog", (log) => {
  console.log("ERROR:", log.message);
});

eventParser.on("invalid", (line) => {
  console.log("INVALID:", line);
});

eventParser.on("progress", (stats) => {
  console.log(
    `Progress: ${stats.totalLines} lines processed`
  );
});

eventParser.on("complete", (stats) => {
  console.log("\nEvent parser complete");
  console.log(stats);
});

eventParser.start();

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

    eventParser.complete();

    console.log("\nLOG ANALYSIS");
    console.log("============");

    console.log(statsWriter.getStats());
  }
);