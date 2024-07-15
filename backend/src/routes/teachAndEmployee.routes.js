import Router from 'express'
import {upload} from "../middlewares/multer.middlewares.js"
import { authVerify } from "../middlewares/auth.middlewares.js";
import { registerAccountant, registerTeacher } from '../controllers/teacherAndEmployeeAdmission.controllers.js';

const router = Router()

router.route("/reg_teacher").post(authVerify,upload.single('image'),registerTeacher)
router.route("/reg_accountant").post(authVerify,upload.single('image'),registerAccountant)

export default router