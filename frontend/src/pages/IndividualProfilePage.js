import {
    Grid,
    makeStyles,
    Avatar,  
    Card,  
    CardContent,  
    Typography,
    AppBar,
    Tab,
    Tabs,    
  } from "@material-ui/core";
  import { useContext, useState } from "react";
  import { AppContext } from "../AppContextProvider";
  import checkTrueUser from "../utils/checkTrueUser";
  import { Box } from "@material-ui/core";
  import Edit from "../components/Edit";
  import AddListFirm from "../components/AddListFirm";
  import React from "react";
  import MListDialog from "../components/MusicList";
  import GridList from "@material-ui/core/GridList";
  import GridListTile from "@material-ui/core/GridListTile";
  import GridListTileBar from "@material-ui/core/GridListTileBar";
  import AccountProfileDetails from "../components/AccountProfileDetails";
  import PropTypes from "prop-types";
  import Divider from "@material-ui/core/Divider";
  
  
  //Styles
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
      // flexGrow: 1,
    },
    card_root: {
      maxWidth: "100%",
      height: 200,
      cursor: "pointer",
      "&:hover": {
        transform: "scale(1.01, 1.01)",
      },
    },
    card: {
      maxWidth: 400,
      margin: "auto",
      borderRadius: 12,
      padding: 12,
      textAlign: "center",
    },
    avatar: {
      width: 200,
      height: 200,
      margin: "auto",
    },
    heading: {
      fontSize: 45,
      fontWeight: "bold",
      letterSpacing: "0.5px",
      marginTop: 12,
      marginBottom: 0,
    },
    subheader: {
      fontSize: 14,
      marginBottom: "0.875em",
    },
    root_pl: {
      flexGrow: 1,
    },
    card_root_pl: {
      maxWidth: 345,
      maxHeight: 250,
    },
    gridList: {
      width: "100%",
      height: "90vh",
  
      // overflow: 'hidden',
    },
    card_text_pl: {
      backgroundColor: "green",
    },
    card_media_pl: {
      height: 200,
    },
    container_right: {
      display: "flex",
      flexDirection: "row",
      maxWidth: "70vw",
      maxHeight: "50vh",
      marginTop: 3,
      marginLeft: 3,
      padding: 0,
    },
  }));
  
  // this function is for change the user info page and user list page in profile page
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  // the change page logic
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  
  export default function IndividualProfile() {
    // the value is for change the edit page or individual musiclist page
    const [value, setValue] = useState(0);
    // the flag for open addlist or edit profile
    const [flag, setFlag] = useState(false);
    const handleProfileTabsChange = (e, newValue) => {
      setValue(newValue);
    };
   
    console.log(value)
  
    const classes = useStyles();
    const { userTrue} = useContext(AppContext);
    const user = checkTrueUser({ userTrue });
  
    // the flag determine the all list dialog open or not
    const [addlistFlag, setAddListFlag] = useState(false);
    // the musicListItem will be send to MListDialog
    const [musicListItem, SetMusicListItem] = useState([]);
    const [open, setOpen] = useState(false);
    //  item: the whole contant of music list
    const handleClickOpen = (item) => {
      SetMusicListItem(item);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      
      <div className={classes.root}>
        {flag ? (
              <Edit
                onCancelEdit={() => setFlag(false)}
                onConfirmFlag={(flag) => setFlag(flag)}
              />
            ) : (
              ""
            )}
            {addlistFlag && (
              <AddListFirm
                onCancelAddList={() => setAddListFlag(false)}
                onAddListFlag={(flag) => setAddListFlag(flag)}
              />
            )}
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <AppBar position="static" color="default">
              <Tabs
                onChange={handleProfileTabsChange}
                value={value}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
              >
                <Tab label="Profile" {...a11yProps(0)} />
                <Tab label="Playlists" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Avatar
                        borderRadius="50%"
                        style={{ padding: "10px" }}
                        variant="circle"
                        src={user.icon}
                        className={classes.avatar}
                      />
                      <h3 className={classes.heading}>{user.username}</h3>
                      <span className={classes.subheader}>
                        {user.firstName} {user.lastName}
                      </span>
                    </CardContent>
                    <Divider />
                    <Box display={"flex"}>
                      <Box
                        p={2}
                        flex={"auto"}
                        // className={borderedGridStyles.item}
                      >
                        <p className={classes.statLabel}>MusicLists</p>
                        {user.listenList !== undefined &&
                        user.listenList !== null ? (
                          <p className={classes.statValue}>
                            {user.listenList.length}
                          </p>
                        ) : (
                          ""
                        )}
                      </Box>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={7}>
                  {/* for change user infomation */}
                  <AccountProfileDetails />
                </Grid>
              </Grid>
            </TabPanel>
            
            {/* the music list page */}
            <TabPanel value={value} index={1}>
              <GridList cellHeight={280} className={classes.gridList}>
                <GridListTile
                  className={classes.card_root}
                  onClick={() => setAddListFlag(true)}
                >
                  <img src={"/images/plus.png" } alt = ''/>
                  <GridListTileBar title="Create" />
                </GridListTile>
                {user.listenList !== undefined && user.listenList !== null
                  ? user.listenList.map((item, index) => (
                      <GridListTile
                        key={index}
                        cols={0.5}
                        className={classes.card_root}
                        onClick={() => handleClickOpen(item)}
                      >
                        <img src={item.image} alt={item.name} />
                        <GridListTileBar title={item.name} />
                      </GridListTile>
                    ))
                  : ""}
              </GridList>
            </TabPanel>
          </Grid>
        </Grid>
        {/* to open the user list in user profile page */}
        <MListDialog
          open={open}
          onClose={handleClose}
          singleList={musicListItem}
        />
      </div>
    );
  }
  