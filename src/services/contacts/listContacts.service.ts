import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

export const listContactsService = async (
  userId: string
): Promise<Contact[]> => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: { id: userId },
    relations: { contacts: true },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const contacts = await contactRepository.find({
    where: { user: { id: user.id } },
  });

  return contacts;
};
