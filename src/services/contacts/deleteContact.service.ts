import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

export const deleteContactService = async (
  id: string,
  userId: string,
  isAdm: boolean
) => {
  const userRepository = AppDataSource.getRepository(User);
  const contactRepository = AppDataSource.getRepository(Contact);

  const user = await userRepository.findOne({ where: { id: userId } });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isUserContact = await contactRepository.count({
    where: { id, user: { id: user.id } },
  });

  if (!isUserContact && !isAdm) {
    throw new AppError("Contact not found", 404);
  }

  const contact = await contactRepository.findOne({
    where: { id },
  });

  if (!contact) {
    throw new AppError("Contact not found", 404);
  }

  await contactRepository.delete(contact.id);
};
