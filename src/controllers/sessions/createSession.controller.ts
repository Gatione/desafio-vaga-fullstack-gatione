import { Request, Response } from "express";
import { createSessionService } from "../../services/sessions/createSession.service";

export const createSessionController = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const token = await createSessionService(username, password);
  return res.json({ token });
};
