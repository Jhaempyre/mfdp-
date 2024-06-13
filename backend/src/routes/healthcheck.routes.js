import { Router } from 'express';
import { healthCheck } from "../controllers/healthcheck.controllers.js"

const router = Router();

router.route('/servercheck').get(healthCheck);

export default router