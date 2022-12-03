import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

export const softDeleteUserService = async (
  id: string,
  userId: string,
  isAdm: boolean
) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { id } });

  if (userId !== id && isAdm === false) {
    throw new AppError("You are not allowed");
  }

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!user.isActive) {
    throw new AppError("Inactive user");
  }

  await userRepository.update(user.id, { isActive: false });
};
