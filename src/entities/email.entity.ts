import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Contact } from "./contact.entity";
import { User } from "./user.entity";

@Entity("emails")
export class Email {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Contact, { onDelete: "CASCADE" })
  contact: Contact;
}
