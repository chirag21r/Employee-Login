import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entity/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  exports: [],
})
export class RolesModule {}
