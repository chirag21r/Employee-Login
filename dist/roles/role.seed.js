"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRoles = void 0;
const role_entity_1 = require("./entity/role.entity");
const roles_enum_1 = require("../common/constants/roles.enum");
const seedRoles = async (dataSource) => {
    const repo = dataSource.getRepository(role_entity_1.Role);
    for (const roleName of Object.values(roles_enum_1.UserRole)) {
        const exists = await repo.findOne({ where: { name: roleName } });
        if (!exists) {
            const role = repo.create({ name: roleName });
            await repo.save(role);
            console.log(`Role "${roleName}" created`);
        }
    }
};
exports.seedRoles = seedRoles;
//# sourceMappingURL=role.seed.js.map