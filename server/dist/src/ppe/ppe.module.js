"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PpeModule = void 0;
const common_1 = require("@nestjs/common");
const ppe_service_1 = require("./ppe.service");
const ppe_controller_1 = require("./ppe.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
let PpeModule = class PpeModule {
};
exports.PpeModule = PpeModule;
exports.PpeModule = PpeModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [ppe_controller_1.PpeController],
        providers: [ppe_service_1.PpeService],
    })
], PpeModule);
//# sourceMappingURL=ppe.module.js.map