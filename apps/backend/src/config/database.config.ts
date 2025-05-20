import { registerAs } from '@nestjs/config';
import { UserMessage } from '../user-messages/entities/user-message.entity';

export default registerAs('database', () => ({
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '3306', 10),
  username: process.env.DATABASE_USERNAME || 'app',
  password: process.env.DATABASE_PASSWORD || 'app',
  database: process.env.DATABASE_NAME || 'app',
  entities: [UserMessage],
  synchronize: false, // Disable automatic synchronization (we'll use migrations)
  migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
  migrationsRun: true, // Run migrations automatically on startup
  logging: process.env.NODE_ENV !== 'production',
})); 