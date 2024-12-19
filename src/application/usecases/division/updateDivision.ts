import DivisionSchemaRepository from '../../../domain/repositories/divisionRepository';
import DivisionSchema from '../../../domain/models/division';
import DivisionSchemaNotFoundException from '../../../domain/exceptions/divisionNotFoundException';

export default class UpdateDivisionSchema {
  constructor(private divisionRepository: DivisionSchemaRepository) { }

  async execute(id: string, name: string, description: string, remark: string, status: number): Promise<DivisionSchema> {
    const division = await this.divisionRepository.findById(id);
    if (!division) {
      throw new DivisionSchemaNotFoundException(id);
    }
    division.name = name;
    division.description = description;
    division.remark = remark;
    division.status = status;
    await this.divisionRepository.update(division);
    return division;
  }
}
