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
exports.CreateAuditLogDto = void 0;
const class_validator_1 = require("class-validator");
class CreateAuditLogDto {
}
exports.CreateAuditLogDto = CreateAuditLogDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateAuditLogDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAuditLogDto.prototype, "action", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAuditLogDto.prototype, "resourceType", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAuditLogDto.prototype, "resourceId", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateAuditLogDto.prototype, "oldValues", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateAuditLogDto.prototype, "newValues", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAuditLogDto.prototype, "ipAddress", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAuditLogDto.prototype, "userAgent", void 0);
//# sourceMappingURL=create-audit-log.dto.js.map