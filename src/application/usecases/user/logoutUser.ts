import UserRepository from "../../../domain/repositories/userRepository";
import User from "../../../domain/models/user";

export default class LogoutUser {
  constructor(private userRepository: UserRepository) {}

  async execute(token: string): Promise<User> {
    const user = await this.userRepository.findByToken(token);
    if (!user) {
      throw new Error("User not found");
    }
    user.token = undefined; // Remove the token
    await user.update();
  }
}
