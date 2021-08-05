import Modal from "./Modal";
import { Typography, Button, TextField, CssBaseline } from "@material-ui/core";
import styles from "../css/LoginRegisterDialog.module.css";
import { useContext, useState } from "react";
import axios from "axios";
import ImageUpload from "./ImageUpload";
import { AppContext } from "../AppContextProvider";
import checkTrueUser from "../utils/checkTrueUser";

export default function Edit({ onConfirmFlag, onCancelEdit }) {
  const { userTrue, editProfile, setTrueUser, clear } = useContext(AppContext);
  const user = checkTrueUser({ userTrue });
  const [username, setUsername] = useState(user.username);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(null);

  const [hasErrors, setHasErrors] = useState(false);
  const [usernameExist, setUsernameExist] = useState(false);
  const isError = (condition) => hasErrors && condition;  

  async function handleOnEdit() {
    setHasErrors(true);
    const userInfo = {
      _id: user._id,
      username,
      firstName,
      lastName,
      email,
      icon: user.icon,
      listenList: [],
    };
    if (
      username.length > 0 &&
      firstName.length > 0 &&
      lastName.length > 0 &&
      email.length > 0 &&
      !usernameExist
    ) {
      const newUser = await editProfile(userInfo, image);
      if (newUser !== null) {        
        console.log("dsadsa");
        console.log(newUser);
        clear();
        setTrueUser(newUser);
        const flag = false;
        onConfirmFlag(flag);
      } else {
        alert(
          "There are some unknown errors hanpened in database, please change some your infomation then submit again!"
        );
      }
    }
  }

  async function handleUserExist() {
    if (user.username !== username) {
      const response = await axios.get(`/api/editprofile/${username}`);
      if (response.data) {
        setUsernameExist(true);
      } else {
        setUsernameExist(false);
      }
    } else {
      setUsernameExist(false);
    }
  }

  return (
    <Modal
      style={{ width: "60%", height: "auto" }}
      dismissOnClickOutside={true}
      onCancel={onCancelEdit}
    >
      <Typography variant="h5"> Edit your profile</Typography>
      <div className={(styles.form, styles.form_register)}>
        <div className={styles.formRow}>
          <TextField
            autoFocus
            margin="normal"
            id="username"
            label="Username"
            type="text"
            variant="filled"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={handleUserExist}
            error={usernameExist ? true : isError(username.length === 0)}
            helperText={
              usernameExist
                ? "The username has already exist, please try again!"
                : isError(username.length === 0) &&
                  "Please enter your username!"
            }
          />
        </div>

        <div className={styles.formRow}>
          <TextField
            margin="normal"
            id="firstname"
            label="FirstName"
            type="text"
            variant="filled"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={isError(firstName.length === 0)}
            helperText={
              isError(firstName.length === 0) && "Please enter your first name!"
            }
          />
        </div>

        <div className={styles.formRow}>
          <TextField
            margin="normal"
            id="lastname"
            label="LastName"
            type="text"
            variant="filled"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={isError(lastName.length === 0)}
            helperText={
              isError(lastName.length === 0) && "Please enter your last name!"
            }
          />
        </div>

        <div className={styles.formRow}>
          <TextField
            margin="normal"
            id="email"
            label="Email"
            type="email"
            variant="filled"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={isError(email.length === 0)}
            helperText={
              isError(email.length === 0) && "The email cannot be empty!"
            }
          />
        </div>
        <div className={styles.formRow}>
          <ImageUpload
            onChange={(e) => setImage(e.target.files[0])}
            image={user.icon}
            error={false}
            helperText={false && "Please choose an image!"}
            text={"Choose your icon"}
          />
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
            onClick={() => handleOnEdit()}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
}
