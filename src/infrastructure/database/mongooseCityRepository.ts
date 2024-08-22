import { CitySchema } from './models/citySchema';
import City from '../../domain/models/city';
import CityRepository from '../../domain/repositories/cityRepository';

export default class MongooseCityRepository implements CityRepository {
  async findAll(): Promise<City[]> {
    const citys = await CitySchema.find();
    return citys.map(city => new City(city.id, city.division_id, city.name, city.description, city.remark, city.status));
  }

  async findByEmail(email: string): Promise<City | null> {
    const city = await CitySchema.findOne({ email });
    if (!city) return null;
    return new City(city.id, city.division_id, city.name, city.description, city.remark, city.status);
  }

  async findById(id: string): Promise<City | null> {
    const city = await CitySchema.findById(id);
    if (!city) return null;
    return new City(city.id, city.division_id, city.name, city.description, city.remark, city.status);
  }

  async save(city: City): Promise<void> {
    const newCity = new CitySchema(city);
    await newCity.save();
  }

  async update(city: City): Promise<void> {
    await CitySchema.findByIdAndUpdate(city.id, city);
  }

  async delete(id: string): Promise<void> {
    await CitySchema.findByIdAndDelete(id);
  }
}
