import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { Role } from 'src/roles/entity/role.entity';
export declare class UserService {
    private userRepository;
    private roleRepo;
    constructor(userRepository: Repository<User>, roleRepo: Repository<Role>);
    createUser(user: Partial<User>): Promise<User>;
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    updateRoles(userId: string, roleIds: string[]): Promise<User>;
}
