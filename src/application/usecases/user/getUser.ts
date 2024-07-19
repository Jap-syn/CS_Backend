import UserRepository from '../../../domain/repositories/userRepository';
import UserNotFoundException from '../../../domain/exceptions/userNotFoundException';
import User from '../../../domain/models/user';

export default class GetUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundException(id);
    }
    return user;
  }
}
