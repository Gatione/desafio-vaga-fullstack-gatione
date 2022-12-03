import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

export const updateUserService = async (
  id: string,
  userId: string,
  isAdm: boolean,
  username: string,
  name: string,
  password: string
): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  if (userId !== id && isAdm === false) {
    throw new AppError("You are not allowed");
  }

  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (username !== undefined && username !== user.username) {
    const usernameAlreadyExists = await userRepository.count({
      where: { username: username },
    });
    if (usernameAlreadyExists) {
      throw new AppError("Username already exists");
    }
  }

  await userRepository.update(user.id, {
    username,
    name,
    password: password ? await hash(password, 10) : user.password,
  });

  const updatedUser = await userRepository.findOneBy({ id: user.id });

  return updatedUser!;
};
