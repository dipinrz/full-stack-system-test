import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import { typeOrmDataSource } from './config/typeorm.config';
import { sequelizeInstance } from './config/sequelize.config';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express + TypeScript!");
});
app.get("/api/users", (req: Request, res: Response) => {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com" },
  ];
  res.json(users);
});

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
