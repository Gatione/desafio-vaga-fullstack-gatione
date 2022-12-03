import { Request, Response } from "express";
import { getContactService } from "../../services/contacts/getContact.service";

export const getContactController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { userId } = req.body;
  const contact = await getContactService(id, userId)
  return res.json(contact)
};
