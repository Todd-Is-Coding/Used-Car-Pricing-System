import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  password!: string;

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
