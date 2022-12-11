import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { getUserService } from "../../services/users/getUser.service";

export const getSessionUserController = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const user = await getUserService(userId);
  return res.json(instanceToPlain(user));
};
