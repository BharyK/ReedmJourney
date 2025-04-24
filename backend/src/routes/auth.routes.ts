import {Router} from "express";
import { SignUp } from "../controllers/auth.controller";
import {SignIn} from "../controllers/auth.controller";	

const router = Router();

router.post("/auth/signup", SignUp);
router.post("/auth/signIn", SignIn);

export default router;
