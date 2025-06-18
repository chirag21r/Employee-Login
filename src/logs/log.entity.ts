import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export enum LogAction {
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
}

@Entity('employee_logs')
export class Log {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  employeeId!: string;

  @Column({ type: 'enum', enum: LogAction })
  action!: LogAction;

  @Column()
  ipAddress!: string;

  @Column()
  userAgent!: string;

  @CreateDateColumn()
  timestamp!: Date;
}
