import { io } from "socket.io-client";
const socket = io("http://app.ylcode.online:4000");
export default socket;
