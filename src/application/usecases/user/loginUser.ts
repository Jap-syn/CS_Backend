import UserRepository from "../../../domain/repositories/userRepository";
import User from "../../../domain/models/user";
import { passwordHasher } from "../../helpers/utils/passwordHasher";
export default class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await passwordHasher.verifyPassword(
      user.password,
      password
    );
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }
}
