import AppDataSource from "../../data-source";
import { Email } from "../../entities/email.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

export const updateEmailService = async (
  id: string,
  email: string,
  userId: string,
  isAdm: boolean
): Promise<Email> => {
  const emailRepository = AppDataSource.getRepository(Email);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const emailDatabase = await emailRepository.findOne({
    where: { id },
    relations: { user: true, contact: { user: true } },
  });

  if (!emailDatabase) {
    throw new AppError("Email not found", 404);
  }

  if (
    emailDatabase.user.id !== userId &&
    emailDatabase.contact.user.id !== userId &&
    !isAdm
  ) {
    throw new AppError("Unauthorized");
  }

  await emailRepository.update(emailDatabase.id, {
    email,
  });

  const newEmail = await emailRepository.findOneBy({ id });

  return newEmail!;
};
