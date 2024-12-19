import DivisionSchemaRepository from '../../../domain/repositories/divisionRepository';
import DivisionSchemaNotFoundException from '../../../domain/exceptions/divisionNotFoundException';
import DivisionSchema from '../../../domain/models/division';

export default class GetDivisionSchema {
  constructor(private divisionRepository: DivisionSchemaRepository) {}

  async execute(id: string): Promise<DivisionSchema> {
    const division = await this.divisionRepository.findById(id);
    if (!division) {
      throw new DivisionSchemaNotFoundException(id);
    }
    return division;
  }
}
