import express from "express";

const router = express.Router();

// the route from api
import api from "./api";

router.use("/api", api);

export default router;
