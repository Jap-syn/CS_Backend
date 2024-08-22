import BusinessTypeSchemaRepository from '../../../domain/repositories/businessTypeRepository';
import BusinessTypeSchemaNotFoundException from '../../../domain/exceptions/businessTypeNotFoundException';
import BusinessTypeSchema from '../../../domain/models/businessType';

export default class GetBusinessTypeSchema {
  constructor(private businessTypeRepository: BusinessTypeSchemaRepository) {}

  async execute(id: string): Promise<BusinessTypeSchema> {
    const businessType = await this.businessTypeRepository.findById(id);
    if (!businessType) {
      throw new BusinessTypeSchemaNotFoundException(id);
    }
    return businessType;
  }
}
