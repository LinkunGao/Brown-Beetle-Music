import express from "express";
import path from "path";
import mongoose from "mongoose";

// setup express
const app = express();
const port = process.env.PORT || 3001;

// setup the request body json
app.use(express.json());

// setup the router
import routes from "./routes";
app.use("/", routes);

// make the public folder to static
app.use(express.static(path.join(__dirname, "../public")));

// save the frontend build directory, if run in production mode
if (process.env.NODE_ENV === "production") {
  console.log("running in production");

  // make all files in that folder statically
  app.use(express.static(path.join(__dirname, "../../frontend/build")));

  // if we get any GET request it can't processing using one of serve route, just serve up the index.html by default.
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
  });
}

// listen the port see what port be used
// mongoose.connect('mongodb://localhost:27017/Brown_Beetle_music',{useNewUrlParser:true})
//     .then(()=>app.listen(port, ()=>console.log(`App Server listening port ${port}!`)));
mongoose
  .connect(
    "mongodb+srv://linkun:111@cluster0.g4yk2.mongodb.net/Brown_Beetle_music",
    { useNewUrlParser: true }
  )
  .then(() =>
    app.listen(port, () => console.log(`App Server listening port ${port}!`))
  );
