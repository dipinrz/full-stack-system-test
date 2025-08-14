import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Resident } from './Resident';

@Entity()
export class CareHome {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Resident, (resident) => resident.careHome)
  residents: Resident[];
}
