import express from "express";
import {
  createList,
  deleteList,
  updateList,
  deleteSong,
  searchAllPublishList,
  searchSingleList,
} from "../../music-data/playlist-dao";

const router = express.Router();

router.post("/", async (req, res) => {
  const emptyList = req.body;
  const userWithList = await createList(emptyList);

  res.json(userWithList);
});

router.delete("/musiclist/:_id", async (req, res) => {
  const { _id } = req.params;

  const userDeleteList = await deleteList(_id);

  res.json(userDeleteList);
});

router.delete("/songs", async (req, res) => {
  const singleMusic = req.body;

  const userDeleteSong = await deleteSong(singleMusic);
  res.json(userDeleteSong);
});

router.put("/musiclist", async (req, res) => {
  const musicList = req.body;
  const userUpdateList = await updateList(musicList);

  res.json(userUpdateList);
});

router.get("/shuffedlist", async (req, res) => {
  const limitedlist = [];
  const allList = await searchAllPublishList();
  const shuffedlist = allList
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
  for (let item of shuffedlist) {
    if (limitedlist.length < 4) {
      limitedlist.push(item);
    }
  }

  res.json(limitedlist);
});

router.get("/singlelist/:_id", async (req, res) => {
  const { _id } = req.params;
  const singlelist = await searchSingleList(_id);
  res.json(singlelist);
});

export default router;
