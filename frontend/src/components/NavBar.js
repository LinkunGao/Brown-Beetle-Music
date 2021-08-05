import React, { useContext, useState } from "react";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { withStyles } from "@material-ui/core/styles";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddIcon from "@material-ui/icons/Add";
import AddListFirm from "./AddListFirm";

import {
  AppBar,
  makeStyles,
  Tab,
  CssBaseline,
  Typography,
  Toolbar,
  Grid,
  useTheme,
} from "@material-ui/core";
import { AppContext } from "../AppContextProvider";
import checkTrueUser from "../utils/checkTrueUser";
import Icon from "./Icon";
import SearchBar from "./SearchBar";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";

import { useHistory } from "react-router";
import MListDialog from "../components/MusicList";
import Avatar from "@material-ui/core/Avatar";

const drawerWidth = 160;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    backgroundColor: theme.palette.background.light,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    marginRight: "auto",
  },
  SearchBar: {
    marginRight: "auto",
  },
  styledMenu: {
    marginLeft: theme.spacing(4),
  },
  toolbar: {
    padding: theme.spacing(0, 1),
    width: "100%",
  },
  myicon: {
    marginRight: theme.spacing(3),
    height: 100,
  },
  myIcon_Search: {
    disply: "flex",
  },
  player: {
    background: "#f1f3f4",
    height: 80,

    bottom: 0,
    left: 0,
    width: "100vw",
  },
  mian: {
    marginRight: theme.spacing(3),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  content: {
    padding: theme.spacing(3),
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function NavBar() {
  const styles = useStyles();
  const theme = useTheme();
  // open the side bar
  const [open, setOpen] = useState(false);
  const history = useHistory();
  // const tabIndex = useTabIndex();
  const [addlistFlag, setAddListFlag] = useState(false);
// the user info
  const { userTrue, clear } = useContext(AppContext);
  const user = checkTrueUser({ userTrue });
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // handle click log in
  function handleLoginOnClick(e) {
    setAnchorEl(e.currentTarget);
    if (e.target.innerHTML === "login") {
      history.push("/pages/LoginDialog");
    }
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [open1, setOpen1] = React.useState(false);
  //    const [selectedMusic, setSelectedMusic] = React.useState(Musics[1]);
  const [musicListItem, setMusicListItem] = useState([]);
  // handle open music list in side bar
  const handleClickOpen1 = (item) => {
    setMusicListItem(item);
    setOpen1(true);
  };

  function handleAddlistInNavBar() {
    
    if(!!user){
      setAddListFlag(true);
    }else{
      history.push("/pages/LoginDialog")
    }
  }
  const handleMClose = (value) => {
    setOpen1(false);
  };
  return (
    // console.log(user.listenList),
    <>
      <CssBaseline />
      <AppBar
        // position="fixed"
        className={
          (styles.appBar,
          clsx(styles.appBar, {
            [styles.appBarShift]: open,
          }))
        }
      >
        <Toolbar variant="dense" className={styles.toolbar}>
          <IconButton
            className={styles.myicon}
            // edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(styles.menuButton, {
              [styles.hide]: open,
            })}
          >
            <LibraryMusicIcon />
          </IconButton>
          <Tab
            className={styles.title}
            label={"The Ultimate One"}
            onClick={() => {
              history.push("/pages/MainMusic");
            }}
          />
          <Typography className={styles.SearchBar} variant="caption">
            {user ? (
              <Grid container spacing={2} className={styles.myIcon_Search}>
                <Grid item xs>
                  <SearchBar />
                </Grid>
              </Grid>
            ) : (
              ""
            )}
          </Typography>
          <Button
            disableElevation
            className={styles.styledMenu}
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            onClick={handleLoginOnClick}
          >
            {userTrue ? (
              <Typography fontsize="20">
                <Icon imageUrl={user.icon} username={user.username} />
              </Typography>
            ) : (
              "login"
            )}
          </Button>
          {userTrue ? (
            <StyledMenu
              id="customized-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <StyledMenuItem
                onClick={(e) => {
                  setAnchorEl(null);
                  history.push("/pages/Profile");
                }}
              >
                <ListItemIcon>
                  <PersonIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="Profile  " />
              </StyledMenuItem>
              {/* <StyledMenuItem>
                <ListItemIcon>
                  <DraftsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Mylist" />
              </StyledMenuItem> */}
              <StyledMenuItem
                onClick={(e) => {
                  clear();
                  history.replace("/pages/MainMusic");
                  clear();
                  window.location.reload("/pages/MainMusic");
                }}
              >
                <ListItemIcon>
                  <ExitToAppIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </StyledMenuItem>
            </StyledMenu>
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        // anchor={"right"}
        variant="permanent"
        style={{ zIndex: 1 }}
        className={clsx(styles.drawer, {
          [styles.drawerOpen]: open,
          [styles.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [styles.drawerOpen]: open,
            [styles.drawerClose]: !open,
          }),
        }}
      >
        <div className={styles.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["Addmusic"].map((text, index) => (
            <ListItem key={index} button key={text} onClick={handleAddlistInNavBar}>
              <ListItemIcon>
                <AddIcon fontSize="large"></AddIcon>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {user.listenList !== undefined && user.listenList !== null
            ? user.listenList.map((item, index) => (
                <ListItem
                  onClick={() => handleClickOpen1(item)}
                  button
                  key={item.name}
                >
                  <ListItemIcon>
                    <Avatar src={item.image} />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))
            : ""}
        </List>
      </Drawer>
      <MListDialog
        open={open1}
        onClose={handleMClose}
        singleList={musicListItem}
      />
      {addlistFlag && (
        <AddListFirm
          onCancelAddList={() => setAddListFlag(false)}
          onAddListFlag={(flag) => setAddListFlag(flag)}
        />
      )}
    </>
  );
}
