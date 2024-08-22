import { Request, Response } from 'express';
import CreateDivision from '../../../application/usecases/division/createDivision';
import GetDivisions from '../../../application/usecases/division/getDivisions';
import GetDivision from '../../../application/usecases/division/getDivision';
import UpdateDivision from '../../../application/usecases/division/updateDivision';
import DeleteDivision from '../../../application/usecases/division/deleteDivision';
import MongooseDivisionRepository from '../../../infrastructure/database/mongooseDivsionRepository';
import logger from '../../../infrastructure/config/logger';
import DivisionNotFoundException from '../../../domain/exceptions/divisionNotFoundException';
import { successResponse, errorResponse } from '../../../application/helpers/utils/response';

const divisionRepository = new MongooseDivisionRepository();


export const createDivision = async (req: Request, res: Response) => {
  const { name, description, remark, status } = req.body;
  const createDivision = new CreateDivision(divisionRepository);
  try {
    const division = await createDivision.execute(name, description, remark, status);
    res.status(201).json(successResponse(division, 'Division created successfully', 201));
  } catch (error) {
    logger.error('Error creating division: %s', (error as Error).message);
    res.status(500).json(errorResponse((error as Error).message));
  }
};

export const getDivisions = async (req: Request, res: Response) => {
  const getDivisions = new GetDivisions(divisionRepository);
  try {
    const divisions = await getDivisions.execute();
    res.status(200).json(successResponse(divisions, 'Divisions fetched successfully'));
  } catch (error) {
    logger.error('Error fetching divisions: %s', (error as Error).message);
    res.status(500).json(errorResponse((error as Error).message));
  }
};

export const getDivision = async (req: Request, res: Response) => {
  const { id } = req.params;
  const getDivision = new GetDivision(divisionRepository);
  try {
    const division = await getDivision.execute(id);
    res.status(200).json(successResponse(division, 'Division fetched successfully'));
  } catch (error) {
    if (error instanceof DivisionNotFoundException) {
      logger.warn('Division not found: %s', id);
      return res.status(404).json(errorResponse(error.message, 404));
    }
    logger.error('Error fetching division: %s', (error as Error).message);
    res.status(500).json(errorResponse((error as Error).message));
  }
};

export const updateDivision = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, remark, status } = req.body;
  const updateDivision = new UpdateDivision(divisionRepository);
  try {
    const division = await updateDivision.execute(id, name, description, remark, status);
    res.status(200).json(successResponse(division, 'Division updated successfully'));
  } catch (error) {
    if (error instanceof DivisionNotFoundException) {
      logger.warn('Division not found: %s', id);
      return res.status(404).json(errorResponse(error.message, 404));
    }
    logger.error('Error updating division: %s', (error as Error).message);
    res.status(500).json(errorResponse((error as Error).message));
  }
};

export const deleteDivision = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteDivision = new DeleteDivision(divisionRepository);
  try {
    await deleteDivision.execute(id);
    logger.info('Division deleted successfully: %s', id);
    res.status(204).json(successResponse(null, 'Division deleted successfully', 204));
  } catch (error) {
    if (error instanceof DivisionNotFoundException) {
      logger.warn('Division not found: %s', id);
      return res.status(404).json(errorResponse(error.message, 404));
    }
    logger.error('Error deleting division: %s', (error as Error).message);
    res.status(500).json(errorResponse((error as Error).message));
  }
};