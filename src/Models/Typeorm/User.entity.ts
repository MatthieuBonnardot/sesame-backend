/* eslint-disable import/no-cycle */
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
} from 'class-validator';
import Group from './Group.entity';

@Entity()
class User {
  @PrimaryColumn('varchar', { length: 36 })
  public aid: string;

  @Column('varchar', { length: 25, nullable: true })
  public registrationKey: string;

  @Column('int', { nullable: true })
  public doorKey: number;

  @Column('varchar', { length: 50 })
  @IsNotEmpty()
  public firstName: string;

  @Column('varchar', { length: 50 })
  @IsNotEmpty()
  public lastName: string;

  @Column('varchar', { length: 50, unique: true })
  @IsEmail()
  public email: string;

  @Column('boolean', {
    nullable: true,
    default: false,
  })
  public isActive: boolean;

  @ManyToOne(() => Group, (group: Group) => group.users, {
    onUpdate: 'CASCADE',
    cascade: true,
  })
  public group: Group;
}

export default User;
