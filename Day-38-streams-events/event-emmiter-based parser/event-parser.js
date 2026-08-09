const EventEmitter = require("events");

class EventParser extends EventEmitter {
  constructor() {
    super();

    this.totalLines = 0;
    this.parsedLines = 0;
    this.invalidLines = 0;
  }

  start() {
    this.emit("start");
  }

  handleLog(log) {
    this.totalLines++;

    if (!log.valid) {
      this.invalidLines++;

      this.emit("invalid", log.raw);

      return;
    }

    this.parsedLines++;

    this.emit("line", log);
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

    if (this.totalLines % 10 === 0) {
      this.emit("progress", {
        totalLines: this.totalLines,
        parsedLines: this.parsedLines,
        invalidLines: this.invalidLines
      });
    }
  }

  complete() {
    this.emit("complete", {
      totalLines: this.totalLines,
      parsedLines: this.parsedLines,
      invalidLines: this.invalidLines
    });
  }
}

module.exports = EventParser;