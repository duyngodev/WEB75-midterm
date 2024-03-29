import express from "express";
import {
  loginUser,
  signupUser,
  getData,
  getDataById,
  deleteDataById,
  updateDataById,
} from "../controller/user.controller.js";
import { authentication, author } from "../middleware/auth.middle.js";

const router = express.Router();

//login route
router.route("/login").post(loginUser);

/* sigun up route
 * signup => login => other routes   - no token after signup
 */
router.route("/signup").post(signupUser);

router.get("/", author, getData);

router.get("/:id", authentication, author, getDataById);
router.get("/:id", authentication, author, deleteDataById);
router.get("/:id", authentication, author, updateDataById);

export { router as userRouter };
