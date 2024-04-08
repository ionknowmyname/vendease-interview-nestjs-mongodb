import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CharacterModule } from './api/character/character.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ENV } from './constants';
import { CharacterController } from './api/character/character.controller';

@Module({
  imports: [
    CharacterModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get(ENV.MONGO_URI),
      }),
    }),
  ],
  controllers: [CharacterController],
})
export class AppModule {}
