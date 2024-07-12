import { Router } from "express";
import { checkOut,
        paymentVerification,
        subscription } from "../controllers/payment.controllers.js";
import { authVerify } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/payCheckOut").post(authVerify,checkOut);
router.route("/paymentVerify").post(authVerify,paymentVerification)
router.route("/subscription").post(authVerify,subscription)



export default router ; 





