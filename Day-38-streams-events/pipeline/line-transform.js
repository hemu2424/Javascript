const { Transform } = require("stream");

class LineTransform extends Transform {
  constructor() {
    super();

    this.leftover = "";
  }

  _transform(chunk, encoding, callback) {
    const text = chunk.toString();

    this.leftover += text;

    const lines = this.leftover.split("\n");

    this.leftover = lines.pop();

    for (const line of lines) {
      const cleanLine = line.replace(/\r$/, "");

      if (cleanLine.trim()) {
        this.push(cleanLine);
      }
    }

    callback();
  }

  _flush(callback) {
    if (this.leftover.trim()) {
      this.push(this.leftover.replace(/\r$/, ""));
    }

    callback();
  }
}

module.exports = LineTransform;