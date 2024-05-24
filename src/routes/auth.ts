import express from 'express';
import { register, login } from '../controllers/authControllers';

const router = express.Router();

// Endpoint to register users and admins
router.post('/auth/register', register);

// Endpoint to handle login
router.post('/auth/login', login);

export { router as AuthRoutes };