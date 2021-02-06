import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  IsNotEmpty,
} from 'class-validator';
// eslint-disable-next-line import/no-cycle
import Group from './Group.entity';

@Entity()
class Door {
  @PrimaryGeneratedColumn()
  public did: number;

  @Column('varchar', { length: 50 })
  @IsNotEmpty()
  public doorName: string;

  @Column('varchar', { length: 50 })
  public endPoint: string;

  @Column('varchar', { length: 250, nullable: true })
  public doorUrl: string;

  @ManyToMany(() => Group, (group: Group) => group.doors)
  public groups: Group[];
}

export default Door;
