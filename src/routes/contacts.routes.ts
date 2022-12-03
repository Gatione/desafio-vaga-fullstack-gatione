import { Router } from "express";
import { createContactController } from "../controllers/contacts/createContact.controller";
import { deleteContactController } from "../controllers/contacts/deleteContact.controller";
import { listContactsController } from "../controllers/contacts/listContacts.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";

const contactRoutes = Router();

contactRoutes.post("", ensureAuthMiddleware, createContactController);
contactRoutes.get("", ensureAuthMiddleware, listContactsController);
// contactRoutes.get("/:id")
// contactRoutes.patch("/:id")
contactRoutes.delete("/:id", ensureAuthMiddleware, deleteContactController)

export default contactRoutes;
