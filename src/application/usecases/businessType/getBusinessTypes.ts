import BusinessTypeRepository from '../../../domain/repositories/businessTypeRepository';
import BusinessType from '../../../domain/models/businessType';

export default class GetBusinessTypes {
  constructor(private businessTypeRepository: BusinessTypeRepository) {}

  async execute(): Promise<BusinessType[]> {
    return this.businessTypeRepository.findAll();
  }
}
