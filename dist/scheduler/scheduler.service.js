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
var SchedulerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulerService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const log_service_1 = require("../logs/log.service");
const child_process_1 = require("child_process");
let SchedulerService = SchedulerService_1 = class SchedulerService {
    constructor(logsService) {
        this.logsService = logsService;
        this.logger = new common_1.Logger(SchedulerService_1.name);
    }
    async handleLogCleanup() {
        const deleted = await this.logsService.deleteOldLogs();
        this.logger.log(`Deleted ${deleted} old logs.`);
    }
    handleBackupWithRclone() {
        const remote = process.env.RCLONE_REMOTE;
        const source = process.env.RCLONE_SOURCE_PATH;
        const dest = process.env.RCLONE_DEST_PATH;
        const command = `rclone copy ${source} ${remote}:${dest}`;
        (0, child_process_1.exec)(command, (error, stdout, stderr) => {
            if (error) {
                this.logger.error(`Backup failed: ${error.message}`);
                return;
            }
            if (stderr) {
                this.logger.warn(`Backup stderr: ${stderr}`);
                return;
            }
            this.logger.log(`Backup success: ${stdout}`);
        });
    }
};
exports.SchedulerService = SchedulerService;
__decorate([
    (0, schedule_1.Cron)('0 2 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchedulerService.prototype, "handleLogCleanup", null);
__decorate([
    (0, schedule_1.Cron)('0 3 * * 0'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SchedulerService.prototype, "handleBackupWithRclone", null);
exports.SchedulerService = SchedulerService = SchedulerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [log_service_1.LogsService])
], SchedulerService);
//# sourceMappingURL=scheduler.service.js.map