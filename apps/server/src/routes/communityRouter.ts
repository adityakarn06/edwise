import express, { Router } from "express";
import { createRoomController, getAllRoomsController, getRoomHistoryController, getUserRoomsController, joinRoomController } from "../controller/communityController";

const communityRouter: Router = express.Router();

communityRouter.post("/create-room", createRoomController);
communityRouter.post("/join-room", joinRoomController);
communityRouter.get("/user-rooms", getUserRoomsController);
communityRouter.get("/rooms", getAllRoomsController);
communityRouter.get("/history/:slug", getRoomHistoryController);

export default communityRouter;