import RoleRepository from '../../../domain/repositories/roleRepository';
import RoleNotFoundException from '../../../domain/exceptions/roleNotFoundException';

export default class DeleteRole {
  constructor(private roleRepository: RoleRepository) {}

  async execute(id: string): Promise<void> {
    const role = await this.roleRepository.findById(id);
    if (!role) {
      throw new RoleNotFoundException(id);
    }
    await this.roleRepository.delete(id);
  }
}
