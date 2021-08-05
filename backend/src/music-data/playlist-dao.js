import { MusicList } from "./schema";
import { User } from "./schema";

// for create a playlist
async function createList(playlist) {
  const dbPlaylist = new MusicList(playlist);
  const dbUser = await User.findById(playlist.owner);
  const result = await dbPlaylist.save();
  dbUser.listenList.push(result._id);
  await dbUser.save();

  const userWithList = await User.findById(playlist.owner);
  await User.populate(userWithList, "listenList");
  // console.log(userWithList);

  return userWithList;
}

// async function retrieveUserById(list_id){
//     const list = await MusicList.findOne({_id:list_id});
//     const user_id = list.owner
//     const user = await User.findOne({_id:user_id});

//     return user;
// }

// for delete list when delete a list we also need to delete the list which stored in user info
async function deleteList(list_id) {
  // delete this list

  const findlist = await MusicList.findById(list_id);
  // delete the list id from the user database
  await User.findByIdAndUpdate(
    { _id: findlist.owner },
    { $pull: { listenList: list_id } },
    { new: true, useFindAndModify: false }
  );
  //  delete the list in MusicList
  await MusicList.deleteOne({ _id: list_id });
  const userDeleteList = await User.findById(findlist.owner);
  await User.populate(userDeleteList, "listenList");

  return userDeleteList;
}
// send teh update music list to mongondb
async function updateList(musicList) {
  // await MusicList.findByIdAndUpdate({_id:musicList._id}, musicList, { new: true, useFindAndModify: false });
  await MusicList.findByIdAndUpdate(musicList._id, musicList, {
    new: true,
    useFindAndModify: false,
  });

  const userUpdateList = await User.findById(musicList.owner);
  await User.populate(userUpdateList, "listenList");

  return userUpdateList;
}
// send the delete song info to mongondb
async function deleteSong(song) {
  await MusicList.findByIdAndUpdate(
    { _id: song.currentlist_id },
    { $pull: { musiclist: { _id: song._id } } },
    { new: true, useFindAndModify: false }
  );
  const list = await MusicList.findById(song.currentlist_id);
  const userdb = await User.findById(list.owner);
  await User.populate(userdb, "listenList");

  return userdb;
}
// get the recommend published music list
async function searchAllPublishList() {
  const publishedList = await MusicList.find({ publish: true });
  for (let item of publishedList) {
    await MusicList.populate(item, "owner");
  }
  return publishedList;
}
// to get a single published list when user clicked
async function searchSingleList(id) {
  const singlist = await MusicList.findById({ _id: id });
  await MusicList.populate(singlist, "owner");

  return singlist;
}

export {
  createList,
  deleteList,
  updateList,
  deleteSong,
  searchAllPublishList,
  searchSingleList,
};
