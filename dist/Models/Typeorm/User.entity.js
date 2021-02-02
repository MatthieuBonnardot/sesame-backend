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
var typeorm_1 = require("typeorm");
var Group_entity_1 = __importDefault(require("./Group.entity"));
var User = (function () {
    function User() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], User.prototype, "uid", void 0);
    __decorate([
        typeorm_1.Column('varchar', { length: 36 }),
        __metadata("design:type", String)
    ], User.prototype, "aid", void 0);
    __decorate([
        typeorm_1.Column('int'),
        __metadata("design:type", Number)
    ], User.prototype, "gid", void 0);
    __decorate([
        typeorm_1.Column('varchar', { length: 25 }),
        __metadata("design:type", String)
    ], User.prototype, "registration_key", void 0);
    __decorate([
        typeorm_1.Column('int'),
        __metadata("design:type", Number)
    ], User.prototype, "door_key", void 0);
    __decorate([
        typeorm_1.Column('varchar', { length: 50 }),
        __metadata("design:type", String)
    ], User.prototype, "first_name", void 0);
    __decorate([
        typeorm_1.Column('varchar', { length: 50 }),
        __metadata("design:type", String)
    ], User.prototype, "last_name", void 0);
    __decorate([
        typeorm_1.Column('varchar', { length: 50 }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column('boolean'),
        __metadata("design:type", Boolean)
    ], User.prototype, "isActive", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Group_entity_1.default; }, function (group) { return group.users; }),
        __metadata("design:type", Group_entity_1.default)
    ], User.prototype, "group", void 0);
    User = __decorate([
        typeorm_1.Entity()
    ], User);
    return User;
}());
exports.default = User;
//# sourceMappingURL=User.entity.js.map