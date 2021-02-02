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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Group_entity_1 = __importDefault(require("./Group.entity"));
let Door = class Door {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Door.prototype, "did", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 50 }),
    __metadata("design:type", String)
], Door.prototype, "door_name", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 50 }),
    __metadata("design:type", String)
], Door.prototype, "endpoint", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Group_entity_1.default, (group) => group.doors),
    __metadata("design:type", Array)
], Door.prototype, "groups", void 0);
Door = __decorate([
    typeorm_1.Entity()
], Door);
exports.default = Door;
//# sourceMappingURL=Door.entity.js.map