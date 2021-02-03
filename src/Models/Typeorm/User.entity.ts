import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import Group from './Group.entity';

@Entity()
class User {
  @PrimaryColumn('varchar', { length: 36 })
  public aid: string;

  @Column('int', { nullable: true })
  public gid: number;

  @Column('varchar', { length: 25, nullable: true })
  public registration_key: string;

  @Column('int', { nullable: true })
  public door_key: number;

  @Column('varchar', { length: 50 })
  public first_name: string;

  @Column('varchar', { length: 50 })
  public last_name: string;

  @Column('varchar', { length: 50, unique: true })
  public email: string;

  @Column('boolean')
  public isActive: boolean;

  @ManyToOne(() => Group, (group: Group) => group.users)
  public group: Group;
}

export default User;
