import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation.js";
import { index, show, store, update, destroy, changeStatus } from "../controllers/user.controller.js";

const router = Router();

router.get("/", index);

router.post(
    "/",
    body("name").notEmpty().withMessage("El nombre es obligatorio"),
    body("email").isEmail().withMessage("Correo no válido"),
    handleInputErrors,
    store
);

router.get("/:id", show);

router.put(
    "/:id",
    body("name").notEmpty().withMessage("El nombre es obligatorio"),
    body("email").isEmail().withMessage("Correo no válido"),
    handleInputErrors,
    update
);

router.patch("/:id", changeStatus);

router.delete("/:id", destroy);

export default router;
