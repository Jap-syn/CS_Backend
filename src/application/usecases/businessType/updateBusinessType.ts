import BusinessTypeSchemaRepository from '../../../domain/repositories/businessTypeRepository';
import BusinessTypeSchema from '../../../domain/models/businessType';
import BusinessTypeSchemaNotFoundException from '../../../domain/exceptions/businessTypeNotFoundException';

export default class UpdateBusinessTypeSchema {
  constructor(private businessTypeRepository: BusinessTypeSchemaRepository) { }

  async execute(id: string, name: string, short_name: string, remark: string, status: number): Promise<BusinessTypeSchema> {
    const businessType = await this.businessTypeRepository.findById(id);
    if (!businessType) {
      throw new BusinessTypeSchemaNotFoundException(id);
    }
    businessType.name = name;
    businessType.short_name = short_name;
    businessType.remark = remark;
    businessType.status = status;
    await this.businessTypeRepository.update(businessType);
    return businessType;
  }
}
