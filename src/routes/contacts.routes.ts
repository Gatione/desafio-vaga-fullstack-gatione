import { Router } from "express";
import { createContactController } from "../controllers/contacts/createContact.controller";
import { deleteContactController } from "../controllers/contacts/deleteContact.controller";
import { getContactController } from "../controllers/contacts/getContact.controller";
import { listContactsController } from "../controllers/contacts/listContacts.controller";
import { updateContactController } from "../controllers/contacts/updateContact.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";

const contactRoutes = Router();

contactRoutes.post("", ensureAuthMiddleware, createContactController);
contactRoutes.get("", ensureAuthMiddleware, listContactsController);
contactRoutes.get("/:id", ensureAuthMiddleware, getContactController);
contactRoutes.patch("/:id", ensureAuthMiddleware, updateContactController);
contactRoutes.delete("/:id", ensureAuthMiddleware, deleteContactController);

export default contactRoutes;
