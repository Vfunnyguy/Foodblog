import express from 'express';
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import routes from "../routes/index";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json({ limit: "40mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));
// Socket
const http = createServer(app);
export const io = new Server(http);
import {SocketServer}from '../config/socket'
io.on("connection", (socket: Socket) => {SocketServer(socket)});
//routes
app.use("/api", routes);
//database
import "../config/database";
//Server running
const CONG = process.env.PORT;
http.listen(CONG, () => {console.log(`Hệ thống đang chạy trên cổng ${CONG}`);});
