import Router from 'express'
import {upload} from "../middlewares/multer.middlewares.js"
import { authVerify } from "../middlewares/auth.middlewares.js";
import { registerTeacher } from '../controllers/teacherAndEmployeeAdmission.controllers.js';

const router = Router()

router.route("/reg_teacher").post(authVerify,upload.single('image'),registerTeacher)

export default router