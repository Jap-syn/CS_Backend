import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { connectDatabase } from '../infrastructure/database/database';
import logger from '../infrastructure/config/logger';
import userRoutes from './http/routes/userRoutes';
import roleRoutes from './http/routes/roleRoutes';
import divisionRoutes from './http/routes/divisionRoutes';
import cityRoutes from './http/routes/cityRoutes';
import businessTypeRoutes from './http/routes/businessTypeRoutes';
import {config} from '../infrastructure/config/index';
import { errorResponse } from '../application/helpers/utils/response';

const app = express();

connectDatabase().then(() => {
  logger.info('Database connected');
}).catch(err => {
  logger.error('Database connection error: %s', err);
});

// Middleware
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const rolesRouter = express.Router();

rolesRouter.post('/roles', (req, res) => {
    console.log('POST /roles');
    console.log('Request body:', req.body);
    // Implement role creation logic here
    res.status(201).json({ message: 'Role created successfully', data: req.body });
});

// Routes
app.use('/users', userRoutes);
app.use('/roles', roleRoutes);
app.use('/divisions', divisionRoutes);
app.use('/cities', cityRoutes);
app.use('/business-types', businessTypeRoutes);


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