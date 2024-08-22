import { DivisionSchema } from './models/divisionSchema';
import Division from '../../domain/models/division';
import DivisionRepository from '../../domain/repositories/divisionRepository';

export default class MongooseDivisionRepository implements DivisionRepository {
  async findAll(): Promise<Division[]> {
    const divisions = await DivisionSchema.find();
    return divisions.map(division => new Division(division.id, division.name, division.description, division.remark, division.status));
  }

  async findByEmail(email: string): Promise<Division | null> {
    const division = await DivisionSchema.findOne({ email });
    if (!division) return null;
    return new Division(division.id, division.name, division.description, division.remark, division.status);
  }

  async findById(id: string): Promise<Division | null> {
    const division = await DivisionSchema.findById(id);
    if (!division) return null;
    return new Division(division.id, division.name, division.description, division.remark, division.status);
  }

  async save(division: Division): Promise<void> {
    const newDivision = new DivisionSchema(division);
    await newDivision.save();
  }

  async update(division: Division): Promise<void> {
    await DivisionSchema.findByIdAndUpdate(division.id, division);
  }

  async delete(id: string): Promise<void> {
    await DivisionSchema.findByIdAndDelete(id);
  }
}
