import Role from '../models/role';

export default interface RoleRepository {
  findAll(): Promise<Role[]>;
  findById(id: string): Promise<Role | null>;
  findByEmail(email: string): Promise<Role | null>;
  save(role: Role): Promise<void>;
  update(role: Role): Promise<void>;
  delete(id: string): Promise<void>;
}
