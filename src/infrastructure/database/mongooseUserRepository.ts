import { UserSchema } from './models/userSchema';
import User from '../../domain/models/user';
import UserRepository from '../../domain/repositories/userRepository';

export default class MongooseUserRepository implements UserRepository {
  async findAll(): Promise<User[]> {
    const users = await UserSchema.find();
    return users.map(user => new User(user.id, user.first_name,user.last_name, user.email, user.password,user.phone,user.dob,user.gender,user.status,user.remark));
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserSchema.findOne({ email });
    if (!user) return null;
    return new User(user.id, user.first_name,user.last_name, user.email, user.password,user.phone,user.dob,user.gender,user.status,user.remark);
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserSchema.findById(id);
    if (!user) return null;
    return new User(user.id, user.first_name,user.last_name, user.email, user.password,user.phone,user.dob,user.gender,user.status,user.remark);
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
