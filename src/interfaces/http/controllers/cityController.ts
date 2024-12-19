import { Request, Response } from 'express';
import CreateCity from '../../../application/usecases/city/createCity';
import GetCities from '../../../application/usecases/city/getCities';
import GetCity from '../../../application/usecases/city/getCity';
import UpdateCity from '../../../application/usecases/city/updateCity';
import DeleteCity from '../../../application/usecases/city/deleteCity';
import MongooseCityRepository from '../../../infrastructure/database/mongooseCityRepository';
import logger from '../../../infrastructure/config/logger';
import CityNotFoundException from '../../../domain/exceptions/cityNotFoundException';
import { successResponse, errorResponse } from '../../../application/helpers/utils/response';

const cityRepository = new MongooseCityRepository();


export const createCity = async (req: Request, res: Response) => {
  const { division_id, name, description, remark, status } = req.body;
  const createCity = new CreateCity(cityRepository);
  try {
    const city = await createCity.execute(division_id, name, description, remark, status);
    res.status(201).json(successResponse(city, 'City created successfully', 201));
  } catch (error) {
    logger.error('Error creating city: %s', (error as Error).message);
    res.status(500).json(errorResponse((error as Error).message));
  }
};

export const getCities = async (req: Request, res: Response) => {
  const getCities = new GetCities(cityRepository);
  try {
    const cities = await getCities.execute();
    res.status(200).json(successResponse(cities, 'Cities fetched successfully'));
  } catch (error) {
    logger.error('Error fetching citys: %s', (error as Error).message);
    res.status(500).json(errorResponse((error as Error).message));
  }
};

export const getCity = async (req: Request, res: Response) => {
  const { id } = req.params;
  const getCity = new GetCity(cityRepository);
  try {
    const city = await getCity.execute(id);
    res.status(200).json(successResponse(city, 'City fetched successfully'));
  } catch (error) {
    if (error instanceof CityNotFoundException) {
      logger.warn('City not found: %s', id);
      return res.status(404).json(errorResponse(error.message, 404));
    }
    logger.error('Error fetching city: %s', (error as Error).message);
    res.status(500).json(errorResponse((error as Error).message));
  }
};

export const updateCity = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { division_id, name, description, remark, status } = req.body;
  const updateCity = new UpdateCity(cityRepository);
  try {
    const city = await updateCity.execute(id, division_id, name, description, remark, status);
    res.status(200).json(successResponse(city, 'City updated successfully'));
  } catch (error) {
    if (error instanceof CityNotFoundException) {
      logger.warn('City not found: %s', id);
      return res.status(404).json(errorResponse(error.message, 404));
    }
    logger.error('Error updating city: %s', (error as Error).message);
    res.status(500).json(errorResponse((error as Error).message));
  }
};

export const deleteCity = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteCity = new DeleteCity(cityRepository);
  try {
    await deleteCity.execute(id);
    logger.info('City deleted successfully: %s', id);
    res.status(204).json(successResponse(null, 'City deleted successfully', 204));
  } catch (error) {
    if (error instanceof CityNotFoundException) {
      logger.warn('City not found: %s', id);
      return res.status(404).json(errorResponse(error.message, 404));
    }
    logger.error('Error deleting city: %s', (error as Error).message);
    res.status(500).json(errorResponse((error as Error).message));
  }
};