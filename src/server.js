import {io} from 'socket.io-client'
const server = io('http://localhost:3002/')
export default server
