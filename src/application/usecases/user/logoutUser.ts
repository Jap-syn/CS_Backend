import jwt from "jsonwebtoken";
import logger from "../../../infrastructure/config/logger";
import User from "../../../domain/models/user";
import UserRepository from "../../../domain/repositories/userRepository";

interface DecodedToken {
  id: string; // Adjust based on your actual token payload structure
}

export const logoutUser = async (token: string): Promise<void> => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    const userId = decoded.id;

    // Update the user's token in the database to null
    await UserRepository.updateUserToken(userId, null);

    logger.info("User logged out successfully: %s", JSON.stringify(decoded));
  } catch (error) {
    logger.error(
      "Error verifying token during logout: %s",
      (error as Error).message
    );
    throw new Error("Invalid token");
  }
};
