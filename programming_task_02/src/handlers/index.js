const Counter = require("./counter");
const Multiplier = require("./multiplier");
const Newest = require("./newest");

class Handler {
  static from(input) {
    if (input === "COUNTER") return Counter;
    if (input === "MULTIPLIER") return Multiplier;
    if (input === "NEWEST") return Newest;
  }
}

module.exports = Handler;