import io from "socket.io-client"

const socket = {}

socket.connection = io("http://76210b54.ngrok.io")

export default socket