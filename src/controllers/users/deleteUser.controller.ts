import { Request, Response } from "express";
import { softDeleteUserService } from "../../services/users/deleteUser.service";

export const deleteUserController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { userId, isAdm } = req.body;
  await softDeleteUserService(id, userId, isAdm);
  return res.json({ message: "User deactivated" });
};
