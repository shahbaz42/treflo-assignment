import express from 'express';
import { getUserServerRecordController, createUserServerRecordController } from '../controllers';
import { body } from 'express-validator';
import { validateRequest } from '../utils';
import { authMiddleware } from '../middlewares';

const router = express.Router();

router.get('/', 
    authMiddleware,
    getUserServerRecordController
); 

router.post('/', 
    authMiddleware,
    [
        body('user_id').exists().withMessage('user_id is required'),
        body('user_name').exists().withMessage('user_name is required'),
        body('server_id').exists().withMessage('server_id is required'),
        body('server_name').exists().withMessage('server_name is required'),
    ],
    validateRequest,
    createUserServerRecordController
);

export default router;