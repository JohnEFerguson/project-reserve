const { EventEmitter } = require("events");

class SocketEmitter extends EventEmitter {}

const emitter = new SocketEmitter();
module.exports = {
  STATUS_UPDATE: "STATUS_UPDATE",
  emitter,
};
