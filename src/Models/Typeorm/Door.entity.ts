import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Group from './Group.entity';

@Entity()
class Door {
  @PrimaryGeneratedColumn()
  public did: number;

  @Column('varchar', { length: 50 })
  public doorName: string;

  @Column('varchar', { length: 50 })
  public endpoint: string;

  @Column('varchar', { length: 50 })
  public doorUrl: string;

  @ManyToMany(() => Group, (group: Group) => group.doors)
  public groups: Group[];
}

export default Door;
