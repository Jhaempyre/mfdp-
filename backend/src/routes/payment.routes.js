import { Router } from "express";
import { checkOut, paymentVerification } from "../controllers/payment.controllers.js";
import { authVerify } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/payCheckOut").post(authVerify,checkOut);
router.route("/paymentVerify").post(authVerify,paymentVerification)



export default router ; 





