import { RoleSchema } from './models/roleSchema';
import Role from '../../domain/models/role';
import RoleRepository from '../../domain/repositories/roleRepository';

export default class MongooseRoleRepository implements RoleRepository {
  async findAll(): Promise<Role[]> {
    const roles = await RoleSchema.find();
    return roles.map(role => new Role(role.id, role.name, role.description, role.remark, role.status));
  }

  async findByEmail(email: string): Promise<Role | null> {
    const role = await RoleSchema.findOne({ email });
    if (!role) return null;
    return new Role(role.id, role.name, role.description, role.remark, role.status);
  }

  async findById(id: string): Promise<Role | null> {
    const role = await RoleSchema.findById(id);
    if (!role) return null;
    return new Role(role.id, role.name, role.description, role.remark, role.status);
  }

  async save(role: Role): Promise<void> {
    const newRole = new RoleSchema(role);
    await newRole.save();
  }

  async update(role: Role): Promise<void> {
    await RoleSchema.findByIdAndUpdate(role.id, role);
  }

  async delete(id: string): Promise<void> {
    await RoleSchema.findByIdAndDelete(id);
  }
}
