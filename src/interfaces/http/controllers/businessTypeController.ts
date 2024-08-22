import { Request, Response } from 'express';
import CreateBusinessType from '../../../application/usecases/businessType/createBusinessType';
import GetBusinessTypes from '../../../application/usecases/businessType/getBusinessTypes';
import GetBusinessType from '../../../application/usecases/businessType/getBusinessType';
import UpdateBusinessType from '../../../application/usecases/businessType/updateBusinessType';
import DeleteBusinessType from '../../../application/usecases/businessType/deleteBusinessType';
import MongooseBusinessTypeRepository from '../../../infrastructure/database/mongoosebusinessTypeRepository';
import logger from '../../../infrastructure/config/logger';
import BusinessTypeNotFoundException from '../../../domain/exceptions/businessTypeNotFoundException';
import { successResponse, errorResponse } from '../../../application/helpers/utils/response';

const businessTypeRepository = new MongooseBusinessTypeRepository();


export const createBusinessType = async (req: Request, res: Response) => {
  const { name, short_name, remark, status } = req.body;
  const createBusinessType = new CreateBusinessType(businessTypeRepository);
  try {
    const businessType = await createBusinessType.execute(name, short_name, remark, status);
    res.status(201).json(successResponse(businessType, 'BusinessType created successfully', 201));
  } catch (error) {
    logger.error('Error creating businessType: %s', (error as Error).message);
    res.status(500).json(errorResponse((error as Error).message));
  }
};

export const getBusinessTypes = async (req: Request, res: Response) => {
  const getBusinessTypes = new GetBusinessTypes(businessTypeRepository);
  try {
    const businessTypes = await getBusinessTypes.execute();
    res.status(200).json(successResponse(businessTypes, 'BusinessTypes fetched successfully'));
  } catch (error) {
    logger.error('Error fetching businessTypes: %s', (error as Error).message);
    res.status(500).json(errorResponse((error as Error).message));
  }
};

export const getBusinessType = async (req: Request, res: Response) => {
  const { id } = req.params;
  const getBusinessType = new GetBusinessType(businessTypeRepository);
  try {
    const businessType = await getBusinessType.execute(id);
    res.status(200).json(successResponse(businessType, 'BusinessType fetched successfully'));
  } catch (error) {
    if (error instanceof BusinessTypeNotFoundException) {
      logger.warn('BusinessType not found: %s', id);
      return res.status(404).json(errorResponse(error.message, 404));
    }
    logger.error('Error fetching businessType: %s', (error as Error).message);
    res.status(500).json(errorResponse((error as Error).message));
  }
};

export const updateBusinessType = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, short_name, remark, status } = req.body;
  const updateBusinessType = new UpdateBusinessType(businessTypeRepository);
  try {
    const businessType = await updateBusinessType.execute(id, name, short_name, remark, status);
    res.status(200).json(successResponse(businessType, 'BusinessType updated successfully'));
  } catch (error) {
    if (error instanceof BusinessTypeNotFoundException) {
      logger.warn('BusinessType not found: %s', id);
      return res.status(404).json(errorResponse(error.message, 404));
    }
    logger.error('Error updating businessType: %s', (error as Error).message);
    res.status(500).json(errorResponse((error as Error).message));
  }
};

export const deleteBusinessType = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteBusinessType = new DeleteBusinessType(businessTypeRepository);
  try {
    await deleteBusinessType.execute(id);
    logger.info('BusinessType deleted successfully: %s', id);
    res.status(204).json(successResponse(null, 'BusinessType deleted successfully', 204));
  } catch (error) {
    if (error instanceof BusinessTypeNotFoundException) {
      logger.warn('BusinessType not found: %s', id);
      return res.status(404).json(errorResponse(error.message, 404));
    }
    logger.error('Error deleting businessType: %s', (error as Error).message);
    res.status(500).json(errorResponse((error as Error).message));
  }
};