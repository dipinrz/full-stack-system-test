// incident_type.model.ts
import { DataTypes, Model } from 'sequelize';
import {sequelizeInstance}  from '../../config/sequelize.config';

export class IncidentType extends Model {}
IncidentType.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  type: { type: DataTypes.STRING, allowNull: false },
}, { sequelize: sequelizeInstance, modelName: 'IncidentType', tableName: 'incident_types' });
