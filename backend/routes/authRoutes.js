import express from "express"
import { loginController } from "../controllers/auth/loginController.js";

const router = express.Router();

//login route
router.post("/login", loginController);

export default router;