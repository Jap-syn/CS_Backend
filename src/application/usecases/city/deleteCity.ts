import CityRepository from '../../../domain/repositories/cityRepository';
import CityNotFoundException from '../../../domain/exceptions/cityNotFoundException';

export default class DeleteCity {
  constructor(private cityRepository: CityRepository) {}

  async execute(id: string): Promise<void> {
    const city = await this.cityRepository.findById(id);
    if (!city) {
      throw new CityNotFoundException(id);
    }
    await this.cityRepository.delete(id);
  }
}
