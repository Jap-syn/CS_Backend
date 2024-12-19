import DivisionRepository from "../../../domain/repositories/divisionRepository";
import Division from "../../../domain/models/division";
export default class CreateDivision {
  constructor(private divisionRepository: DivisionRepository) {}

  async execute(name: string, description: string, remark: string, status: number): Promise<Division> {
    const division = new Division("", name, description, remark, status);
    await this.divisionRepository.save(division);
    return division;
  }
}
