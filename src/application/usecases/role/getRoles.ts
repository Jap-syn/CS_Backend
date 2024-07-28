import RoleRepository from '../../../domain/repositories/roleRepository';
import Role from '../../../domain/models/role';

export default class GetRoles {
  constructor(private roleRepository: RoleRepository) {}

  async execute(): Promise<Role[]> {
    return this.roleRepository.findAll();
  }
}
