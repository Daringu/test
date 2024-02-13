import { io } from "socket.io-client";
export const ioClient: any = io('http://localhost:8080/')