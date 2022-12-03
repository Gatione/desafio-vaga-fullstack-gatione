import { Router } from "express";
import { createPhoneController } from "../controllers/phones/createPhone.controller";
import { deletePhoneController } from "../controllers/phones/deletePhone.controller";
import { updatePhoneController } from "../controllers/phones/updatePhone.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";

const phonesRoutes = Router();

phonesRoutes.post("", ensureAuthMiddleware, createPhoneController)
phonesRoutes.patch("/:id", ensureAuthMiddleware, updatePhoneController);
phonesRoutes.delete("/:id", ensureAuthMiddleware, deletePhoneController);

export default phonesRoutes;
