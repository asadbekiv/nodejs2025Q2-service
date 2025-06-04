import 'dotenv/config'
import { DataSource } from 'typeorm';
import * as process from 'node:process';




export const databaseProviders = [
  {
    provide: DataSource, // add the datasource as a provider
    inject: [],
    useFactory: async () => {
      // using the factory function to create the datasource instance
      try {
        const dataSource = new DataSource({
          type: 'postgres',
          host: process.env.DATABASE_HOST,
          port: Number(process.env.DATABASE_PORT),
          username: process.env.DATABASE_USERNAME,
          password: `${process.env.DATABASE_PASSWORD}`,
          database: process.env.DATABASE_NAME,
          synchronize: true,
          entities: [`${__dirname}/../**/**.entity{.ts,.js}`], // this will automatically load all entity file in the src folder
        });
        await dataSource.initialize(); // initialize the data source
        console.log('Database connected successfully');
        return dataSource;
      } catch (error) {
        console.log(`Error connecting to database`,error);
        throw error;
      }
    },
  },
];