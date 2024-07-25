import jwt from "jsonwebtoken";
import UserRepository from "../../../domain/repositories/userRepository";
import User from "../../../domain/models/user";
import { passwordHasher } from "../../helpers/utils/passwordHasher";
export default class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(
    email: string,
    password: string
  ): Promise<{ user: User; token: string } | null> {
    const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
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

    const token = jwt.sign({ email: user.email, id: user.id }, JWT_SECRET);
    user.token = token;
    await this.userRepository.update(user);
    return { user, token };
  }
}
