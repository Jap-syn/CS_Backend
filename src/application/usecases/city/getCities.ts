import CityRepository from '../../../domain/repositories/cityRepository';
import City from '../../../domain/models/city';

export default class GetCities {
  constructor(private cityRepository: CityRepository) {}

  async execute(): Promise<City[]> {
    return this.cityRepository.findAll();
  }
}
