import { Router } from "express";
import {upload} from "../middlewares/multer.middlewares.js"
import { registerAdmin ,
        adminLogin , 
        logOutAdmin,
        changePassword , 
        updateRefreshToken,
        getCurrentUser,
        forgetPassword,
        ValidatedOtp
} from "../controllers/admin.controllers.js";
import { authVerify } from "../middlewares/auth.middlewares.js";

const router = Router()

//Image sending routes

router.route("/registerAdmin").post(upload.fields([
    {
        name:"profileImage",
        maxCount: 1
    },

    {
        name:"schoolImage",
        maxCount: 1
    }
]),
registerAdmin)
router.route("/adminLogin").post(adminLogin)
router.route("/forgetPassword").post(forgetPassword)
router.route("/ValidatedOtp").post(ValidatedOtp)

//secured routes
router.route("/logoutAdmin").post(authVerify,logOutAdmin)
router.route("/changePassword").post(authVerify,changePassword)
router.route("/refreshTokens").post(authVerify,updateRefreshToken)
router.route("/getUser").get(authVerify,getCurrentUser)

export default router