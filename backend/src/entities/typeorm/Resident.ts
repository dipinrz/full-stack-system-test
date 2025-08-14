// Resident.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { CareHome } from './CareHome';
import { Incident } from './Incident';

@Entity()
export class Resident {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @ManyToOne(() => CareHome, (careHome) => careHome.residents, { onDelete: 'CASCADE' })
  careHome: CareHome;

  @OneToMany(() => Incident, (incident) => incident.resident)
  incidents: Incident[];
}
