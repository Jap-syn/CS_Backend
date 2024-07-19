import GetUser from '../../../src/application/usecases/user/getUser';
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

describe('GetUser Use Case', () => {
  it('should get a user by ID', async () => {
    const userRepository = new MockUserRepository();
    const getUser = new GetUser(userRepository);

    const user = await getUser.execute('1');

    expect(user).toBeDefined();
    expect(user.name).toBe('John Doe');
  });

  it('should throw UserNotFoundException if user not found', async () => {
    const userRepository = new MockUserRepository();
    const getUser = new GetUser(userRepository);

    await expect(getUser.execute('2')).rejects.toThrow(UserNotFoundException);
  });
});
