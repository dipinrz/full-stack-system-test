import { Sequelize } from 'sequelize';
import { jwtDecoder } from '../utils/jst-decode';

import dotenv from 'dotenv';
dotenv.config();
const URL = jwtDecoder(process.env.DB_TOKEN as string);

export const sequelizeInstance = new Sequelize(URL as string, {
  dialect: 'postgres',
  logging: false,
  sync:{alter: true},
  
});
