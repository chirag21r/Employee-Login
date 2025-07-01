import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSession } from './entity/user-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserSession])],
  exports: [],
})
export class SessionsModule {}
