import { Router } from "express";
import { checkOut,
        paymentVerification,
        subPaymentVerification,
        subscription } from "../controllers/payment.controllers.js";
import { authVerify } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/payCheckOut").post(authVerify,checkOut);
router.route("/paymentVerify").post(authVerify,paymentVerification)
router.route("/subscription").post(authVerify,subscription)
router.route("/subPaymentVerify").post(authVerify,subPaymentVerification)



export default router ; 





