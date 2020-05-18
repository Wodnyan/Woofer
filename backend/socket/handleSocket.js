module.exports = (io, server) => {
	const ioVar = io(server)
	ioVar.on("connection", func)

	function func(socket) {
		console.log(socket.id)
	}
}