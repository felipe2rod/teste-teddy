import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import * as entityTypes from '../../common/types/entity-types';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  login!: string;

  @Column()
  password!: string;

  @OneToMany(
    'Client',
    (client: entityTypes.Relation<entityTypes.ClientEntity & { user: User }>) =>
      client.user,
  )
  clients!: entityTypes.Relation<entityTypes.ClientEntity[]>;
}
