import { Router } from "express";
import cartsManager from "../cartsManager.js"

const router = Router();

router.get("/:cid", async (req, res) => {})

router.post('/:cid/product/:pid', async (req, res) => {})

export default router;