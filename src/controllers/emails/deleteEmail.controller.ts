import { Request, Response } from "express";
import { deleteEmailService } from "../../services/emails/deleteEmail.service";

export const deleteEmailController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { userId, isAdm } = req.body;
  await deleteEmailService(id, userId, isAdm);
  return res.json({ message: "Email deleted" });
};
