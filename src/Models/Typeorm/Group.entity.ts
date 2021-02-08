/* eslint-disable import/no-cycle */
import {
  Column,
  Entity,
  OneToMany,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './User.entity';
import Door from './Door.entity';

@Entity()
class Group {
  @PrimaryGeneratedColumn()
  public gid?: number;

  @Column('varchar', { length: 50 })
  public groupName: string;

  @Column('varchar', { length: 500 })
  public description: string;

  @Column('int')
  public accessFromHour: number;

  @Column('int')
  public accessToHour: number;

  // @Column()
  // public group_image: string;

  @OneToMany(() => User, (user: User) => user.group, {
    onDelete: 'CASCADE',
  })
  public users: User[];

  @ManyToMany(() => Door, (door: Door) => door.groups, {
    cascade: true,
  })
  @JoinTable()
  public doors: Door[];
}

export default Group;
