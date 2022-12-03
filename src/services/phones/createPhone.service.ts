import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { Phone } from "../../entities/phone.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

export const createPhoneService = async (
  phone: string,
  userId: string,
  contactId: string
) => {
  const phoneRepository = AppDataSource.getRepository(Phone);
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

    const newPhone = phoneRepository.create({
      phone,
      contact,
    });
    await phoneRepository.save(newPhone);

    const phoneResponse = await phoneRepository.findOneBy({ id: newPhone.id });

    return phoneResponse;
  }

  const newPhone = phoneRepository.create({
    phone,
    user,
  });
  await phoneRepository.save(newPhone);

  const phoneResponse = await phoneRepository.findOneBy({ id: newPhone.id });

  return phoneResponse;
};
