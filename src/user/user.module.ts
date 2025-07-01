import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LogsModule } from '../logs/logs.module';
import { Role } from 'src/roles/entity/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role]), LogsModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
