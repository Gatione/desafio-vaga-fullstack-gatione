import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { createPhoneService } from "../../services/phones/createPhone.service";

export const createPhoneController = async (req: Request, res:Response) => {
    const {phone, userId, contactId} = req.body
    const createdPhone = await createPhoneService(phone, userId, contactId)
    return res.status(201).json(instanceToPlain(createdPhone))
}