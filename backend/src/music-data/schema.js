import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },

    email: { type: String, required: true },
    icon: { type: String, required: true },

    listenList: [{ type: Schema.Types.ObjectId, ref: "MusicList" }],
  },
  {
    timestamps: {},
  }
);

userSchema
  .virtual("fullName")
  .get(function () {
    return `${this.lastName} ${this.firstName}`;
  })
  .set(function (value) {
    this.firstName = value.substr(0, value.indexOf(" "));
    this.lastName = value.substr(value.indexOf(" ") + 1);
  });

export const User = mongoose.model("User", userSchema);

const musicListSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    describtion: { type: String },
    publish: { type: Boolean },
    musiclist: [
      {
        song_id: { type: String, required: true },
        music_name: { type: String, required: true },
        artist: { type: String, required: true },
        full_url: { type: String },
        source: { type: String, required: true },
        currentlist_id: { type: String, required: true },
      },
    ],
    createDate: Date,
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: {},
  }
);

export const MusicList = mongoose.model("MusicList", musicListSchema);
