import { DataSource } from "typeorm";
import { CareHome } from "../entities/typeorm/CareHome";
import { Incident } from "../entities/typeorm/Incident";
import { Resident } from "../entities/typeorm/Resident";
import { IncidentType } from "../entities/typeorm/IncidentType";
import { jwtDecoder } from "../utils/jst-decode";

import dotenv from "dotenv";
dotenv.config();
// import { User } from '../entities/User';

const URL = jwtDecoder(process.env.DB_TOKEN as string);

export const typeOrmDataSource = new DataSource({
  type: "postgres",
  url: URL,
  entities: [CareHome, Incident, Resident, IncidentType],
  synchronize: true,
  logging: false,
  extra: {
    ssl: { rejectUnauthorized: false },
  },
});
