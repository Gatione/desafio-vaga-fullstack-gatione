import { Router } from "express";
import { deleteEmailController } from "../controllers/emails/deleteEmail.controller";
import { updateEmailController } from "../controllers/emails/updateEmail.controller";

const emailsRoutes = Router();

// emailsRoutes.post("")
emailsRoutes.patch("/:id", updateEmailController);
emailsRoutes.delete("/:id", deleteEmailController);

export default emailsRoutes;
