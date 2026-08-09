const LogParser = require("./parser");
const StatsCollector = require("./stats");

const parser = new LogParser("./logs/server.log");
const stats = new StatsCollector();



parser.on("parsed", (log) => {
  stats.handleParsed(log);
});

parser.on("invalid", (line) => {
  stats.handleInvalid();

  console.log("Invalid log:", line);
});

parser.on("complete", () => {
  console.log("\nParsing completed!\n");

  console.log("LOG ANALYSIS");
  console.log("============");

  console.log("Total   :", stats.total);
  console.log("INFO    :", stats.info);
  console.log("WARN    :", stats.warn);
  console.log("ERROR   :", stats.error);
  console.log("Invalid :", stats.invalid);
});

parser.on("error", (error) => {
  console.error("Parser error:", error.message);
});

parser.start();