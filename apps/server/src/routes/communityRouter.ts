import express, { Router } from "express";
import { createRoomController, getAllRoomsController, getRoomHistoryController, getUserRoomsController, joinRoomController, getRoomsExceptUserController } from "../controller/communityController";
import { createMulterUpload } from "../lib/multer";

const communityRouter: Router = express.Router();
const upload = createMulterUpload();

communityRouter.post("/create-room", upload.single('thumbnail'), createRoomController);
communityRouter.post("/join-room", joinRoomController);
communityRouter.get("/user-rooms", getUserRoomsController);
communityRouter.get("/rooms-except-user", getRoomsExceptUserController);
communityRouter.get("/rooms", getAllRoomsController);
communityRouter.get("/history/:roomId", getRoomHistoryController);

export default communityRouter;