import UserRepository from "../../../domain/repositories/userRepository";
import User from "../../../domain/models/user";
import { passwordHasher } from "../../helpers/utils/passwordHasher";
import { ObjectId } from "mongodb";

export default class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(
    first_name: string, 
    last_name: string, 
    email: string, 
    password: string, 
    phone: string, 
    dob: Date, 
    gender: string, 
    status: number, 
    remark: string
  ): Promise<User> {
    const hashedPassword = await passwordHasher.hashPassword(password);
    const userId = new ObjectId();// Ensure this matches the type expected by your User class
    const user = new User(
      userId, 
      first_name, 
      last_name, 
      email, 
      hashedPassword, 
      phone, 
      dob, 
      gender, 
      status, 
      remark
    );
    
    await this.userRepository.save(user);
    return user;
  }
}