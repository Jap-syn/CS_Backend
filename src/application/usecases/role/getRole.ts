import RoleSchemaRepository from '../../../domain/repositories/roleRepository';
import RoleSchemaNotFoundException from '../../../domain/exceptions/roleNotFoundException';
import RoleSchema from '../../../domain/models/role';

export default class GetRoleSchema {
  constructor(private roleRepository: RoleSchemaRepository) {}

  async execute(id: string): Promise<RoleSchema> {
    const role = await this.roleRepository.findById(id);
    if (!role) {
      throw new RoleSchemaNotFoundException(id);
    }
    return role;
  }
}
