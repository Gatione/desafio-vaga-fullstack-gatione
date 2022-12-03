import { Request, Response } from "express";
import { deletePhoneService } from "../../services/phones/deletePhone.service";

export const deletePhoneController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { userId, isAdm } = req.body;
  await deletePhoneService(id, userId, isAdm);
  return res.json({ message: "Phone deleted" });
};
