import express from 'express';
import { getUserServerRecordController } from '../controllers/recordController';

const router = express.Router();

router.get('/', getUserServerRecordController); // To-do add auth middleware

export default router;