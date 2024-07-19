import CreateUser from '../../../src/application/usecases/user/createUser';
import User from '../../../src/domain/models/user';
import UserRepository from '../../../src/domain/repositories/userRepository';

class MockUserRepository implements UserRepository {
  private users: User[] = [];

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

describe('CreateUser Use Case', () => {
  it('should create a new user', async () => {
    const userRepository = new MockUserRepository();
    const createUser = new CreateUser(userRepository);

    const user = await createUser.execute('John Doe', 'john@example.com', '123456');

    expect(user).toBeDefined();
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john@example.com');
  });
});
