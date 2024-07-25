import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { connectDatabase } from '../infrastructure/database/database';
import logger from '../infrastructure/config/logger';
import userRoutes from './http/routes/userRoutes';
import roleRoutes from './http/routes/roleRoutes';
import {config} from '../infrastructure/config/index';
import { errorResponse } from '../application/helpers/utils/response';

const app = express();

connectDatabase().then(() => {
  logger.info('Database connected');
}).catch(err => {
  logger.error('Database connection error: %s', err);
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);
app.use('/roles', roleRoutes);


// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error('Unexpected error: %s', err);
  res.status(500).json(errorResponse(err.message));
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

export default app;