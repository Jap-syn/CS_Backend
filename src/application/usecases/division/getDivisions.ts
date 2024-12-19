import DivisionRepository from '../../../domain/repositories/divisionRepository';
import Division from '../../../domain/models/division';

export default class GetDivisions {
  constructor(private divisionRepository: DivisionRepository) {}

  async execute(): Promise<Division[]> {
    return this.divisionRepository.findAll();
  }
}
