import md5 from "md5";

const salt = "12345asdfg";
const hashPassword = md5(md5("111") + salt);
const users = [
  {
    username: "coco",
    firstName: "linkun",
    lastName: "Gao",
    password: hashPassword,
    email: "asddsa@gmail.com",
    icon: "/images/default.png",

    listenList: [],
  },
];
const musicLists = [
  {
    name: "coco",
    discribtion: "",
    music: [],
    owner: null,
  },
];

export { users, musicLists };
