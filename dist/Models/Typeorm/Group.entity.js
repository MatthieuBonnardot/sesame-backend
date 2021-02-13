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
var User_entity_1 = __importDefault(require("./User.entity"));
var Door_entity_1 = __importDefault(require("./Door.entity"));
var Group = (function () {
    function Group() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Group.prototype, "gid", void 0);
    __decorate([
        typeorm_1.Column('varchar', { length: 50 }),
        __metadata("design:type", String)
    ], Group.prototype, "groupName", void 0);
    __decorate([
        typeorm_1.Column('varchar', { length: 500 }),
        __metadata("design:type", String)
    ], Group.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column('int'),
        __metadata("design:type", Number)
    ], Group.prototype, "accessFromHour", void 0);
    __decorate([
        typeorm_1.Column('int'),
        __metadata("design:type", Number)
    ], Group.prototype, "accessToHour", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return User_entity_1.default; }, function (user) { return user.group; }, {
            onDelete: 'CASCADE',
        }),
        __metadata("design:type", Array)
    ], Group.prototype, "users", void 0);
    __decorate([
        typeorm_1.ManyToMany(function () { return Door_entity_1.default; }, function (door) { return door.groups; }, {
            cascade: true,
        }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], Group.prototype, "doors", void 0);
    Group = __decorate([
        typeorm_1.Entity()
    ], Group);
    return Group;
}());
exports.default = Group;
//# sourceMappingURL=Group.entity.js.map