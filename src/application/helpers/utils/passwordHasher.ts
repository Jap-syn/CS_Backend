import argon2 from 'argon2';

class PasswordHasher {
  async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  async verifyPassword(hash: string, password: string): Promise<boolean> {
    return await argon2.verify(hash, password);
  }
}

export const passwordHasher = new PasswordHasher();
