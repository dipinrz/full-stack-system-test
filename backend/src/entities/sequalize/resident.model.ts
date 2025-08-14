// resident.model.ts
import { DataTypes, Model } from 'sequelize';
import {sequelizeInstance} from '../../config/sequelize.config';
import { CareHome } from './carehome.model';

export class Resident extends Model {}
Resident.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER, allowNull: false },
}, { sequelize: sequelizeInstance, modelName: 'Resident', tableName: 'residents' });

Resident.belongsTo(CareHome, { foreignKey: 'careHomeId', as: 'careHome' });
CareHome.hasMany(Resident, { foreignKey: 'careHomeId', as: 'residents' });
