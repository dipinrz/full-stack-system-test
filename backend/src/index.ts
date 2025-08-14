import 'reflect-metadata';
import express from 'express';
import { typeOrmDataSource } from './config/typeorm.config';
import { sequelizeInstance } from './config/sequelize.config';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
async function start() {
  try {
    await typeOrmDataSource.initialize();
    console.log('✅ TypeORM connected to Supabase');

    await sequelizeInstance.authenticate();
    console.log('✅ Sequelize connected to Supabase');

    app.listen(3000, () => {
      console.log('🚀 Server running on port 3000');
    });
  } catch (error) {
    console.error('❌ Error starting app:', error);
  }
}

start();
