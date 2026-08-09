class StatsCollector {
  constructor() {
    this.total = 0;
    this.info = 0;
    this.warn = 0;
    this.error = 0;
    this.invalid = 0;
  }

  handleParsed(log) {
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
  }

  handleInvalid() {
    this.invalid++;
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

module.exports = StatsCollector;