import City from '../models/city';

export default interface CityRepository {
  findAll(): Promise<City[]>;
  findById(id: string): Promise<City | null>;
  findByEmail(email: string): Promise<City | null>;
  save(city: City): Promise<void>;
  update(city: City): Promise<void>;
  delete(id: string): Promise<void>;
}
