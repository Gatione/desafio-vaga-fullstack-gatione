import { compare } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import jwt from "jsonwebtoken";

export const createSessionService = async (
  username: string,
  password: string
): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      username,
    },
  });

  if (!user) {
    throw new AppError("Invalid credentials", 403);
  }

  if (!user.isActive) {
    throw new AppError("User is not active");
  }

  const matchPassword = await compare(password, user.password);

  if (!matchPassword) {
    throw new AppError("Invalid credentials", 403);
  }

  const token = jwt.sign(
    {
      isAdm: user.isAdm,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "2h",
      subject: user.id,
    }
  );

  return token;
};
