import express, {Request, Response} from 'express';
import { interactionController } from '../controllers';

const router = express.Router();

router.post('/interactions', interactionController );

export default router;