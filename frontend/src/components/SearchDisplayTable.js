import React, { useState } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PlayCircleOutlineOutlined from '@material-ui/icons/PlayCircleOutlineOutlined';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import {spotifyRowClick} from '../utils/play';
import { netCloudRowClick } from "../utils/play";
import { formatDuration } from "../utils/format";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { AppContext } from "../AppContextProvider";
import { useContext } from "react";
import checkTrueUser from "../utils/checkTrueUser";
import {updateMusicList} from '../utils/useCrudMusicList';
import Icon from './Icon';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
    textAlign:'center',

  },
  a_tag:{
    backgroundColor:'#4dd0e1',
    color:"white",
    textDecorationLine:'none',
    '&:hover':{
        backgroundColor:'#26c6da'
    }
  },
  display:{
    width:"100%",
    display:"flex",
    flexDirection: "row",
    justifyContent:"space-around",
    alignItems:"center"
  },
  play_icon:{
      width:"60px",
      backgroundColor:"#00acc1",
      border:"1px solid blue ",
      borderRadius:"2px",
      cursor:"pointer",
      zIndex:3,
      '&:hover':{
        backgroundColor:'#00897b'
    }
  }
});

let initialPosition = {
  X:"0",
  Y:"0"
}

function Row(props) {
  // row: the music info which is clicked by user, flag : the music scource where it come from? spotify? netneasy? user?
  const { row, flag } = props;
  // to open the sidebar user musiclist
  const [open, setOpen] = useState(false);
  // the each row style
  const classes = useRowStyles();
  // menuState is for user add the music to their own list when they click the add button.
  const [menuState, setMenuState] = useState(false);
  // the user info, when then user add music or delete the music, we need to update the user info
  const { userTrue, setTrueUser, clear} = useContext(AppContext);
  const user = checkTrueUser({ userTrue });
  // the add list potion
  const [position, setPosition] = useState(initialPosition);


  function handlePlayMusic(flag, music_info){
  
      if(flag==="spotify"){
        spotifyRowClick(music_info)
      }else if(flag==="netcloud"||flag==="neteasy"){
        // send song id to play, when the row was clicked
        netCloudRowClick(music_info);
      } else if(flag==="userlist"){
        if(music_info.source==="spotify"){
          spotifyRowClick(music_info)
        }else{
          netCloudRowClick(music_info);
        }
      }
  }
  // click add playlist button
  function launchPlayList(e){
    setMenuState(true);
    setPosition({
      X:e.clientX,
      Y:e.clientY
    });
  }

  const handleClose = () => {
    setMenuState(false);
  };
// the add music logic
  const handleAddMusic = async (currentMusicList) => {
    //add to current click Musiclist
    let music = {};
    if(flag==="spotify"||flag==="netcloud"||flag==="neteasy"){
       music = {
        "song_id": row.song_id,
        "music_name": row.title,
        "artist": row.artist,
        "full_url": flag==="spotify"?row.full_url:"",
        "source": flag==="neteasy"?"netcloud":flag,
        "currentlist_id": currentMusicList._id,
      }
    }else if(flag==="userlist"){
      music = {
        "song_id": row.song_id,
        "music_name": row.title,
        "artist": row.artist,
        "full_url": row.source==="spotify"?row.full_url:"",
        "source": row.source,
        "currentlist_id": currentMusicList._id,
      }
    }

    currentMusicList.musiclist.push(music);
    handleClose();
    const userUpdateList = await updateMusicList(currentMusicList);
    clear();
    setTrueUser(userUpdateList);

  };
   

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center" width="200px">
        <div className={classes.display}>
            {flag==="userlist"?(row.source==="spotify"?<Icon imageUrl="/images/Spotify_Icon_RGB_Green.png"/> : <Icon imageUrl="/images/neteasecloudmusic.png"/>):""}
            {row.title.length>21? row.title.substr(0,22) + "..." : row.title}
            {/* ToDo: play music
            <PlayCircleOutlineOutlined variant='span' className={classes.play_icon} onClick={()=>handlePlayMusic(flag,row)}/> */}
        </div>    
        </TableCell>
        <TableCell align="center">
          {/* ToDo: play music */}
          <PlayCircleOutlineOutlined variant='span' className={classes.play_icon} onClick={()=>handlePlayMusic(flag,row)}/>
        </TableCell>
        <TableCell align="center" width="150px">
            {row.artist.length>9 ? row.artist.substr(0,10)+"..." : row.artist}
            </TableCell>
        <TableCell align="center" >
            {/* ToDo: add playlist function */}
            <PlaylistAddIcon className={classes.play_icon} onClick={e=>launchPlayList(e)}/>
        </TableCell>
       
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Description:
              </Typography>
              <Table size="small" aria-label="display">
            {flag==="spotify"? 
            <TableBody>
                <TableRow>
                    <TableCell>
                        <img src={row.image.url}  alt = ''/>
                    </TableCell>
                    <TableCell>
                        <div>Title:</div>
                        <div>{row.title}</div>
                    </TableCell>
                    <TableCell>
                        <div>Artist:</div>
                        <div>{row.artist}</div>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{cursor:"pointer"}}>
                    <a href={row.full_url} target="_blank" className={classes.a_tag}> Linsen full music in Spotify</a>
                    </TableCell>
                    <TableCell >
                        <a href={row.profile} target="_blank" className={classes.a_tag}> {row.artist}'s profile in Spotify</a>
                    </TableCell>
                </TableRow>
            </TableBody>
            
            : (
              flag === "netcloud"?
              <TableBody>
              <TableRow>
                  <TableCell>
                      <div>Title:</div>
                      <div>{row.title}</div>
                  </TableCell>
                  <TableCell>
                      <div>Artist:</div>
                      <div>{row.artist}</div>
                  </TableCell>
                  <TableCell>
                      <div>Duration:</div>
                      <div>{row.duration_display}</div>
                  </TableCell>
              </TableRow>
          </TableBody>
          :
          (
            flag === "neteasy" ? 
          <TableBody>
            <TableRow>
                <TableCell>
                    <img src={row.image} alt = '' width="60px" />
                </TableCell>
                <TableCell>
                    <div>Title:</div>
                    <div>{row.title}</div>
                </TableCell>
                <TableCell>
                    <div>Artist:</div>
                    <div>{row.artist}</div>
                </TableCell>
                <TableCell>
                  <div>Duration:</div>
                  <div>{row.duration_display}</div>
              </TableCell>
            </TableRow>
        </TableBody>
          :(
            flag === "userlist"?
            <TableBody>
                <TableRow>
                    <TableCell>
                        <div>Title:</div>
                        <div>{row.title}</div>
                    </TableCell>
                    <TableCell>
                        <div>Artist:</div>
                        <div>{row.artist}</div>
                    </TableCell>
                </TableRow>
                <TableRow>
                  {
                    !!row.full_url &&
                    <TableCell style={{cursor:"pointer"}}>
                    <a href={row.full_url} target="_blank" className={classes.a_tag}> Linsen full music in Spotify</a>
                    </TableCell>
                  }
                </TableRow>
            </TableBody>
          : ""
          )))}
                
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <Menu
        keepMounted
        open={menuState}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          position.Y !== null && position.X !== null
            ? { top: position.Y, left: position.X }
            : undefined
        }
      >
        <MenuItem>Add to:</MenuItem>
        <Divider />

        {!!user.listenList && user.listenList.map((item, index) => (
              <MenuItem
                onClick={() => handleAddMusic(item)}
                button
                key={item.name}
              >
                <ListItemIcon>
                  <Avatar src={item.image} />
                </ListItemIcon>
                {user.listenList[index].name}
              </MenuItem>
            ))
          }
      </Menu>

    </React.Fragment>
  );

}

export default function CollapsibleTable({songlist, flag}) {

    let spotifyList = [];
    let netcloudList = [];
    let neteastlistFromPlaylist = [];
    let userlistFromMainPage = [];
    if(flag==="spotify"){
        spotifyList  = songlist.map((item)=>{
            return {
                song_id: item.id,
                title: item.name,
                album: item.album_type,
                artist: item.artists[0].name,
                profile: item.artists[0].external_urls.spotify,
                full_url: item.external_urls.spotify,
                image: item.images[2]
            }
        });
    }else if(flag==="netcloud"){
        netcloudList = songlist.map((item, index) => {
            return {
              id: index,
              song_id: item.id,
              title: item.name,
              mv_id: item.mvid,
              artist: item.artists[0].name,
              album: item.album.name,
              duration_display: formatDuration(item.duration),
              duration: item.duration,
            };
          });
    } else if(flag==="neteasy"){
      neteastlistFromPlaylist = songlist.map((item)=>{
        return {
          song_id: item.id,
          title: item.name,
          image:item.al.picUrl,
          mv_id: item.mv,
          artist:item.ar[0].name,
          duration_display:formatDuration(item.dt),
        }
      })
    } else if(flag==="userlist"){
      userlistFromMainPage = songlist.map((item)=>{
        return {
          song_id:item.song_id,
          title:item.music_name,
          artist: item.artist,
          source: item.source,
          full_url: item.full_url
        }
      })
    }


  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center">Title</TableCell>
            <TableCell align="center"> </TableCell>
            <TableCell align="center">Artist</TableCell>
            <TableCell align="center">Add to playList</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flag==="spotify" ? spotifyList.map((row, index) => (
            <Row key={index} row={row} flag={flag} />
          )) :(
            flag==="netcloud"?netcloudList.map((row, index)=>(<Row key={index} row={row} flag={flag} />))
            :(
              flag==="neteasy"?neteastlistFromPlaylist.map((row, index)=>(<Row key={index} row={row} flag={flag} />))
            : (
              flag==="userlist"?userlistFromMainPage.map((row, index)=>(<Row key={index} row={row} flag={flag} />))
            : ""
            ))) }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

