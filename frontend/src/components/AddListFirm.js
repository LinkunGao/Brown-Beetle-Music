import Modal from "./Modal";
import {
  Typography,
  Button,
  TextField,
  CssBaseline,
  TextareaAutosize,
  Checkbox,
} from "@material-ui/core";
import styles from "../css/LoginRegisterDialog.module.css";
import { useContext, useState } from "react";
import ImageUpload from "./ImageUpload";
import { AppContext } from "../AppContextProvider";
import checkTrueUser from "../utils/checkTrueUser";

import { createMusicList } from "../utils/useCrudMusicList";

export default function AddListFirm({ onCancelAddList, onAddListFlag }) {
  const { userTrue, setTrueUser, clear } = useContext(AppContext);
  const user = checkTrueUser({ userTrue });
//   store the new list info 
  const [name, setName] = useState("");
  const [describtion, setDiscribtion] = useState("");
  const [image, setImage] = useState(null);

  const [musiclist] = useState([]);
  const [publish, setPublish] = useState(false);

  const [hasErrors, setHasErrors] = useState(false);
  const isError = (condition) => hasErrors && condition;

  console.log(publish);

  async function handleOnCreate() {
    setHasErrors(true);

    const musiclist_info = {
      name,
      describtion,
      publish,
      owner: user._id,
      image: "",
      musiclist,
    };
    if (name.length > 0 && image !== null) {
      const userWithList = await createMusicList(musiclist_info, image);
      clear(); // delete current old user info
      setTrueUser(userWithList); // set the new user info and the hooks function will let the web page refeash automatically!
      const flag = false;
      onAddListFlag(flag);
    } else {
    }
  }

  return (
    <Modal
      style={{ width: "60%", height: "auto" }}
      dismissOnClickOutside={true}
      onCancel={onCancelAddList}
    >
      <Typography variant="h5"> Create a MusicList</Typography>
      <div className={(styles.form, styles.form_register)}>
        <div className={styles.formRow}>
          <TextField
            autoFocus
            margin="normal"
            id="name"
            label="Name"
            type="text"
            variant="filled"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={isError(name.length === 0)}
            helperText={
              isError(name.length === 0) && "Please enter your music list name!"
            }
          />
        </div>

        <div className={styles.formRow}>
          <ImageUpload
            onChange={(e) => setImage(e.target.files[0])}
            error={isError(image === null)}
            image={null}
            helperText={isError(image === null) && "Please choose an image!"}
            text={"Choose your image"}
          />
        </div>

        <div className={styles.formRow}>
          <Typography variant="h6" component="h6">
            Share your description here:
          </Typography>

          <TextareaAutosize
            aria-label="minimum height"
            id="describtion"
            margin="normal"
            rowsMin={8}
            style={{ width: "50vw" }}
            value={describtion}
            onChange={(e) => setDiscribtion(e.target.value)}
            placeholder="describtion"
          />
        </div>

        <div className={styles.formRow}>
          <Checkbox onChange={(e) => setPublish(e.target.checked)} />
          Publish current playlist
        </div>

        <div
          className={styles.formRow}
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <CssBaseline />
          <Button
            variant="contained"
            fullWidth
            style={{ marginTop: 3 }}
            onClick={() => handleOnCreate()}
          >
            Create
          </Button>
        </div>
      </div>
    </Modal>
  );
}
