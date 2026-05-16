import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { Report } from '../reports/reports.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({ default: true })
  admin!: boolean;
  @OneToMany(() => Report, (report) => report.user)
  reports!: Report[];

  @AfterInsert()
  logInsert() {
    console.log(`a user is insterted with id ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`a user is updated with id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`a user is deleted with id ${this.id}`);
  }
}
