import CityRepository from "../../../domain/repositories/cityRepository";
import City from "../../../domain/models/city";
export default class CreateCity {
  constructor(private cityRepository: CityRepository) {}

  async execute(division_id: string, name: string, description: string, remark: string, status: number): Promise<City> {
    const city = new City("", division_id, name, description, remark, status);
    await this.cityRepository.save(city);
    return city;
  }
}
