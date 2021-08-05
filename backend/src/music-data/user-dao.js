import { User } from "./schema";
import { deleteList } from "./playlist-dao";

//the try catch in side the create function to handle err, if it happend, it will return false, then you can tell the user register failed, because he click multiple times.
async function createUser(user) {
  const dbUser = new User(user);
  try {
    const result = await dbUser.save();
    return true;
  } catch (err) {
    return false;
  }
}

// get a signle user info
async function retrieveUser(username) {
  const dbUser = await User.findOne({ username: username });
  await User.populate(dbUser, "listenList");
  return dbUser;
}
// update the user
async function updateUser(user) {
  const dbuser = await User.findById(user._id);
  if (dbuser) {
    dbuser.username = user.username;
    dbuser.firstName = user.firstName;
    dbuser.lastName = user.lastName;
    dbuser.email = user.email;
    dbuser.icon = user.icon;

    await dbuser.save();
    await User.populate(dbuser, "listenList");
    return dbuser;
  }
  return false;
}
// delete user by user id
async function deleteUser(id) {
  const dbuser = await User.findById(id);
  if (dbuser) {
    if (dbuser.listenList.length > 0) {
      dbuser.listenList.map((item) => {
        deleteList(item);
        console.log(item);
      });
    }
    await User.deleteOne({ _id: id });
    return true;
  }
  return false;
}

export { createUser, retrieveUser, updateUser, deleteUser };
