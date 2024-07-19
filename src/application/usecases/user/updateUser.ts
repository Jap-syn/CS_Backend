import UserRepository from '../../../domain/repositories/userRepository';
import User from '../../../domain/models/user';
import UserNotFoundException from '../../../domain/exceptions/userNotFoundException';

export default class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, name: string, email: string, password: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundException(id);
    }
    user.name = name;
    user.email = email;
    user.password = password;
    await this.userRepository.update(user);
    return user;
  }
}
