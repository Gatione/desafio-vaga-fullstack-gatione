import { Router } from "express";
import { createSessionController } from "../controllers/sessions/createSession.controller";
import { deleteSessionUserController } from "../controllers/sessions/deleteSessionUser.controller";
import { getSessionUserController } from "../controllers/sessions/getSessionUser.controller";
import { updateSessionUserController } from "../controllers/sessions/updateSessionUser.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";

const sessionRoutes = Router();

sessionRoutes.post("/login", createSessionController);
sessionRoutes.get("/user", ensureAuthMiddleware, getSessionUserController)
sessionRoutes.patch("/user", ensureAuthMiddleware, updateSessionUserController)
sessionRoutes.delete("/user", ensureAuthMiddleware, deleteSessionUserController)

export default sessionRoutes;
