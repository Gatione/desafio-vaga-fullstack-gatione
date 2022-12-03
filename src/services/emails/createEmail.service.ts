import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { Email } from "../../entities/email.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

export const createEmailService = async (
  email: string,
  userId: string,
  contactId: string
) => {
  const emailRepository = AppDataSource.getRepository(Email);
  const userRepository = AppDataSource.getRepository(User);
  const contactRepository = AppDataSource.getRepository(Contact);

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (contactId) {
    const contact = await contactRepository.findOne({
      where: { id: contactId, user: { id: user.id } },
    });

    if (!contact) {
      throw new AppError("Contact not found", 404);
    }

    const newEmail = emailRepository.create({
      email,
      contact,
    });
  }
};
