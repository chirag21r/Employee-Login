"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entity/user.entity");
const bcrypt = require("bcrypt");
const role_entity_1 = require("../roles/entity/role.entity");
let UserService = class UserService {
    constructor(userRepository, roleRepo) {
        this.userRepository = userRepository;
        this.roleRepo = roleRepo;
    }
    async createUser(user) {
        if (!user.password) {
            throw new Error('Password is required to create a user');
        }
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
        return this.userRepository.save(user);
    }
    async findByEmail(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        return user === null ? undefined : user;
    }
    async findById(id, options = {}) {
        const user = await this.userRepository.findOne({
            where: { id },
            ...options,
        });
        return user ?? undefined;
    }
    async updateRoles(userId, roleIds) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['roles'],
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const roles = await this.roleRepo.findByIds(roleIds);
        user.roles = roles;
        return this.userRepository.save(user);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map