import mongoose from "mongoose";
import { User, MusicList } from "./schema";
import { users, musicLists } from "./initdata";
import { createUser } from "./user-dao";

main();

async function main() {
  // conntect the database
  // await mongoose.connect('mongodb://localhost:27017/Brown_Beetle_music', {
  //     useNewUrlParser:true
  // });
  await mongoose.connect(
    "mongodb+srv://linkun:111@cluster0.g4yk2.mongodb.net/Brown_Beetle_music",
    {
      useNewUrlParser: true,
    }
  );
  console.log("Connected to database!");
  console.log();

  await clearDatabase();

  await addInitData();

  //Disconnected database when complete
  await mongoose.disconnect();
  console.log("Disconnected from database!");
}

async function clearDatabase() {
  await User.deleteMany({});
  await MusicList.deleteMany({});
  console.log("clear database done!");
}

async function addInitData() {
  for (let user of users) {
    const result = await createUser(user);
    console.log(result);
  }
}
