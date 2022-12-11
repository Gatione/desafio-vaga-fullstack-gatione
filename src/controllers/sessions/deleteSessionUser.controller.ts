import { Request, Response } from "express";
import { softDeleteUserService } from "../../services/users/deleteUser.service";

export const deleteSessionUserController = async (
  req: Request,
  res: Response
) => {
  const { userId, isAdm } = req.body;
  const id = userId;
  await softDeleteUserService(id, userId, isAdm);
  return res.json({ message: "User deactivated" });
};
