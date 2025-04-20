"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePpeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_ppe_dto_1 = require("./create-ppe.dto");
class UpdatePpeDto extends (0, mapped_types_1.PartialType)(create_ppe_dto_1.CreatePpeDto) {
}
exports.UpdatePpeDto = UpdatePpeDto;
//# sourceMappingURL=update-ppe.dto.js.map