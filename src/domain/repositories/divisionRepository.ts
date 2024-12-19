import Division from '../models/division';

export default interface DivisionRepository {
  findAll(): Promise<Division[]>;
  findById(id: string): Promise<Division | null>;
  findByEmail(email: string): Promise<Division | null>;
  save(division: Division): Promise<void>;
  update(division: Division): Promise<void>;
  delete(id: string): Promise<void>;
}
