import GetUsers from '../../../src/application/usecases/user/getUsers';
import User from '../../../src/domain/models/user';
import UserRepository from '../../../src/domain/repositories/userRepository';

class MockUserRepository implements UserRepository {
  private users: User[] = [
    new User('1', 'John Doe', 'john@example.com', '123456'),
    new User('2', 'Jane Doe', 'jane@example.com', '654321')
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

describe('GetUsers Use Case', () => {
  it('should get all users', async () => {
    const userRepository = new MockUserRepository();
    const getUsers = new GetUsers(userRepository);

    const users = await getUsers.execute();

    expect(users).toBeDefined();
    expect(users.length).toBe(2);
  });
});
