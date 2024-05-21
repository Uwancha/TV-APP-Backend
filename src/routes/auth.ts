import express from 'express';
import { register, login } from '../controllers/authControllers';

const router = express.Router();

router.post('/auth/register', register);

router.post('/auth/login', login);

export { router as AuthRoutes };