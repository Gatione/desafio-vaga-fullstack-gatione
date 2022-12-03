import AppDataSource from "../../data-source";
import { Email } from "../../entities/email.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

export const deleteEmailService = async (
  id: string,
  userId: string,
  isAdm: boolean
) => {
  const emailRepository = AppDataSource.getRepository(Email);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const email = await emailRepository.findOne({
    where: { id },
    relations: { user: true, contact: { user: true } },
  });

  if (!email) {
    throw new AppError("Email not found", 404);
  }

  if (email.user.id !== userId && email.contact.user.id !== userId && !isAdm) {
    throw new AppError("Unauthorized");
  }

  await emailRepository.delete(email.id)
};
