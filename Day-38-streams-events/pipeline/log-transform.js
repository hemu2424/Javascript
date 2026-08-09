const { Transform } = require("stream");

class LogTransform extends Transform {
  constructor() {
    super({
      objectMode: true
    });
  }

  _transform(line, encoding, callback) {
    const text = line.toString();

  const match = text.match(
      /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) (INFO|WARN|ERROR) (.+)$/
    );

    if (!match) {
      this.push({
        valid: false,
        raw: line
      });

      callback();
      return;
    }

    const log = {
      valid: true,
      timestamp: match[1],
      level: match[2],
      message: match[3]
    };

    this.push(log);

    callback();
  }
}

module.exports = LogTransform;