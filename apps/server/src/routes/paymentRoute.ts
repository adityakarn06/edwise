import express, { Router } from "express";
import { createOrder, subscriptionStatus, verifyPayment } from "../controller/paymentcontroller";

const paymentRouter: Router = express.Router();

paymentRouter.post("/create-order", createOrder);
paymentRouter.post("/verify-payment", verifyPayment);
paymentRouter.get("/subscription-status", subscriptionStatus);

export default paymentRouter;