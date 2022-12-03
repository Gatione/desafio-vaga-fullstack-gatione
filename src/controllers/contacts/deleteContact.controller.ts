import { Request, Response } from "express";
import { deleteContactService } from "../../services/contacts/deleteContact.service";

export const deleteContactController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { userId, isAdm } = req.body;
  await deleteContactService(id, userId, isAdm);
  return res.json({ message: "Contact deleted" });
};
