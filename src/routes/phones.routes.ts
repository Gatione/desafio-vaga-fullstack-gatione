import { Router } from "express";
import { deletePhoneController } from "../controllers/phones/deletePhone.controller";
import { updatePhoneController } from "../controllers/phones/updatePhone.controller";

const phonesRoutes = Router();

// phonesRoutes.post("")
phonesRoutes.patch("/:id", updatePhoneController);
phonesRoutes.delete("/:id", deletePhoneController);

export default phonesRoutes;
