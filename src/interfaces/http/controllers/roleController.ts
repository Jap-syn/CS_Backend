import { Request, Response } from 'express';
import CreateRole from '../../../application/usecases/role/createRole';
import GetRoles from '../../../application/usecases/role/getRoles';
import GetRole from '../../../application/usecases/role/getRole';
import UpdateRole from '../../../application/usecases/role/updateRole';
import DeleteRole from '../../../application/usecases/role/deleteRole';
import MongooseRoleRepository from '../../../infrastructure/database/mongooseRoleRepository';
import logger from '../../../infrastructure/config/logger';
import RoleNotFoundException from '../../../domain/exceptions/roleNotFoundException';
import { successResponse, errorResponse } from '../../../application/helpers/utils/response';

const roleRepository = new MongooseRoleRepository();


export const createRole = async (req: Request, res: Response) => {
  const { name, description, remark, status } = req.body;
  const createRole = new CreateRole(roleRepository);
  try {
    const role = await createRole.execute(name, description, remark, status);
    res.status(201).json(successResponse(role, 'Role created successfully', 201));
  } catch (error) {
    logger.error('Error creating role: %s', (error as Error).message);
    res.status(500).json(errorResponse((error as Error).message));
  }
};

export const getRoles = async (req: Request, res: Response) => {
  const getRoles = new GetRoles(roleRepository);
  try {
    const roles = await getRoles.execute();
    res.status(200).json(successResponse(roles, 'Roles fetched successfully'));
  } catch (error) {
    logger.error('Error fetching roles: %s', (error as Error).message);
    res.status(500).json(errorResponse((error as Error).message));
  }
};

export const getRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const getRole = new GetRole(roleRepository);
  try {
    const role = await getRole.execute(id);
    res.status(200).json(successResponse(role, 'Role fetched successfully'));
  } catch (error) {
    if (error instanceof RoleNotFoundException) {
      logger.warn('Role not found: %s', id);
      return res.status(404).json(errorResponse(error.message, 404));
    }
    logger.error('Error fetching role: %s', (error as Error).message);
    res.status(500).json(errorResponse((error as Error).message));
  }
};

export const updateRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, remark, status } = req.body;
  const updateRole = new UpdateRole(roleRepository);
  try {
    const role = await updateRole.execute(id, name, description, remark, status);
    res.status(200).json(successResponse(role, 'Role updated successfully'));
  } catch (error) {
    if (error instanceof RoleNotFoundException) {
      logger.warn('Role not found: %s', id);
      return res.status(404).json(errorResponse(error.message, 404));
    }
    logger.error('Error updating role: %s', (error as Error).message);
    res.status(500).json(errorResponse((error as Error).message));
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteRole = new DeleteRole(roleRepository);
  try {
    await deleteRole.execute(id);
    logger.info('Role deleted successfully: %s', id);
    res.status(204).json(successResponse(null, 'Role deleted successfully', 204));
  } catch (error) {
    if (error instanceof RoleNotFoundException) {
      logger.warn('Role not found: %s', id);
      return res.status(404).json(errorResponse(error.message, 404));
    }
    logger.error('Error deleting role: %s', (error as Error).message);
    res.status(500).json(errorResponse((error as Error).message));
  }
};