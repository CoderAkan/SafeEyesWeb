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
exports.PpeController = void 0;
const common_1 = require("@nestjs/common");
const ppe_service_1 = require("./ppe.service");
const create_ppe_dto_1 = require("./dto/create-ppe.dto");
const update_ppe_dto_1 = require("./dto/update-ppe.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let PpeController = class PpeController {
    constructor(ppeService) {
        this.ppeService = ppeService;
    }
    create(createPpeDto, req) {
        return this.ppeService.create(createPpeDto, +req.user.id);
    }
    findAll(req) {
        return this.ppeService.findAll(+req.user.id);
    }
    findOne(id) {
        return this.ppeService.findOne(+id);
    }
    update(id, updatePpeDto, req) {
        return this.ppeService.update(+id, updatePpeDto, +req.user.id);
    }
    remove(id) {
        return this.ppeService.remove(+id);
    }
};
exports.PpeController = PpeController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ppe_dto_1.CreatePpeDto, Object]),
    __metadata("design:returntype", void 0)
], PpeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PpeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PpeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_ppe_dto_1.UpdatePpeDto, Object]),
    __metadata("design:returntype", void 0)
], PpeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PpeController.prototype, "remove", null);
exports.PpeController = PpeController = __decorate([
    (0, common_1.Controller)('ppe'),
    __metadata("design:paramtypes", [ppe_service_1.PpeService])
], PpeController);
//# sourceMappingURL=ppe.controller.js.map