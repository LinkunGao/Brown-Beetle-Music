import express from "express";
import { createUser, retrieveUser } from "../../music-data/user-dao";
import md5 from "md5";

const router = express.Router();

async function checkUserExist(username) {
  const response = await retrieveUser(username);
  if (response === null) {
    return false;
  }

  return true;
}

router.post("/", async (req, res) => {
  const user = req.body.user;
  const salt = req.body.salt;

  user.password = md5(md5(user.password) + salt);

  const result = await createUser(user);
  res.json(result);
});

router.get("/:username", async (req, res) => {
  const { username } = req.params;
  const result = await checkUserExist(username);
  res.json(result);
});

export default router;
