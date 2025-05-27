import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CameraModule } from './camera/camera.module';
import { PpeModule } from './ppe/ppe.module';
import { IncidentModule } from './incident/incident.module';
import { NotificationModule } from './notification/notification.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'), // Use your actual env variable name
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    UserModule, 
    CameraModule, 
    PpeModule, 
    IncidentModule, 
    NotificationModule, 
    AuthModule, 
    PrismaModule, 
    ConfigModule.forRoot(
      {
        isGlobal: true, 
        envFilePath: '/Users/akanserikaiyrbai/SafeEyesWeb/server/.env'
      }
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
