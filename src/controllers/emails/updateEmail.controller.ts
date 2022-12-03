import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { updateEmailService } from "../../services/emails/updateEmail.service";

export const updateEmailController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { email, userId, isAdm } = req.body;
  const updatedEmail = updateEmailService(id, email, userId, isAdm);
  return res.json(instanceToPlain(updatedEmail));
};
