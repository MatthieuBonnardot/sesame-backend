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
  public group_name: string;

  @Column('varchar', { length: 500 })
  public description: string;

  @Column('int')
  public access_from_hour: number;

  @Column('int')
  public access_to_hour: number;

  // @Column()
  // public group_image: blob;

  @OneToMany(() => User, (user: User) => user.group)
  public users: User[];

  @ManyToMany(() => Door, (door: Door) => door.users)
  @JoinTable()
  public doors: Door[];
}

export default Group;
