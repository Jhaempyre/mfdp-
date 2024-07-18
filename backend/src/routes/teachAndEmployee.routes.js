import Router from 'express'
import {upload} from "../middlewares/multer.middlewares.js"
import { authVerify } from "../middlewares/auth.middlewares.js";
import { registerAccountant,
         registerCounselor,
         registerTeacher,
         registerLibrarian,
         registerItStaff,
         registerMaintenanceStaff,
         securityPersonnel } from '../controllers/teacherAndEmployeeAdmission.controllers.js';

const router = Router()

router.route("/reg_teacher").post(authVerify,upload.single('image'),registerTeacher)
router.route("/reg_accountant").post(authVerify,upload.single('image'),registerAccountant)
router.route("/reg_Counselor").post(authVerify,upload.single("image"),registerCounselor)
router.route("/reg_Librarian").post(authVerify,upload.single("image"),registerLibrarian)
router.route("/reg_ItStaff").post(authVerify,upload.single("image"),registerItStaff)
router.route("/reg_MaintenanceStaff").post(authVerify,upload.single("image"),registerMaintenanceStaff)
router.route("/reg_securityPersonnel").post(authVerify,upload.single("image"),securityPersonnel)

export default router