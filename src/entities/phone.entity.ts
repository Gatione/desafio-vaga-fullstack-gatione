import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Contact } from "./contact.entity";
import { User } from "./user.entity";

@Entity("phones")
export class Phone {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  phone: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Contact, { onDelete: "CASCADE" })
  contact: Contact;
}
