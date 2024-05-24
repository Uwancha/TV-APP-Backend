import express, { Application } from 'express'
import { ProgramRoutes } from './routes/programs';
import { ChannelRoutes } from './routes/channels';
import { TypeRoutes } from './routes/types';
import { UserRoutes } from './routes/users';
import { AuthRoutes } from './routes/auth';
import { DashboardRoutes } from './routes/dashboard';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app: Application = express();

const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api', ProgramRoutes);
app.use('/api', ChannelRoutes);
app.use('/api', TypeRoutes);
app.use('/api', UserRoutes);
app.use('/api', AuthRoutes);
app.use('/api', DashboardRoutes);

const port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log(`App is listening on port ${port}!`)
});

export { io };