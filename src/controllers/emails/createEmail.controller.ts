import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { createEmailService } from "../../services/emails/createEmail.service";

export const createEmailController = async (req: Request, res:Response) => {
    const {email, userId, contactId} = req.body
    const createdEmail = await createEmailService(email, userId, contactId)
    return res.status(201).json(instanceToPlain(createdEmail))
}