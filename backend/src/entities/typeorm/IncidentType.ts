// IncidentType.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Incident } from './Incident';

@Entity()
export class IncidentType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @OneToMany(() => Incident, (incident) => incident.incidentType)
  incidents: Incident[];
}
