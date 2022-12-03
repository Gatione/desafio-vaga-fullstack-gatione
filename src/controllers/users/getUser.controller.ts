import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { getUserService } from "../../services/users/getUser.service";

export const getUserController = async (req:Request, res: Response) => {
    const id = req.params.id
    const user = await getUserService(id)
    return res.json(instanceToPlain(user))
}