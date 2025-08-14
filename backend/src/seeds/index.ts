import { sequelizeInstance } from '../config/sequelize.config';
import { CareHome } from '../entities/sequalize/carehome.model';
import { Resident } from '../entities/sequalize/resident.model';
import { IncidentType } from '../entities/sequalize/incident_type.model';
import { Incident } from '../entities/sequalize/incident.model';

const seedData = {
  careHomes: [
    { name: 'Sunset Manor Care Home' },
    { name: 'Greenfield Residential Care' },
    { name: 'Oakwood Senior Living' },
    { name: 'Maple Grove Care Center' },
  ],

  incidentTypes: [
    { type: 'Fall' },
    { type: 'Medical Emergency' },
    { type: 'Medication Error' },
    { type: 'Behavioral Incident' },
    { type: 'Equipment Malfunction' },
    { type: 'Visitor Complaint' },
    { type: 'Staff Incident' },
  ],

  residents: [
    { name: 'Margaret Thompson', age: 78, careHomeId: 1 },
    { name: 'Robert Johnson', age: 82, careHomeId: 1 },
    { name: 'Dorothy Wilson', age: 75, careHomeId: 1 },
    { name: 'James Davis', age: 80, careHomeId: 2 },
    { name: 'Mary Miller', age: 77, careHomeId: 2 },
    { name: 'William Brown', age: 84, careHomeId: 2 },
    { name: 'Helen Garcia', age: 73, careHomeId: 3 },
    { name: 'Charles Martinez', age: 79, careHomeId: 3 },
    { name: 'Patricia Rodriguez', age: 76, careHomeId: 4 },
    { name: 'Richard Lewis', age: 81, careHomeId: 4 },
  ],

  incidents: [
    {
      residentId: 1,
      incidentTypeId: 1,
      timestamp: '2024-01-15T10:30:00Z',
      description: 'Resident slipped in bathroom, no injuries reported',
    },
    {
      residentId: 2,
      incidentTypeId: 2,
      timestamp: '2024-01-16T14:45:00Z',
      description: 'Resident experienced chest pain, paramedics called',
    },
    {
      residentId: 3,
      incidentTypeId: 3,
      timestamp: '2024-01-17T08:15:00Z',
      description: 'Wrong medication dosage administered, corrected immediately',
    },
    {
      residentId: 4,
      incidentTypeId: 4,
      timestamp: '2024-01-18T16:20:00Z',
      description: 'Resident became agitated during meal time',
    },
    {
      residentId: 5,
      incidentTypeId: 1,
      timestamp: '2024-01-19T11:00:00Z',
      description: 'Minor fall while walking to dining room',
    },
    {
      residentId: 6,
      incidentTypeId: 5,
      timestamp: '2024-01-20T13:30:00Z',
      description: 'Wheelchair malfunction - brake not working properly',
    },
    {
      residentId: 7,
      incidentTypeId: 6,
      timestamp: '2024-01-21T15:45:00Z',
      description: 'Family member complained about room cleanliness',
    },
    {
      residentId: 8,
      incidentTypeId: 2,
      timestamp: '2024-01-22T09:10:00Z',
      description: 'Resident had allergic reaction to new medication',
    },
  ],
};

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Sync database - this will create tables if they don't exist
    await sequelizeInstance.sync({ force: true }); // Use force: true to drop and recreate tables
    console.log('✅ Database synced successfully');

    // Seed CareHomes
    console.log('📍 Seeding Care Homes...');
    const createdCareHomes = await CareHome.bulkCreate(seedData.careHomes, {
      returning: true,
    });
    console.log(`✅ Created ${createdCareHomes.length} care homes`);

    // Seed IncidentTypes
    console.log('📋 Seeding Incident Types...');
    const createdIncidentTypes = await IncidentType.bulkCreate(seedData.incidentTypes, {
      returning: true,
    });
    console.log(`✅ Created ${createdIncidentTypes.length} incident types`);

    // Seed Residents
    console.log('👥 Seeding Residents...');
    const createdResidents = await Resident.bulkCreate(seedData.residents, {
      returning: true,
    });
    console.log(`✅ Created ${createdResidents.length} residents`);

    // Seed Incidents
    console.log('📝 Seeding Incidents...');
    const createdIncidents = await Incident.bulkCreate(seedData.incidents, {
      returning: true,
    });
    console.log(`✅ Created ${createdIncidents.length} incidents`);

    console.log('🎉 Database seeding completed successfully!');

    // Display summary
    console.log('\n📊 Seeding Summary:');
    console.log(`- Care Homes: ${createdCareHomes.length}`);
    console.log(`- Incident Types: ${createdIncidentTypes.length}`);
    console.log(`- Residents: ${createdResidents.length}`);
    console.log(`- Incidents: ${createdIncidents.length}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await sequelizeInstance.close();
    console.log('🔒 Database connection closed');
    process.exit(0);
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

export { seedDatabase, seedData };