//WebSocket
import io from "socket.io-client"
let socket = io("https://triage-project.herokuapp.com/")

export default socket;
