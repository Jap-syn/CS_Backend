import { UserSchema } from './models/userSchema';
import User from '../../domain/models/user';
import UserRepository from '../../domain/repositories/userRepository';

export default class MongooseUserRepository implements UserRepository {
  async findAll(): Promise<User[]> {
    const users = await UserSchema.find();
    return users.map(user => new User(user.id, user.name, user.email, user.password));
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserSchema.findById(id);
    if (!user) return null;
    return new User(user.id, user.name, user.email, user.password);
  }

  async save(user: User): Promise<void> {
    const newUser = new UserSchema(user);
    await newUser.save();
  }

  async update(user: User): Promise<void> {
    await UserSchema.findByIdAndUpdate(user.id, user);
  }

  async delete(id: string): Promise<void> {
    await UserSchema.findByIdAndDelete(id);
  }
}
