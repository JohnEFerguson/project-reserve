import { createServer } from 'http'
import socketio from 'socket.io'
import { STATUS_UPDATE, emitter } from '../../socketConstants'

export default function () {
  this.nuxt.hook('render:before', (renderer) => {
    const server = createServer(this.nuxt.renderer.app)
    const io = socketio(server)

    // overwrite nuxt.server.listen()
    this.nuxt.server.listen = (port, host) =>
      new Promise((resolve) =>
        server.listen(port || 8019, host || 'localhost', resolve)
      )
    // close this server on 'close' event
    this.nuxt.hook('close', () => new Promise(server.close))

    const clientSocket = io.of('/connection/client')
    emitter.on(STATUS_UPDATE, (statusObj) => {
      clientSocket.emit(STATUS_UPDATE, statusObj)
    })
    clientSocket.on('connection', (socket) => {
      socket.on(STATUS_UPDATE, (statusObj) => {
        socket.emit(STATUS_UPDATE, statusObj)
      })
    })
  })
}
