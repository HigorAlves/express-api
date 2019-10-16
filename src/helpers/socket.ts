import socket from 'socket.io';

let io: any = null;

export const socketIO = {
	init: (httpServer: any) => {
		io = socket(httpServer);
		return io;
	},
	getIO: () => {
		if (!io) {
			console.log('IO nao iniciado');
		}
		return io;
	}
};
