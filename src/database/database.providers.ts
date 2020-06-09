import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

export const databaseProviders = [
  SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      dialect: 'postgres',
      host: configService.get('DATABASE_HOST') || '127.0.0.1',
      port: Number(configService.get('DATABASE_PORT')) || 5432,
      username: configService.get('DATABASE_USERNAME') || 'postgres',
      password: configService.get('DATABASE_PASSWORD') || '',
      database: configService.get('DATABASE_NAME') || `heimdall-server-${ configService.get('NODE_ENV').toLowerCase() }`,
      autoLoadModels: true,
      synchronize: true,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }),
  })
]
