const { Transform } = require("stream");

class LogTransform extends Transform {
  constructor(eventParser) {
    super({
      objectMode: true
    });

    this.eventParser = eventParser;
  }

  _transform(line, encoding, callback) {
    const match = line.match(
      /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) (INFO|WARN|ERROR) (.+)$/
    );

    let log;

    if (!match) {
      log = {
        valid: false,
        raw: line
      };
    } else {
      log = {
        valid: true,
        timestamp: match[1],
        level: match[2],
        message: match[3]
      };
    }

    
    this.eventParser.handleLog(log);

    this.push(log);

    callback();
  }
}

module.exports = LogTransform;