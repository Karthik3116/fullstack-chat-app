import express from "express"
// import protectRoute from "../middleware/auth.middleware.js";
import {getUsersForSidebar, sendMessages , getMessages} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users"  , getUsersForSidebar);

router.get("/:id"  , getMessages);

router.post("/:id"  , sendMessages);


export default router;