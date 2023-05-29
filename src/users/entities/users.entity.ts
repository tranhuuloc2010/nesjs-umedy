import {
  Column, CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import { Role } from "../../enum/role.enum";

@Entity()
export class User {
  @PrimaryGeneratedColumn({ unsigned: true })
  id?: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: Role.User })
  role: string;

  @Column({ select: false })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
