import express, { Application, NextFunction, Request, Response } from 'express'
import { ProgramRoutes } from './routes/programs';
import { ChannelRoutes } from './routes/channels';
import { TypeRoutes } from './routes/types';
import { UserRoutes } from './routes/users';
import { AuthRoutes } from './routes/auth';
import { DashboardRoutes } from './routes/dashboard';
import { createServer } from 'http';
import { Server } from 'socket.io';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import createHttpError from 'http-errors';
import compression from 'compression';

// Define custom error interface
interface Error {
  status: number;
  message: string;
  stack?: Error; 
};

// Intialize express app
const app: Application = express();

// Set up socket io
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Setup middlewares to parse JSON and  URL-encoded request bodies 
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Implement basic security measures
app.use(helmet());

app.use(compression())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100 
});
app.use(limiter);

// Set up routes
app.use('/api', ProgramRoutes);
app.use('/api', ChannelRoutes);
app.use('/api', TypeRoutes);
app.use('/api', UserRoutes);
app.use('/api', AuthRoutes);
app.use('/api', DashboardRoutes);

// Handle errors
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, "Not found"))
});

app.use((err: Error, req: Request, res: Response) => {
  if (err.status === 404) {
    return res.status(404).json({ error: "Not found" });
  } else {
    return res.status(err.status || 500).json({ error: "Internal server error" });
  };
});

// Start the server
const port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log(`App is listening on port ${port}!`)
});

// Export socket io setup
export { io };