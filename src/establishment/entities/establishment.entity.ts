import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Establishment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ nullable: true })
  cover: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column('jsonb', { nullable: true })
  addressInfo: {
    city: string;
    country: string;
    ut: string;
    cep: string;
    number: number;
  };

  @Column('jsonb', { nullable: true })
  geoInfo: {
    type: string;
    coordinates: number[];
  };
}
