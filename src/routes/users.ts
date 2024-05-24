import { Router } from "express";
import { AddToFavorites, AddToWatchLater, GetFavorites, GetWatchLaters, RemoveFromFavorites, RemoveFromWatchLater } from "../controllers/user";

const router = Router();

// End point to retrieve lists of favorite programs
router.get('/users/:id/favorites', GetFavorites);
  
// End point to retrieve lists of watch later programs
router.get('/users/:id/watchlater', GetWatchLaters);

// End point to add a program favorite
router.post('/users/favorites/:id/:programId', AddToFavorites);

// End point to add a program watch later
router.post('/users/watchlater/:id/:programId', AddToWatchLater);

// End point to remove a program from favorite
router.delete('/users/:id/:programId', RemoveFromFavorites);

// End point to remove a program from watch later
router.delete('/users/:id/:programId', RemoveFromWatchLater);

export { router as UserRoutes }