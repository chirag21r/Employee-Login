import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/entity/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
  ) {}

  async createUser(user: Partial<User>): Promise<User> {
    if (!user.password) {
      throw new Error('Password is required to create a user');
    }
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user === null ? undefined : user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { id } });
    return user === null ? undefined : user;
  }

  async updateRoles(userId: string, roleIds: string[]) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const roles = await this.roleRepo.findByIds(roleIds);
    user.roles = roles;

    return this.userRepository.save(user);
  }
}
