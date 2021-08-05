import express from "express";
import { retrieveUser } from "../../music-data/user-dao";

const router = express.Router();

// const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

router.post("/", async (req, res) => {
  // console.log("username: "+req.body.a);
  // console.log("password: " + req.body.b);

  const user = await retrieveUser(req.body.a);

  if (user) {
    if (user.password === req.body.b) {
      res.json(user);
    } else {
      res.json("password error");
    }
  } else {
    res.json("username error");
  }
});

export default router;
