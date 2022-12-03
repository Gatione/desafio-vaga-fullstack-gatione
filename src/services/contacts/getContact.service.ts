import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

export const getContactService = async (
  id: string,
  userId: string
): Promise<Contact> => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const contact = await contactRepository.findOne({
    where: { id },
    // relations: { user: true },
  });

  if (!contact) {
    throw new AppError("Contact not found", 404);
  }

//   if (contact.user !== user && !isAdm) {
//     throw new AppError("Unauthorized");
//   }

  return contact
};
