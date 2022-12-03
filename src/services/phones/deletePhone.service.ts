import AppDataSource from "../../data-source";
import { Phone } from "../../entities/phone.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

export const deletePhoneService = async (
  id: string,
  userId: string,
  isAdm: boolean
) => {
  const phoneRepository = AppDataSource.getRepository(Phone);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const phone = await phoneRepository.findOne({
    where: { id },
    relations: { user: true, contact: { user: true } },
  });

  if (!phone) {
    throw new AppError("Phone not found", 404);
  }

  if (phone.user.id !== userId && phone.contact.user.id !== userId && !isAdm) {
    throw new AppError("Unauthorized");
  }

  await phoneRepository.delete(phone.id);
};
