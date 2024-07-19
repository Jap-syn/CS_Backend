import DeleteUser from '../../../src/application/usecases/user/deleteUser';
import User from '../../../src/domain/models/user';
import UserRepository from '../../../src/domain/repositories/userRepository';
import UserNotFoundException from '../../../src/domain/exceptions/userNotFoundException';

class MockUserRepository implements UserRepository {
  private users: User[] = [
    new User('1', 'John Doe', 'john@example.com', '123456')
  ];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async update(user: User): Promise<void> {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index === -1) throw new Error('User not found');
    this.users[index] = user;
  }

  async delete(id: string): Promise<void> {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) throw new Error('User not found');
    this.users.splice(index, 1);
  }
}

describe('DeleteUser Use Case', () => {
  it('should delete a user', async () => {
    const userRepository = new MockUserRepository();
    const deleteUser = new DeleteUser(userRepository);

    await expect(deleteUser.execute('1')).resolves.not.toThrow();
    expect(userRepository.findById('1')).resolves.toBeNull();
  });

  it('should throw UserNotFoundException if user not found', async () => {
    const userRepository = new MockUserRepository();
    const deleteUser = new DeleteUser(userRepository);

    await expect(deleteUser.execute('2')).rejects.toThrow(UserNotFoundException);
  });
});
