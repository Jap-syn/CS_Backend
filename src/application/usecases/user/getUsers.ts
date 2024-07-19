import UserRepository from '../../../domain/repositories/userRepository';
import User from '../../../domain/models/user';

export default class GetUsers {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
