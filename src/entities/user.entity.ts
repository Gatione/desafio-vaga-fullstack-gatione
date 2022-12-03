import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
} from "typeorm";
import { Contact } from "./contact.entity";
import { Email } from "./email.entity";
import { Phone } from "./phone.entity";
import { Exclude } from "class-transformer";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  name: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isAdm: boolean;

  @OneToMany(() => Email, (email) => email.user, {
    eager: true,
  })
  emails: Email[];

  @OneToMany(() => Phone, (phone) => phone.user, {
    eager: true,
  })
  phones: Phone[];

  @OneToMany(() => Contact, (contact) => contact.user)
  contacts: Contact[];
}
