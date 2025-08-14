// Incident.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Resident } from './Resident';
import { IncidentType } from './IncidentType';

@Entity()
export class Incident {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Resident, (resident) => resident.incidents, { onDelete: 'CASCADE' })
  resident: Resident;

  @ManyToOne(() => IncidentType, (incidentType) => incidentType.incidents)
  incidentType: IncidentType;

  @Column()
  timestamp: string;

  @Column()
  description: string;
}
