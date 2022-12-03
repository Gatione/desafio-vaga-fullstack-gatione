import { Request, Response } from "express";
import { listContactsService } from "../../services/contacts/listContacts.service";

export const listContactsController = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const contacts = await listContactsService(userId);
  return res.json(contacts);
};
