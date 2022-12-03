import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

export const updateContactService = async (
  id: string,
  name: string,
  userId: string,
  isAdm: boolean
): Promise<Contact> => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const userRepository = AppDataSource.getRepository(User);

  const contact = await contactRepository.findOne({
    where: { id },
    relations: { user: true },
  });

  if (!contact) {
    throw new AppError("Contact not found", 404);
  }

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (contact.user.id !== user.id && !isAdm) {
    throw new AppError("Unauthorized");
  }

  if (name !== contact.name) {
    const nameAlreadyExists = await contactRepository.findOne({
      where: {
        name,
        user: {
          id: contact.user.id,
        },
      },
    });

    if (nameAlreadyExists) {
      throw new AppError("There is another contact with this name");
    }
  }

  await contactRepository.update(contact.id, { name });

  const updatedContact = await contactRepository.findOneBy({ id });

  return updatedContact!;
};
