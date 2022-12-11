import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { updateUserService } from "../../services/users/updateUser.service";

export const updateSessionUserController = async (req: Request, res: Response) => {
  const { userId, isAdm, username, name, password } = req.body;
  const id = userId

  const updatedUser = await updateUserService(
    id,
    userId,
    isAdm,
    username,
    name,
    password
  );

  return res.json(instanceToPlain(updatedUser));
};
