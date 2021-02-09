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
var class_validator_1 = require("class-validator");
var Group_entity_1 = __importDefault(require("./Group.entity"));
var User = (function () {
    function User() {
    }
    __decorate([
        typeorm_1.PrimaryColumn('varchar', { length: 36 }),
        __metadata("design:type", String)
    ], User.prototype, "aid", void 0);
    __decorate([
        typeorm_1.Column('varchar', { length: 25, nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "registrationKey", void 0);
    __decorate([
        typeorm_1.Column('int', { nullable: true }),
        __metadata("design:type", Number)
    ], User.prototype, "doorKey", void 0);
    __decorate([
        typeorm_1.Column('varchar', { length: 50 }),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], User.prototype, "firstName", void 0);
    __decorate([
        typeorm_1.Column('varchar', { length: 50 }),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], User.prototype, "lastName", void 0);
    __decorate([
        typeorm_1.Column('varchar', { length: 50, unique: true }),
        class_validator_1.IsEmail(),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column('boolean', {
            nullable: true,
            default: false,
        }),
        __metadata("design:type", Boolean)
    ], User.prototype, "isActive", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Group_entity_1.default; }, function (group) { return group.users; }, {
            onUpdate: 'CASCADE',
            cascade: true,
        }),
        __metadata("design:type", Group_entity_1.default)
    ], User.prototype, "group", void 0);
    User = __decorate([
        typeorm_1.Entity()
    ], User);
    return User;
}());
exports.default = User;
//# sourceMappingURL=User.entity.js.map