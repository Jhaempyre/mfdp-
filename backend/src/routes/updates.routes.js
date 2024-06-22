import { Router } from "express";   
import { authVerify } from "../middlewares/auth.middlewares.js";
import {
    addUpdate,
    editUpdate,
    getAllUpdates
} from "../controllers/updates.controllers.js"

const router = Router()

router.route("/addUpdate").post(authVerify,addUpdate)
router.route("/viewUpdates").get(authVerify,getAllUpdates)
router.route("/editUpdate").post(authVerify,editUpdate)

export default router