import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  @Column({ select: false, nullable: true })
  password: string;
}
