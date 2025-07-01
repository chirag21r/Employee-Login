import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity('employee_profiles')
export class EmployeeProfile {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn()
  user!: User;

  @Column({ unique: true })
  employeeId!: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  mobile?: string;

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth?: Date;

  @Column({ type: 'date', nullable: true })
  hireDate?: Date;

  @Column({ nullable: true })
  employmentStatus?: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  salary?: number;

  @Column({ nullable: true })
  emergencyContactName?: string;

  @Column({ nullable: true })
  emergencyContactPhone?: string;

  @Column({ type: 'jsonb', nullable: true })
  skills?: object;

  @Column({ type: 'jsonb', nullable: true })
  certifications?: object;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  // ✅ Added this for soft delete support
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
