import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { Email } from "../../entities/email.entity";
import { Phone } from "../../entities/phone.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IContactRequest } from "../../interfaces/contacts.interfaces";

export const createContactService = async ({
  name,
  emails,
  phones,
  userId,
}: IContactRequest): Promise<Contact> => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const userRepository = AppDataSource.getRepository(User);
  const emailRepository = AppDataSource.getRepository(Email);
  const phoneRepository = AppDataSource.getRepository(Phone);

  const contacts = await contactRepository.find();
  const user = await userRepository.findOne({ where: { id: userId } });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const nameInUse = await contactRepository.count({
    where: { name, user: { id: user.id } },
  });

  if (nameInUse) {
    throw new AppError("Contact name already in use");
  }

  const contact = contactRepository.create({
    name,
    user,
  });
  await contactRepository.save(contact);

  emails.forEach(async email => {
    await emailRepository.save({ email, contact });
  });

  // emails.map(async (email) => {
  //   await emailRepository.save({ email, contact });
  // });

  phones.map(async (phone) => {
    await phoneRepository.save({ phone, contact });
  });

  const newContact = await contactRepository.findOne({
    where: { id: contact.id },
  });

  return newContact!;
};
