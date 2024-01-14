import * as express from "express";
import UsersController from "../../controllers/Users.controller";
import userSchema from "../../schema/user.schema";
import { celebrate } from "celebrate";

const router = express.Router();

router.post("/create", celebrate(userSchema.create), UsersController.create);

router.put("/update/:id", celebrate(userSchema.update), UsersController.update);

router.get("/view/:id", UsersController.byId);

router.delete("/delete/:id", UsersController.softDelete);

router.post("/login", celebrate(userSchema.login), UsersController.login);

router.post("/logout", UsersController.logout);

export default router;
