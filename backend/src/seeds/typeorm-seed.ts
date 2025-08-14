import 'reflect-metadata';
import { typeOrmDataSource } from '../config/typeorm.config';
import { CareHome } from '../entities/typeorm/CareHome';
import { Resident } from '../entities/typeorm/Resident';
import { IncidentType } from '../entities/typeorm/IncidentType';
import { Incident } from '../entities/typeorm/Incident';

const seedData = {
  careHomes: [
    { name: 'Sunset Manor Care Home' },
    { name: 'Greenfield Residential Care' },
    { name: 'Oakwood Senior Living' },
    { name: 'Maple Grove Care Center' },
    { name: 'Riverside Elder Care' },
  ],

  incidentTypes: [
    { type: 'Fall' },
    { type: 'Medical Emergency' },
    { type: 'Medication Error' },
    { type: 'Behavioral Incident' },
    { type: 'Equipment Malfunction' },
    { type: 'Visitor Complaint' },
    { type: 'Staff Incident' },
    { type: 'Environmental Hazard' },
  ],

  residents: [
    { name: 'Margaret Thompson', age: 78 },
    { name: 'Robert Johnson', age: 82 },
    { name: 'Dorothy Wilson', age: 75 },
    { name: 'James Davis', age: 80 },
    { name: 'Mary Miller', age: 77 },
    { name: 'William Brown', age: 84 },
    { name: 'Helen Garcia', age: 73 },
    { name: 'Charles Martinez', age: 79 },
    { name: 'Patricia Rodriguez', age: 76 },
    { name: 'Richard Lewis', age: 81 },
    { name: 'Linda Anderson', age: 72 },
    { name: 'Michael Taylor', age: 85 },
  ],

  incidents: [
    {
      timestamp: '2024-01-15T10:30:00Z',
      description: 'Resident slipped in bathroom while getting ready for breakfast. No injuries reported, but incident logged for monitoring.',
    },
    {
      timestamp: '2024-01-16T14:45:00Z',
      description: 'Resident experienced chest pain during afternoon activities. Paramedics called and resident taken to hospital.',
    },
    {
      timestamp: '2024-01-17T08:15:00Z',
      description: 'Wrong medication dosage administered during morning rounds. Error caught and corrected immediately.',
    },
    {
      timestamp: '2024-01-18T16:20:00Z',
      description: 'Resident became agitated and refused to eat during dinner time. Staff de-escalated situation successfully.',
    },
    {
      timestamp: '2024-01-19T11:00:00Z',
      description: 'Minor fall while walking to dining room. Resident helped up by staff, no injuries sustained.',
    },
    {
      timestamp: '2024-01-20T13:30:00Z',
      description: 'Wheelchair malfunction - brake not working properly. Maintenance called for immediate repair.',
    },
    {
      timestamp: '2024-01-21T15:45:00Z',
      description: 'Family member complained about room cleanliness during visiting hours. Issue addressed immediately.',
    },
    {
      timestamp: '2024-01-22T09:10:00Z',
      description: 'Resident had allergic reaction to new prescribed medication. Doctor consulted and medication changed.',
    },
    {
      timestamp: '2024-01-23T12:00:00Z',
      description: 'Staff member injured back while lifting resident. Worker compensation claim filed.',
    },
    {
      timestamp: '2024-01-24T07:30:00Z',
      description: 'Water leak in resident room created slip hazard. Maintenance team responded within 30 minutes.',
    },
  ],
};

async function seedTypeORMDatabase() {
  try {
    console.log('🌱 Starting TypeORM database seeding...');

    // Initialize the data source
    if (!typeOrmDataSource.isInitialized) {
      await typeOrmDataSource.initialize();
    }
    console.log('✅ TypeORM DataSource connected successfully');

    // Get repositories
    const careHomeRepository = typeOrmDataSource.getRepository(CareHome);
    const residentRepository = typeOrmDataSource.getRepository(Resident);
    const incidentTypeRepository = typeOrmDataSource.getRepository(IncidentType);
    const incidentRepository = typeOrmDataSource.getRepository(Incident);

    // Clear existing data (optional - remove if you want to append to existing data)
    console.log('🧹 Clearing existing data...');
    
    // Clear tables using query builder to avoid empty criteria error
    await typeOrmDataSource.query('DELETE FROM incident');
    await typeOrmDataSource.query('DELETE FROM resident');
    await typeOrmDataSource.query('DELETE FROM incident_type');
    await typeOrmDataSource.query('DELETE FROM care_home');
    
    // Reset sequences if using PostgreSQL
    await typeOrmDataSource.query('ALTER SEQUENCE IF EXISTS incident_id_seq RESTART WITH 1');
    await typeOrmDataSource.query('ALTER SEQUENCE IF EXISTS resident_id_seq RESTART WITH 1');
    await typeOrmDataSource.query('ALTER SEQUENCE IF EXISTS incident_type_id_seq RESTART WITH 1');
    await typeOrmDataSource.query('ALTER SEQUENCE IF EXISTS care_home_id_seq RESTART WITH 1');
    
    console.log('✅ Existing data cleared');

    // Seed CareHomes
    console.log('📍 Seeding Care Homes...');
    const careHomes = careHomeRepository.create(seedData.careHomes);
    const savedCareHomes = await careHomeRepository.save(careHomes);
    console.log(`✅ Created ${savedCareHomes.length} care homes`);

    // Seed IncidentTypes
    console.log('📋 Seeding Incident Types...');
    const incidentTypes = incidentTypeRepository.create(seedData.incidentTypes);
    const savedIncidentTypes = await incidentTypeRepository.save(incidentTypes);
    console.log(`✅ Created ${savedIncidentTypes.length} incident types`);

    // Seed Residents with CareHome relationships
    console.log('👥 Seeding Residents...');
    const residentsWithCareHomes = seedData.residents.map((residentData, index) => {
      const resident = residentRepository.create(residentData);
      // Distribute residents across care homes
      resident.careHome = savedCareHomes[index % savedCareHomes.length];
      return resident;
    });
    const savedResidents = await residentRepository.save(residentsWithCareHomes);
    console.log(`✅ Created ${savedResidents.length} residents`);

    // Seed Incidents with Resident and IncidentType relationships
    console.log('📝 Seeding Incidents...');
    const incidentsWithRelationships = seedData.incidents.map((incidentData, index) => {
      const incident = incidentRepository.create(incidentData);
      // Assign incidents to residents (cycling through available residents)
      incident.resident = savedResidents[index % savedResidents.length];
      // Assign incident types (cycling through available types)
      incident.incidentType = savedIncidentTypes[index % savedIncidentTypes.length];
      return incident;
    });
    const savedIncidents = await incidentRepository.save(incidentsWithRelationships);
    console.log(`✅ Created ${savedIncidents.length} incidents`);

    console.log('🎉 TypeORM database seeding completed successfully!');

    // Display summary
    console.log('\n📊 Seeding Summary:');
    console.log(`- Care Homes: ${savedCareHomes.length}`);
    console.log(`- Incident Types: ${savedIncidentTypes.length}`);
    console.log(`- Residents: ${savedResidents.length}`);
    console.log(`- Incidents: ${savedIncidents.length}`);

    // Show some sample data with relationships
    console.log('\n🔍 Sample Data Preview:');
    const sampleResident = await residentRepository.findOne({
      where: { id: savedResidents[0].id },
      relations: ['careHome', 'incidents', 'incidents.incidentType'],
    });
    
    if (sampleResident) {
      console.log(`👤 Sample Resident: ${sampleResident.name}, Age: ${sampleResident.age}`);
      console.log(`🏠 Care Home: ${sampleResident.careHome.name}`);
      console.log(`📊 Incidents: ${sampleResident.incidents.length} recorded`);
    }

  } catch (error) {
    console.error('❌ Error seeding TypeORM database:', error);
    process.exit(1);
  } finally {
    if (typeOrmDataSource.isInitialized) {
      await typeOrmDataSource.destroy();
      console.log('🔒 TypeORM DataSource connection closed');
    }
    process.exit(0);
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedTypeORMDatabase();
}

export { seedTypeORMDatabase, seedData };