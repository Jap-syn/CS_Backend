import BusinessTypeRepository from '../../../domain/repositories/businessTypeRepository';
import BusinessTypeNotFoundException from '../../../domain/exceptions/businessTypeNotFoundException';

export default class DeleteBusinessType {
  constructor(private businessTypeRepository: BusinessTypeRepository) {}

  async execute(id: string): Promise<void> {
    const businessType = await this.businessTypeRepository.findById(id);
    if (!businessType) {
      throw new BusinessTypeNotFoundException(id);
    }
    await this.businessTypeRepository.delete(id);
  }
}
