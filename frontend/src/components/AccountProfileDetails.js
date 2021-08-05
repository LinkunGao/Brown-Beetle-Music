import React, { useEffect } from "react";
import { useState, useContext } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@material-ui/core";
import { AppContext } from "../AppContextProvider";
import checkTrueUser from "../utils/checkTrueUser";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
}));

const AccountProfileDetails = (props) => {
  //message
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  //usestyle
  const classes = useStyles();
  const { userTrue, editProfile, setTrueUser, clear } = useContext(AppContext);
  const user = checkTrueUser({ userTrue });
  const [values, setValues] = useState({
    userName: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
  //usestates
  useEffect(()=>{
    if (!!user){
      setValues({
        userName: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      })
    }
  },[user])

  const [image, setImage] = useState(null);
  const { deleteAccount } = useContext(AppContext);
  const [usernameExist] = useState(false);

  //communicate with backend
  async function handleOnEdit() {
    const userInfo = {
      _id: user._id,
      username: values.userName,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      icon: user.icon,
      listenList: [],
    };
    console.log(userInfo);
    if (!usernameExist) {
      const newUser = await editProfile(userInfo, image);
      if (newUser !== null) {
        clear();
        setTrueUser(newUser);
        
      } else {
        alert(
          "There are some unknown errors hanpened in database, please change some your infomation then submit again!"
        );
      }
    }
  }
  //user writing
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  async function handleDeleteAccount() {
    if (window.confirm("Are you sure delete current account?")) {
      const response = await deleteAccount(user._id);
      console.log(response);
      if (response) {
        clear();
        // reload
        window.location.href = "/pages/MainMusic";
      } else {
        console.log("delete fail!");
      }
    }
  }

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label={!!user ? '' : "First name"}
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the last name"
                label={!!user ? '' : "Last name"}
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label={!!user ? '' : "Email Address"}
                helperText="Please specify the email address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            {/* not allowed to change password      */}
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label={!!user ? '' : "Password"}
                defaultValue="******************"
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          backgroundColor="green"
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          {/* upload imgs */}
          <input
            className={classes.input}
            accept="image/*"
            id="icon-button-file"
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
              handleOnEdit();
            }}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
          <Button
            color="primary"
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => {
              // to save the new user info
              handleOnEdit();
              handleClick();
            }}
          >
            Save
          </Button>

          <Button
            variant="contained"
            color="secondary"
            endIcon={<DeleteIcon />}
            onClick={handleDeleteAccount}
          >
            Delete
          </Button>
        </Box>
      </Card>
      {/* message bar */}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Profile updated"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </form>
  );
};

export default AccountProfileDetails;
