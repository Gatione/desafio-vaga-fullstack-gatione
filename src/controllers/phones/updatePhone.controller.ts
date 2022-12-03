import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { updatePhoneService } from "../../services/phones/updatePhone.service";

export const updatePhoneController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { phone, userId, isAdm } = req.body;
  const updatedPhone = updatePhoneService(id, phone, userId, isAdm);
  return res.json(instanceToPlain(updatedPhone));
};
