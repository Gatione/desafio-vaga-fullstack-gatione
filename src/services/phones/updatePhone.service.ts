import AppDataSource from "../../data-source";
import { Phone } from "../../entities/phone.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

export const updatePhoneService = async (
  id: string,
  phone: string,
  userId: string,
  isAdm: boolean
): Promise<Phone> => {
  const phoneRepository = AppDataSource.getRepository(Phone);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const phoneDatabase = await phoneRepository.findOne({
    where: { id },
    relations: { user: true, contact: { user: true } },
  });

  if (!phoneDatabase) {
    throw new AppError("Phone not found", 404);
  }

  if (
    phoneDatabase.user.id !== userId &&
    phoneDatabase.contact.user.id !== userId &&
    !isAdm
  ) {
    throw new AppError("Unauthorized");
  }

  await phoneRepository.update(phoneDatabase.id, {
    phone,
  });

  const newPhone = await phoneRepository.findOneBy({ id });

  return newPhone!;
};
