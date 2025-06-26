import { DataSource } from 'typeorm';
import { Role } from './entity/role.entity';
import { UserRole } from '../common/constants/roles.enum';

export const seedRoles = async (dataSource: DataSource) => {
  const repo = dataSource.getRepository(Role);

  for (const roleName of Object.values(UserRole)) {
    const exists = await repo.findOne({ where: { name: roleName } });
    if (!exists) {
      const role = repo.create({ name: roleName });
      await repo.save(role);
      console.log(`Role "${roleName}" created`);
    }
  }
};
