import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import CreateUser from '../../../application/usecases/user/createUser';
import GetUsers from '../../../application/usecases/user/getUsers';
import GetUser from '../../../application/usecases/user/getUser';
import UpdateUser from '../../../application/usecases/user/updateUser';
import DeleteUser from '../../../application/usecases/user/deleteUser';
import LoginUser from '../../../application/usecases/user/loginUser';
import MongooseUserRepository from '../../../infrastructure/database/mongooseUserRepository';
import logger from '../../../infrastructure/config/logger';
import UserNotFoundException from '../../../domain/exceptions/userNotFoundException';
import { successResponse, errorResponse } from '../../../application/helpers/utils/response';

const userRepository = new MongooseUserRepository();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Fallback to a default key (not recommended for production)

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const loginUser = new LoginUser(userRepository);

  try {
    const user = await loginUser.execute(email, password);
    if (!user) {
      res.status(401).json(errorResponse('Invalid email or password', 401));
      return;
    }

    const token = jwt.sign(
      { email: user.email, id: user.id }, 
      JWT_SECRET, 
      { expiresIn: '1h' }
    );

    logger.info('User logged in successfully: %s', user.email);
    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: {
        user,
        token
      }
    });
  } catch (error) {
    logger.error('Error logging in user: %s', (error as Error).message);
    res.status(500).json(errorResponse((error as Error).message));
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const createUser = new CreateUser(userRepository);
  try {
    const user = await createUser.execute(name, email, password);
    logger.info('User created successfully: %s', user.email);
    res.status(201).json(successResponse(user, 'User created successfully', 201));
  } catch (error) {
    logger.error('Error creating user: %s', (error as Error).message);
    res.status(500).json(errorResponse((error as Error).message));
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const getUsers = new GetUsers(userRepository);
  try {
    const users = await getUsers.execute();
    res.status(200).json(successResponse(users, 'Users fetched successfully'));
  } catch (error) {
    logger.error('Error fetching users: %s', (error as Error).message);
    res.status(500).json(errorResponse((error as Error).message));
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const getUser = new GetUser(userRepository);
  try {
    const user = await getUser.execute(id);
    res.status(200).json(successResponse(user, 'User fetched successfully'));
  } catch (error) {
    if (error instanceof UserNotFoundException) {
      logger.warn('User not found: %s', id);
      return res.status(404).json(errorResponse(error.message, 404));
    }
    logger.error('Error fetching user: %s', (error as Error).message);
    res.status(500).json(errorResponse((error as Error).message));
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const updateUser = new UpdateUser(userRepository);
  try {
    const user = await updateUser.execute(id, name, email, password);
    logger.info('User updated successfully: %s', user.email);
    res.status(200).json(successResponse(user, 'User updated successfully'));
  } catch (error) {
    if (error instanceof UserNotFoundException) {
      logger.warn('User not found: %s', id);
      return res.status(404).json(errorResponse(error.message, 404));
    }
    logger.error('Error updating user: %s', (error as Error).message);
    res.status(500).json(errorResponse((error as Error).message));
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteUser = new DeleteUser(userRepository);
  try {
    await deleteUser.execute(id);
    logger.info('User deleted successfully: %s', id);
    res.status(204).json(successResponse(null, 'User deleted successfully', 204));
  } catch (error) {
    if (error instanceof UserNotFoundException) {
      logger.warn('User not found: %s', id);
      return res.status(404).json(errorResponse(error.message, 404));
    }
    logger.error('Error deleting user: %s', (error as Error).message);
    res.status(500).json(errorResponse((error as Error).message));
  }
};