import { Router } from "express";
import {upload} from "../middlewares/multer.middlewares.js"
import { registerAdmin } from "../controllers/admin.controllers.js";

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

export default router