import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { updateUserService } from "../../services/users/updateUser.service";

export const updateUserController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { userId, isAdm, username, name, password } = req.body;

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
