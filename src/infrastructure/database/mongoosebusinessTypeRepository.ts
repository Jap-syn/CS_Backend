import { BusinessTypeSchema } from './models/businessTypeSchema';
import BusinessType from '../../domain/models/businessType';
import BusinessTypeRepository from '../../domain/repositories/businessTypeRepository';

export default class MongooseBusinessTypeRepository implements BusinessTypeRepository {
  async findAll(): Promise<BusinessType[]> {
    const businessTypes = await BusinessTypeSchema.find();
    return businessTypes.map(businessType => new BusinessType(businessType.id, businessType.name, businessType.short_name, businessType.remark, businessType.status));
  }

  async findByEmail(email: string): Promise<BusinessType | null> {
    const businessType = await BusinessTypeSchema.findOne({ email });
    if (!businessType) return null;
    return new BusinessType(businessType.id, businessType.name, businessType.short_name, businessType.remark, businessType.status);
  }

  async findById(id: string): Promise<BusinessType | null> {
    const businessType = await BusinessTypeSchema.findById(id);
    if (!businessType) return null;
    return new BusinessType(businessType.id, businessType.name, businessType.short_name, businessType.remark, businessType.status);
  }

  async save(businessType: BusinessType): Promise<void> {
    const newBusinessType = new BusinessTypeSchema(businessType);
    await newBusinessType.save();
  }

  async update(businessType: BusinessType): Promise<void> {
    await BusinessTypeSchema.findByIdAndUpdate(businessType.id, businessType);
  }

  async delete(id: string): Promise<void> {
    await BusinessTypeSchema.findByIdAndDelete(id);
  }
}
