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
exports.DetailEntity = void 0;
const typeorm_1 = require("typeorm");
const image_entity_1 = require("../images/image.entity");
let DetailEntity = class DetailEntity {
};
exports.DetailEntity = DetailEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DetailEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DetailEntity.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DetailEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DetailEntity.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], DetailEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'float',
        default: 0,
    }),
    __metadata("design:type", Number)
], DetailEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DetailEntity.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => image_entity_1.Image, image => image.detail),
    __metadata("design:type", Array)
], DetailEntity.prototype, "images", void 0);
exports.DetailEntity = DetailEntity = __decorate([
    (0, typeorm_1.Entity)('details')
], DetailEntity);
//# sourceMappingURL=details.entity.js.map