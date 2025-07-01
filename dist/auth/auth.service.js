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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_service_1 = require("../user/user.service");
const log_service_1 = require("../logs/log.service");
const log_entity_1 = require("../logs/log.entity");
let AuthService = class AuthService {
    constructor(userService, jwtService, logsService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.logsService = logsService;
    }
    async validateUser(email, password) {
        if (!email.endsWith('@sandlogic.com')) {
            throw new common_1.UnauthorizedException('Only sandlogic.com email addresses are allowed');
        }
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const { password: _, ...safeUser } = user;
        return safeUser;
    }
    async login(user, ip, userAgent) {
        const fullUser = await this.userService.findById(user.id, {
            relations: ['roles'],
        });
        const payload = {
            sub: fullUser?.id,
            email: fullUser?.email,
            roles: fullUser?.roles.map((r) => r.name),
        };
        await this.logsService.createLog({
            employeeId: fullUser?.id,
            action: log_entity_1.LogAction.LOGIN,
            ipAddress: ip || 'N/A',
            userAgent: userAgent || 'N/A',
        });
        return {
            access_token: this.jwtService.sign(payload),
            user: fullUser,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        log_service_1.LogsService])
], AuthService);
//# sourceMappingURL=auth.service.js.map