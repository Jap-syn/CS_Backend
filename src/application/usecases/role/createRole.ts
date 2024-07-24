import RoleRepository from "../../../domain/repositories/roleRepository";
import Role from "../../../domain/models/role";
export default class CreateRole {
  constructor(private roleRepository: RoleRepository) {}

  async execute(name: string, description: string, remark: string, status: number): Promise<Role> {
    const role = new Role("", name, description, remark, status);
    await this.roleRepository.save(role);
    return role;
  }
}
