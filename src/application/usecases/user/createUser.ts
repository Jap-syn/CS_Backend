import UserRepository from "../../../domain/repositories/userRepository";
import User from "../../../domain/models/user";
import { passwordHasher } from "../../helpers/utils/passwordHasher"
import { ObjectId } from "mongodb";
export default class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(name: string, email: string, password: string): Promise<User> {
    const hashedPassword = await passwordHasher.hashPassword(password);
    const userId = new ObjectId();
    const user = new User(userId, name, email, hashedPassword);
    await this.userRepository.save(user);
    return user;
  }
}
