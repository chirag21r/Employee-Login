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
exports.SchedulerService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const child_process_1 = require("child_process");
let SchedulerService = class SchedulerService {
    async backupToDrive() {
        console.log('📦 Starting DB export + Google Drive backup...');
        (0, child_process_1.exec)('./export_db.sh', (err, stdout, stderr) => {
            if (err) {
                console.error('❌ DB Export failed:', stderr);
                return;
            }
            console.log('✅ DB Exported:\n', stdout);
            (0, child_process_1.exec)(`rclone sync ./logfile/ ${process.env.RCLONE_REMOTE}:${process.env.RCLONE_DEST_PATH}`, (err, stdout, stderr) => {
                if (err) {
                    console.error('❌ Rclone sync failed:', stderr);
                }
                else {
                    console.log('✅ Rclone sync success:', stdout);
                }
            });
        });
    }
};
exports.SchedulerService = SchedulerService;
__decorate([
    (0, schedule_1.Cron)('0 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchedulerService.prototype, "backupToDrive", null);
exports.SchedulerService = SchedulerService = __decorate([
    (0, common_1.Injectable)()
], SchedulerService);
//# sourceMappingURL=scheduler.service.js.map