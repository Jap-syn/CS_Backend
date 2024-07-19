import { UserSchema } from '../infrastructure/database/models/userSchema';
import logger from '../infrastructure/config/logger';

const seedUsers = async () => {
  const users = [
    { name: 'John Doe', email: 'john@example.com', password: '123456' },
    { name: 'Jane Doe', email: 'jane@example.com', password: 'abcdef' },
    // Add more users as needed
  ];

  try {
    await UserSchema.deleteMany({});
    await UserSchema.insertMany(users);
    logger.info('Users seeded successfully');
  } catch (error) {
    logger.error('Error seeding users: %s', error);
  }
};

export default seedUsers;
