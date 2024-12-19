import CitySchemaRepository from '../../../domain/repositories/cityRepository';
import CitySchemaNotFoundException from '../../../domain/exceptions/cityNotFoundException';
import CitySchema from '../../../domain/models/city';

export default class GetCitySchema {
  constructor(private cityRepository: CitySchemaRepository) {}

  async execute(id: string): Promise<CitySchema> {
    const city = await this.cityRepository.findById(id);
    if (!city) {
      throw new CitySchemaNotFoundException(id);
    }
    return city;
  }
}
