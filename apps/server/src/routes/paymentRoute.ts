import express, { Router } from "express";
import { createOrder, verifyPayment } from "../controller/paymentcontroller";

const paymentRouter: Router = express.Router();

paymentRouter.post("/create-order", createOrder);
paymentRouter.post("/verify-payment", verifyPayment);
paymentRouter.get("/subscription-status", );
paymentRouter.post("/cancel-subscription", );
paymentRouter.post("/reactivate-subscription", );

export default paymentRouter;