import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeProfile } from './entity/employee-profile.entity';
import { CreateEmployeeProfileDto } from './dto/create-profile.dto';
import { UpdateEmployeeProfileDto } from './dto/update-profile.dto'\

@Injectable()
export class EmployeeProfileService {
  constructor(
    @InjectRepository(EmployeeProfile)
    private profileRepo: Repository<EmployeeProfile>,
  ) {}

  create(data: CreateEmployeeProfileDto) {
    const profile = this.profileRepo.create(data);
    return this.profileRepo.save(profile);
  }

  findAll() {
    return this.profileRepo.find({ relations: ['user'] });
  }

  findOne(id: string) {
    return this.profileRepo.findOne({ where: { id }, relations: ['user'] });
  }

  async update(id: string, dto: UpdateEmployeeProfileDto) {
    const profile = await this.findOne(id);
    if (!profile) throw new NotFoundException('Profile not found');

    Object.assign(profile, dto);
    return this.profileRepo.save(profile);
  }

  async remove(id: string) {
    const profile = await this.findOne(id);
    if (!profile) throw new NotFoundException('Profile not found');

    return this.profileRepo.softRemove(profile);
  }
}
