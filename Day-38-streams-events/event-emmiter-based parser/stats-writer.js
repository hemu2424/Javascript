const { Writable } = require("stream");

class StatsWriter extends Writable {
  constructor() {
    super({
      objectMode: true,
      highWaterMark: 2
    });

    this.total = 0;
    this.info = 0;
    this.warn = 0;
    this.error = 0;
    this.invalid = 0;
  }

  _write(log, encoding, callback) {
      console.log(
    "Processing:",
    log.valid ? log.level : "INVALID"
  );

  console.log(
    "Buffered:",
    this.writableLength
  );

    setTimeout(()=>{
    if (!log.valid) {
      this.invalid++;
      callback();
      return;
    }

    this.total++;

    if (log.level === "INFO") {
      this.info++;
    }

    if (log.level === "WARN") {
      this.warn++;
    }

    if (log.level === "ERROR") {
      this.error++;
    }

    callback();},100)
  }

  getStats() {
    return {
      total: this.total,
      info: this.info,
      warn: this.warn,
      error: this.error,
      invalid: this.invalid
    };
  }
}

module.exports = StatsWriter;