import express, { Application } from 'express'
import { ProgramRoutes } from './routes/programs';
import { ChannelRoutes } from './routes/channels';
import { TypeRoutes } from './routes/types';
import { UserRoutes } from './routes/users';
import { AuthRoutes } from './routes/auth';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api', ProgramRoutes);
app.use('/api', ChannelRoutes);
app.use('/api', TypeRoutes);
app.use('/api', UserRoutes);
app.use('/api', AuthRoutes);

const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log(`App is listening on port ${port}!`)
});