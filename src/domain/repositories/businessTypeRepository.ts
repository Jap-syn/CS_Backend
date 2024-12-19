import businessType from '../models/businessType';

export default interface businessTypeRepository {
  findAll(): Promise<businessType[]>;
  findById(id: string): Promise<businessType | null>;
  findByEmail(email: string): Promise<businessType | null>;
  save(businessType: businessType): Promise<void>;
  update(businessType: businessType): Promise<void>;
  delete(id: string): Promise<void>;
}
