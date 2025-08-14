import { Sequelize } from 'sequelize';

export const sequelizeInstance = new Sequelize('postgresql://postgres.dilzqtokckgaedjdroyq:reizend@123@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres' as string, {
  dialect: 'postgres',
  logging: false,
  sync:{alter: true},
  
});
