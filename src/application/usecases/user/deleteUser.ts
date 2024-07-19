import UserRepository from '../../../domain/repositories/userRepository';
import UserNotFoundException from '../../../domain/exceptions/userNotFoundException';

export default class DeleteUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundException(id);
    }
    await this.userRepository.delete(id);
  }
}
