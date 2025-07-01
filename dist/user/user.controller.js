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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const log_service_1 = require("../logs/log.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const log_entity_1 = require("../logs/log.entity");
const assign_roles_dto_1 = require("./dto/assign-roles.dto");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const roles_guard_1 = require("../common/guards/roles.guard");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_enum_1 = require("../common/constants/roles.enum");
let UserController = class UserController {
    constructor(userService, logsService) {
        this.userService = userService;
        this.logsService = logsService;
    }
    async signup(body) {
        const { email } = body;
        if (!email.endsWith('@sandlogic.com')) {
            throw new common_1.BadRequestException('Email must be a @sandlogic.com domain');
        }
        const existingUser = await this.userService.findByEmail(email);
        if (existingUser) {
            throw new common_1.ConflictException('Email is already registered');
        }
        const user = await this.userService.createUser(body);
        await this.logsService.createLog({
            employeeId: user.id,
            action: log_entity_1.LogAction.SIGNUP,
            ipAddress: 'N/A',
            userAgent: 'N/A',
        });
        return user;
    }
    async updateUserRoles(userId, dto) {
        return this.userService.updateRoles(userId, dto.roleIds);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signup", null);
__decorate([
    Put(':id/roles'),
    UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.UserRole.SUPER_ADMIN),
    __param(0, Param('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, assign_roles_dto_1.AssignRolesDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserRoles", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        log_service_1.LogsService])
], UserController);
//# sourceMappingURL=user.controller.js.map