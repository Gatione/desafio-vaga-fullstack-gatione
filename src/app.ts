import "reflect-metadata";
import express from "express";
import "express-async-errors";
import userRoutes from "./routes/users.routes";
import sessionRoutes from "./routes/sessions.routes";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import contactRoutes from "./routes/contacts.routes";

const app = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", sessionRoutes);
app.use("/contacts", contactRoutes);

app.use(handleErrorMiddleware);

export default app;
