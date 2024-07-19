import UserRepository from '../../../domain/repositories/userRepository';
import User from '../../../domain/models/user';

export default class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(name: string, email: string, password: string): Promise<User> {
    const user = new User('', name, email, password);
    await this.userRepository.save(user);
    return user;
  }
}
