import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { updateContactService } from "../../services/contacts/updateContact.service";

export const updateContactController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, userId, isAdm } = req.body;
  const updatedContact = await updateContactService(id, name, userId, isAdm);
  return res.json(instanceToPlain(updatedContact));
};
