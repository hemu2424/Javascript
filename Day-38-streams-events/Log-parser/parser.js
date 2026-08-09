const EventEmitter = require("events");
const fs = require("fs");

class LogParser extends EventEmitter {
  constructor(filePath) {
    super();

    this.filePath = filePath;
    this.leftover = "";
  }

  start() {
    const stream = fs.createReadStream(this.filePath, {
      highWaterMark: 20
    });

    stream.on("data", (chunk) => {
      this.handleChunk(chunk);
    });

    stream.on("end", () => {
      this.handleEnd();
    });

    stream.on("error", (error) => {
      this.emit("error", error);
    });
  }

  handleChunk(chunk) {
    const text = chunk.toString();

    this.leftover += text;

    const lines = this.leftover.split("\n");

    this.leftover = lines.pop();

    for (const line of lines) {
      this.processLine(line);
    }
  }

  handleEnd() {
    if (this.leftover.length > 0) {
      this.processLine(this.leftover);
    }

    this.emit("complete");
  }

processLine(line) {
  line = line.replace(/\r$/, "");

  if (!line.trim()) {
    return;
  }

  const match = line.match(
    /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) (INFO|WARN|ERROR) (.+)$/
  );

  if (!match) {
    this.emit("invalid", line);
    return;
  }

  const log = {
    timestamp: match[1],
    level: match[2],
    message: match[3]
  };

  this.emit("parsed", log);

  if (log.level === "INFO") {
    this.emit("info", log);
  }

  if (log.level === "WARN") {
    this.emit("warn", log);
  }

  if (log.level === "ERROR") {
    this.emit("errorLog", log);
  }
}
}

module.exports = LogParser;