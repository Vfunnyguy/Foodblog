"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketServer = void 0;
const SocketServer = (socket) => {
    socket.on('joinRoom', (id) => {
        socket.join(id);
    });
    socket.on('outRoom', (id) => {
        socket.leave(id);
    });
    socket.on('disconnect', () => {
        console.log(socket.id + ' đã ngắt kết nối');
    });
};
exports.SocketServer = SocketServer;
//# sourceMappingURL=socket.js.map