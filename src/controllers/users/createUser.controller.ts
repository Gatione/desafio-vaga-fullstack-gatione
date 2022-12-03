import { Request, Response } from "express";
import { IUserRequest } from "../../interfaces/users.interfaces";
import { createUserService } from "../../services/users/createUser.service";
import { instanceToPlain } from "class-transformer";

export const createUserController = async (req: Request, res: Response) => {
  const user: IUserRequest = req.body;
  const createdUser = await createUserService(user);
  return res.status(201).send(instanceToPlain(createdUser));
};
