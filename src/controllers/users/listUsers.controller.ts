import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { listUsersService } from "../../services/users/listUsers.service";

export const listUsersController = async (req:Request, res: Response) => {
    const users = await listUsersService()
    return res.json(instanceToPlain(users))
}