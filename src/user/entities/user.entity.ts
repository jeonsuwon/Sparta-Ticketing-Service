import { Column, Entity, Index, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsString } from 'class-validator';
//createDateColumn,updateDateColumn,deleteDateColumn


import { Role } from '../types/userRole.type';
import { Show } from 'src/show/entities/show.entity';

@Index('email', ['email'], { unique: true })
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  phoneNumber: string;

  @Column({ type: 'varchar', nullable: false })
  address: string;

  @Column({ type: 'integer', default: 1000000 })
  point: number;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;
}