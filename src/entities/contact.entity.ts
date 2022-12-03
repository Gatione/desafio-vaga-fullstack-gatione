import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Email } from "./email.entity";
import { Phone } from "./phone.entity";
import { User } from "./user.entity";

@Entity("contacts")
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  user: User;

  @OneToMany(() => Email, (email) => email.contact, {
    eager: true,
  })
  emails: Email[];

  @OneToMany(() => Phone, (phone) => phone.contact, {
    eager: true,
  })
  phones: Phone[];
}
