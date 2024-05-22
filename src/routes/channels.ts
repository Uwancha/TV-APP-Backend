import express from 'express';
import { CreateChannel, GetChannels, UpdateChannel, DeleteChannel } from '../controllers/channel';

const router = express.Router();

// Endpoint to get available channels, filter, sort, and paginate
router.get('/channels', GetChannels);

// End point to create a channel
router.post('/channels', CreateChannel
);

// Endpoint to get update a channel
router.put('channels/:id', UpdateChannel
);

// Endpoint to get delete a channel
router.delete('/channels/:id', DeleteChannel);

export { router as ChannelRoutes };
