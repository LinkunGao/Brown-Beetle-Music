import express from "express";
import {
  createUser,
  retrieveUser,
  updateUser,
  deleteUser,
} from "../../music-data/user-dao";

const HTTP_NO_CONTENT = 204;
const router = express.Router();

router.get("/:username", async (req, res) => {
  const { username } = req.params;
  const response = await retrieveUser(username);
  if (response === null) {
    return res.json(false);
  }

  return res.json(true);
});

router.put("/", async (req, res) => {
  const newUser = req.body;
  const user = await updateUser(newUser);
  res.json(user);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await deleteUser(id);
  res.json(result);
});

export default router;
