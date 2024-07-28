import UserRepository from "../../../domain/repositories/userRepository";
import User from "../../../domain/models/user";
import UserNotFoundException from "../../../domain/exceptions/userNotFoundException";

export default class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    dob: Date,
    gender: string,
    status: number,
    remark: string,
    token: string
  ): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundException(id);
    }
    if (user.token !== token) {
      throw new Error("Invalid token");
    }
    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;
    user.phone = phone;
    user.dob = dob;
    user.gender = gender;
    user.status = status;
    user.remark = remark;
    await this.userRepository.update(user);
    return user;
  }
}
