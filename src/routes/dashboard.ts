import express from 'express';
import {  GetDashboardData } from '../controllers/dashboard';

const router = express.Router();

// Endpoint to get admin dashboard data
router.get('/dashboard', GetDashboardData);

export { router as DashboardRoutes };