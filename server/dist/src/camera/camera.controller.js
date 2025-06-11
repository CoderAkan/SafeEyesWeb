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
exports.CameraController = void 0;
const common_1 = require("@nestjs/common");
const camera_service_1 = require("./camera.service");
const create_camera_dto_1 = require("./dto/create-camera.dto");
const update_camera_dto_1 = require("./dto/update-camera.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let CameraController = class CameraController {
    constructor(cameraService) {
        this.cameraService = cameraService;
    }
    create(createCameraDto, req) {
        const userId = Number(req.user.sub);
        if (!userId) {
            throw new common_1.UnauthorizedException("User ID is missing");
        }
        return this.cameraService.create(createCameraDto, userId);
    }
    findAll(req) {
        const userId = Number(req.user.sub);
        return this.cameraService.findAll(userId);
    }
    findOne(id) {
        return this.cameraService.findOne(+id);
    }
    update(id, updateCameraDto) {
        return this.cameraService.update(+id, updateCameraDto);
    }
    remove(id) {
        return this.cameraService.remove(+id);
    }
    async startStream(id, req) {
        const userId = Number(req.user.sub);
        const cameraId = Number(id);
        if (!userId) {
            throw new common_1.UnauthorizedException("User ID is missing");
        }
        await this.cameraService.startCameraStream(cameraId, userId);
        return {
            message: 'Camera stream started successfully',
            cameraId,
            status: 'streaming'
        };
    }
    stopStream(id) {
        const cameraId = Number(id);
        this.cameraService.stopCameraStream(cameraId);
        return {
            message: 'Camera stream stopped successfully',
            cameraId,
            status: 'stopped'
        };
    }
    getStreamStatus(id) {
        const cameraId = Number(id);
        const isStreaming = this.cameraService.getCameraStreamingStatus(cameraId);
        return {
            cameraId,
            isStreaming,
            status: isStreaming ? 'streaming' : 'stopped',
            timestamp: new Date().toISOString()
        };
    }
    getActiveStreams(req) {
        const activeStreams = this.cameraService.getActiveStreams();
        return {
            activeStreams,
            count: activeStreams.length,
            timestamp: new Date().toISOString()
        };
    }
    async stopAllStreams() {
        await this.cameraService.cleanup();
        return {
            message: 'All camera streams stopped successfully',
            timestamp: new Date().toISOString()
        };
    }
};
exports.CameraController = CameraController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_camera_dto_1.CreateCameraDto, Object]),
    __metadata("design:returntype", void 0)
], CameraController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CameraController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_camera_dto_1.UpdateCameraDto]),
    __metadata("design:returntype", void 0)
], CameraController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CameraController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/stream/start'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CameraController.prototype, "startStream", null);
__decorate([
    (0, common_1.Post)(':id/stream/stop'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CameraController.prototype, "stopStream", null);
__decorate([
    (0, common_1.Get)(':id/stream/status'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CameraController.prototype, "getStreamStatus", null);
__decorate([
    (0, common_1.Get)('streams/active'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraController.prototype, "getActiveStreams", null);
__decorate([
    (0, common_1.Post)('streams/stop-all'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CameraController.prototype, "stopAllStreams", null);
exports.CameraController = CameraController = __decorate([
    (0, common_1.Controller)('camera'),
    __metadata("design:paramtypes", [camera_service_1.CameraService])
], CameraController);
//# sourceMappingURL=camera.controller.js.map