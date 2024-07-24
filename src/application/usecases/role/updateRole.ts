import RoleSchemaRepository from '../../../domain/repositories/roleRepository';
import RoleSchema from '../../../domain/models/role';
import RoleSchemaNotFoundException from '../../../domain/exceptions/roleNotFoundException';

export default class UpdateRoleSchema {
  constructor(private roleRepository: RoleSchemaRepository) { }

  async execute(id: string, name: string, description: string, remark: string, status: number): Promise<RoleSchema> {
    const role = await this.roleRepository.findById(id);
    if (!role) {
      throw new RoleSchemaNotFoundException(id);
    }
    role.name = name;
    role.description = description;
    role.remark = remark;
    role.status = status;
    await this.roleRepository.update(role);
    return role;
  }
}
