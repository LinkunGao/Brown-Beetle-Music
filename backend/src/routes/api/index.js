import express from "express";

const router = express.Router();

import login from "./login";

router.use("/login", login);

import register from "./register";

router.use("/register", register);

import image from "./image";
router.use("/image", image);

import playlist from "./playlist";
router.use("/playlist", playlist);

import editprofile from "./editprofile";
router.use("/editprofile", editprofile);

export default router;
