import DivisionRepository from '../../../domain/repositories/divisionRepository';
import DivisionNotFoundException from '../../../domain/exceptions/divisionNotFoundException';

export default class DeleteDivision {
  constructor(private divisionRepository: DivisionRepository) {}

  async execute(id: string): Promise<void> {
    const division = await this.divisionRepository.findById(id);
    if (!division) {
      throw new DivisionNotFoundException(id);
    }
    await this.divisionRepository.delete(id);
  }
}
