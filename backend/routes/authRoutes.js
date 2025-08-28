import express from "express"
import { loginController } from "../controllers/auth/loginController.js";
import { registerController } from "../controllers/auth/registerController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

//login route
router.post("/login", loginController);
// register route
router.post("/register", registerController)

// Protected Route
router.get("/profile", authMiddleware, (req, res) => {
    res.json({
        message: "This is protected route",
        user: req.user,
    })
})

export default router;