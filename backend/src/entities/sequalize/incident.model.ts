// incident.model.ts
import { DataTypes, Model } from 'sequelize';
import {sequelizeInstance} from '../../config/sequelize.config';
import { Resident } from './resident.model';
import { IncidentType } from './incident_type.model';

export class Incident extends Model {}
Incident.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  timestamp: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
}, { sequelize: sequelizeInstance, modelName: 'Incident', tableName: 'incidents' });

Incident.belongsTo(Resident, { foreignKey: 'residentId', as: 'resident' });
Resident.hasMany(Incident, { foreignKey: 'residentId', as: 'incidents' });

Incident.belongsTo(IncidentType, { foreignKey: 'incidentTypeId', as: 'incidentType' });
IncidentType.hasMany(Incident, { foreignKey: 'incidentTypeId', as: 'incidents' });
