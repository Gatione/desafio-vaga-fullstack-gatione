import { Router } from "express";
import { createEmailController } from "../controllers/emails/createEmail.controller";
import { deleteEmailController } from "../controllers/emails/deleteEmail.controller";
import { updateEmailController } from "../controllers/emails/updateEmail.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";

const emailsRoutes = Router();

emailsRoutes.post("", ensureAuthMiddleware, createEmailController);
emailsRoutes.patch("/:id", ensureAuthMiddleware, updateEmailController);
emailsRoutes.delete("/:id", ensureAuthMiddleware, deleteEmailController);

export default emailsRoutes;
