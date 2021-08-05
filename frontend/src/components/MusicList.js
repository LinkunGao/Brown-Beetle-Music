import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { AppContext } from "../AppContextProvider";
import { useContext, useState } from "react";
import checkTrueUser from "../utils/checkTrueUser";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import DialogActions from '@material-ui/core/DialogActions';
import {deleteMusicList, deleteSingleMusic} from '../utils/useCrudMusicList';
import {spotifyRowClick, netCloudRowClick} from '../utils/play'

const useStyles = makeStyles((theme)=>({
  musicItem_root: {
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
  },
  musicItem_div:{
    width: "25px",
    marginRight:"10px"
  },
  musicItem_img:{
    width:"100%",
  }
}))

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});


const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function MListDialog(props) {
  const [openD, setOpenD] = useState(false);
  const { open, onClose, singleList } = props;
  const { userTrue, setTrueUser, clear} = useContext(AppContext);
  const user = checkTrueUser({ userTrue });
  const classes = useStyles();

//TODO: delete a single music
  const handleDelete = async (music_info, index) => {
    
    singleList.musiclist.splice(index,1)
    const userDeleteList = await deleteSingleMusic(music_info);
    console.log(userDeleteList);
    clear();
    setTrueUser(userDeleteList);
  };

  const handleClose = () => {
    onClose();
  };
// when click the single music to play music
  const handleListItemClick = (music_info, flag) => {
    if(flag==="spotify"){
      spotifyRowClick(music_info)
    }else if(flag==="netcloud"){
      // send song id to play, when the row was clicked
      netCloudRowClick(music_info);
      console.log(music_info);
    }
    // close the dialog
    handleClose();
  };
// open the delete music dialog
  const handleMLdeleteOpen = () => {
    setOpenD(true);
  };
  // close the delete music dialog
  const handleMLdeleteClose = () => {
    setOpenD(false);
  };

  // there to delete the music list and restore the user info
  const handleMLdelete = async () => {
    //Do something to delete MusicList
    const newUserDeleteList = await deleteMusicList(singleList._id);
    clear();
    setTrueUser(newUserDeleteList);
    // close the delete dialog when delete the musiclist
    handleMLdeleteClose();
    // close the outside dialog when delete the musiclist
    handleClose();
};

  MListDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };
  const DialogDelete = () => {
    return (
      <div>
        <Dialog open={openD} onClose={handleMLdeleteClose}>
          <DialogTitle>Warning</DialogTitle>
          <DialogContent>Are you sure you want to delete MusicList {!!singleList && singleList.name}?</DialogContent>
          <DialogActions>
          <Button onClick={handleMLdeleteClose} color="primary">
            No
          </Button>
          <Button onClick={handleMLdelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
        </Dialog>
      </div>
    );
  };

  const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onDelete, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onDelete ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onDelete}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});


  return (
    (
      <>
        
        <Dialog
          fullWidth={"sm"}
          onClose={handleClose}
          aria-labelledby="MList-dialog-title"
          open={open}
        >
          {/* <DialogTitle id="MList-dialog-title"></DialogTitle> */}
          <DialogTitle  align = "center" id="Mlist-dialog-title" onDelete={handleClose}>
            {!!user&&!!singleList ? singleList.name : ""}
          </DialogTitle>
          <DialogDelete open={openD} onClose={handleMLdeleteClose} />
          <DialogContent dividers>
            <List>
              {(!!singleList&&!!singleList.musiclist) && singleList.musiclist.map((Music, index) => (
                <ListItem key={index}>
                  <Grid xs={11}>
                    <div className={classes.musicItem_root} >
                      <div className={classes.musicItem_div} >
                          <img className={classes.musicItem_img}  alt = '' src={Music.source==="spotify"?"/images/Spotify_Icon_RGB_Green.png":"/images/neteasecloudmusic.png"} />
                      </div>
                      <Button onClick={() => handleListItemClick(Music, Music.source)}>
                        {Music.music_name}
                      </Button>
                      <Typography style={{fontSize:'0.5em'}} >
                        {Music.artist}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid xs={1} align="right">
                    <IconButton autoFocus aria-label="delete">
                      <DeleteIcon onClick={() => handleDelete(Music, index)} />
                    </IconButton>
                  </Grid>
                </ListItem>
                
              ))}
            </List>
          </DialogContent>
          
          {/* <DialogContent dividers>
          <ListItem
            autoFocus
            button
            onClick={() => handleListItemClick("addMusic")}
          >
            <ListItemText  align = "center" primary="Add Music" />
          </ListItem>
          </DialogContent> */}
          <DialogContent dividers>
          <ListItem
            
            autoFocus
            button
            onClick={() => handleMLdeleteOpen(singleList)}
          >
            <ListItemText align = "center" primary="Delete Music List" />
          </ListItem>
          </DialogContent>
        </Dialog>
        
      </>
    )
  );
}
