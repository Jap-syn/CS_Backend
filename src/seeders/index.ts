import mongoose from 'mongoose';
import { config } from '../infrastructure/config/index';
import logger from '../infrastructure/config/logger';
import seedUsers from './userSeeder';


const seedDatabase = async () => {
  try {
    await mongoose.connect(config.databaseUrl);

    await seedUsers();

    logger.info('Database seeded successfully');
  } catch (error) {
    logger.error('Error seeding database: %s', error);
  } finally {
    await mongoose.connection.close();
  }
};

seedDatabase();
