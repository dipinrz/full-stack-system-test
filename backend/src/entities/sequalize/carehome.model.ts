// carehome.model.ts
import { DataTypes, Model } from 'sequelize';
import {sequelizeInstance} from '../../config/sequelize.config';

export class CareHome extends Model {}
CareHome.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
}, { sequelize: sequelizeInstance, modelName: 'CareHome', tableName: 'carehomes' });
