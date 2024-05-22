import express from 'express';
import {
    CreateProgram,
    GetAllPrograms,
    UpdateProgram,
    DeleteProgram,
    GetProgramsByChannel,
    GetProgramsByCategory,
} from '../controllers/programs';

const router = express.Router();

// Endpoint to get all available programs, filter, sort and paginate
router.get('/programs', GetAllPrograms);

// Endpoint to filter a program by category for a channel
router.get('/programs/channel/:id/:categoryId', GetProgramsByChannel);

// Endpoint to filter a program by category for a channel
router.get('/programs/category/:id', GetProgramsByCategory);

// Endpoint to create a program
router.post('/programs',CreateProgram);

// Endpoint to update a program
router.put('/programs/:id',UpdateProgram);

// Endpoint to delete a program
router.delete('/programs/:id', DeleteProgram);

export { router as ProgramRoutes } ;