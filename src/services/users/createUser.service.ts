import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/users.interfaces";
import { hash } from "bcryptjs";
import { Email } from "../../entities/email.entity";
import { Phone } from "../../entities/phone.entity";
import { AppError } from "../../errors/AppError";

export const createUserService = async ({
  username,
  name,
  emails,
  phones,
  password,
}: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const emailRepository = AppDataSource.getRepository(Email);
  const phoneRepository = AppDataSource.getRepository(Phone);

  const users = await userRepository.find();

  const usernameAlreadyExists = users.find(
    (user) => user.username === username
  );

  if (usernameAlreadyExists) {
    throw new AppError("Username already in use");
  }

  const user = userRepository.create({
    username,
    name,
    password: await hash(password, 10),
  });

  await userRepository.save(user);

  emails.map(async (email) => {
    await emailRepository.save({ email, user });
  });

  phones.map(async (phone) => {
    await phoneRepository.save({ phone, user });
  });

  return user;
};
