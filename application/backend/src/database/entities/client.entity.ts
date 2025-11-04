import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import * as entityTypes from '../../common/types/entity-types';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  salary!: number;

  @Column('decimal', { precision: 15, scale: 2, name: 'company_value' })
  companyValue!: number;

  @ManyToOne(
    'User',
    (
      user: entityTypes.Relation<
        entityTypes.UserEntity & { clients: Client[] }
      >,
    ) => user.clients,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'user_id' })
  user!: entityTypes.Relation<entityTypes.UserEntity>;

  @Column({ name: 'user_id' })
  userId!: number;
}
