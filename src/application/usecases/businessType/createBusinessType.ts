import BusinessTypeRepository from "../../../domain/repositories/businessTypeRepository";
import BusinessType from "../../../domain/models/businessType";
export default class CreateBusinessType {
  constructor(private businessTypeRepository: BusinessTypeRepository) {}

  async execute(name: string, short_name: string, remark: string, status: number): Promise<BusinessType> {
    const businessType = new BusinessType("", name, short_name, remark, status);
    await this.businessTypeRepository.save(businessType);
    return businessType;
  }
}
