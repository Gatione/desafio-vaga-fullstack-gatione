import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IContactRequest } from "../../interfaces/contacts.interfaces";
import { createContactService } from "../../services/contacts/createContact.service";

export const createContactController = async (req: Request, res: Response) => {
  const { name, emails, phones, userId }: IContactRequest = req.body;
  const contact = await createContactService({ name, emails, phones, userId });
  return res.status(201).send(instanceToPlain(contact));
};
