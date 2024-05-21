import { Router } from "express";
import { GetTypes } from "../controllers/types";

const router = Router();

// End point to retrieve lists of available types.
router.get('/types', GetTypes);

export { router as TypeRoutes }