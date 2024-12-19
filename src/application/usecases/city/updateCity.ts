import CitySchemaRepository from '../../../domain/repositories/cityRepository';
import CitySchema from '../../../domain/models/city';
import CitySchemaNotFoundException from '../../../domain/exceptions/cityNotFoundException';

export default class UpdateCitySchema {
  constructor(private cityRepository: CitySchemaRepository) { }

  async execute(id: string, division_id: string, name: string, description: string, remark: string, status: number): Promise<CitySchema> {
    const city = await this.cityRepository.findById(id);
    if (!city) {
      throw new CitySchemaNotFoundException(id);
    }
    city.division_id = division_id;
    city.name = name;
    city.description = description;
    city.remark = remark;
    city.status = status;
    await this.cityRepository.update(city);
    return city;
  }
}
