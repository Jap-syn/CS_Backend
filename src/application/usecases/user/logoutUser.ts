import jwt from "jsonwebtoken";

import UserRepository from "../../../domain/repositories/userRepository";
import User from "../../../domain/models/user";
import UserNotFoundException from "../../../domain/exceptions/userNotFoundException";
import logger from "../../../infrastructure/config/logger";

interface DecodedToken {
  id: string;
}
export default class logoutUser {
  constructor(private userRepository: UserRepository) {}

  async execute(token: string): Promise<void> {
    try {
      const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
      const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
      const userId = decoded.id;
      await this.userRepository.updateUserToken(userId, null);
      logger.info("User logged out successfully: %s", JSON.stringify(decoded));
    } catch (error) {
      logger.error(
        "Error verifying token during logout: %s",
        (error as Error).message
      );
      throw new Error("Invalid token");
    }
  }
}
