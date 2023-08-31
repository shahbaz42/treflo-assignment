import express from 'express';
import { getUserServerRecordController, createUserServerRecordController } from '../controllers/recordController';
import { body } from 'express-validator';
import { validateRequest } from '../utils';

const router = express.Router();

router.get('/', getUserServerRecordController); // To-do add auth middleware
router.post('/', 
    [
        body('user_id').exists().withMessage('user_id is required'),
        body('user_name').exists().withMessage('user_name is required'),
        body('server_id').exists().withMessage('server_id is required'),
        body('server_name').exists().withMessage('server_name is required'),
    ],
    validateRequest,
    createUserServerRecordController
); // To-do add auth middleware

export default router;