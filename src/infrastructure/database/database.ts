import mongoose from 'mongoose';
import logger from '../config/logger';
import { config } from '../config/index';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(config.databaseUrl);
    logger.info('Database connected');
  } catch (error) {
    logger.error('Database connection error: %s', error);
    process.exit(1); // Exit the process with failure
  }
};
