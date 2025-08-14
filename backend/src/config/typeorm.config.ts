import { DataSource } from "typeorm";
import { CareHome } from "../entities/typeorm/CareHome";
import { Incident } from "../entities/typeorm/Incident";
import { Resident } from "../entities/typeorm/Resident";
import { IncidentType } from "../entities/typeorm/IncidentType";
// import { User } from '../entities/User';
export const typeOrmDataSource = new DataSource({
  type: "postgres",
  url: "postgresql://postgres.dilzqtokckgaedjdroyq:reizend@123@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres",
  entities: [CareHome, Incident, Resident, IncidentType],
  synchronize: true,
  logging: false,
  extra: {
    ssl: { rejectUnauthorized: false },
  },
});
