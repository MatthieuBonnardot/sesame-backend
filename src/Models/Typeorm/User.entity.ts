import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Group from './Group.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public uid?: number;

  @Column('varchar', { length: 36 })
  public aid: string;

  @Column('int')
  public gid: number;

  @Column('varchar', { length: 25 })
  public registration_key: string;

  @Column('int')
  public door_key: number;

  @Column('varchar', { length: 50 })
  public first_name: string;

  @Column('varchar', { length: 50 })
  public last_name: string;

  @Column('varchar', { length: 50 })
  public email: string;

  @Column('boolean')
  public isActive: boolean;

  @ManyToOne(() => Group, (group: Group) => group.users)
  public group: Group;
}

export default User;
