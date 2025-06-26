import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  OneToOne, ManyToOne, ManyToMany, JoinTable, JoinColumn
} from 'typeorm';
import { EmployeeProfile } from '../../employee-profile/entity/employee-profile.entity';
import { Role } from '../../roles/entity/role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ nullable: true })
  displayName!: string;

  @Column({ nullable: true })
  jobTitle!: string;

  @Column()
  department!: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'manager_id' })
  manager?: User;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @OneToOne(() => EmployeeProfile, (profile) => profile.user)
  profile!: EmployeeProfile;

  @ManyToMany(() => Role)
  @JoinTable({ name: 'user_roles' })
  roles!: Role[];
}
