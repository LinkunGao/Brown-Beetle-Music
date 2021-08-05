import * as React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { formatDuration } from "../utils/format";
import styles from "../css/Search.module.css";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import { formatCount } from "../utils/format";
import "react-jinke-music-player/assets/index.css";
import CollapsibleTable from './SearchDisplayTable';
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root_pl: {
    flexGrow: 1,
    
  },
  card_root_pl: {
    maxWidth: 345,
    maxHeight: 250,
  },
  card_media_pl: {
    height: 200,
  },

  root_mv: {
    flexGrow: 1,
  },
  card_root_mv: {
    maxWidth: 450,
    maxHeight: 300,
  },
  card_media_mv: {
    height: 250,
  },

  name_mv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  company_icon_root:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
  },
  company_icon:{
    width:"30px",
    height:"30px",
    marginRight:"8px",
  },
  icon:{
    width:"100%",
  },
  container :{
    overflow:'scroll'
  },
}));

function SongList({ songList, spotifySongList }) {
  const mystyles = useStyles();

  return (
      <Grid container spacing={2} className={styles.search_root} >
        <Grid item xs={6} className={styles.search_data}>
          <Typography variant="h5" component="h5" >
            <div className={mystyles.company_icon_root}>
              <div className={mystyles.company_icon} >
                <img src="/images/neteasecloudmusic.png" alt = '' className={mystyles.icon}/>
              </div>
              <div>NetEase Cloud Music:</div>
            </div>
            </Typography>
        <CollapsibleTable songlist={songList} flag={"netcloud"}/>
        </Grid>
        <Grid item xs={6}>
        <Typography variant="h5" component="h5" >
            <div className={mystyles.company_icon_root}>
              <div className={mystyles.company_icon} >
                <img src="/images/Spotify_Icon_RGB_Green.png" alt = '' className={mystyles.icon}/>
              </div>
              <div>Spotify Music:</div>
            </div>
          </Typography>
        <CollapsibleTable songlist={spotifySongList} flag={"spotify"} />
        </Grid>
      </Grid>

  );
}
// this function is in oder to send neteasy play list id which is selected by user to playlist page
function PlayList({ playList }) {
  // TODO: to display the music list page
  const classes = useStyles();
  const history = useHistory();

  // TODO: let the id to render playlist page
  function handleCardClick(id) {
    history.push(`/pages/playlist/${id}/${"neteasy"}`);
  }

  return (
    <div className={classes.root_pl}>
      <Grid container spacing={3}>
        {playList.map((item) => {
          return (
            <Grid item xs={3} key={item.id} className={styles.control_hover}>
              <Card
                className={classes.card_root_pl}
                onClick={() => handleCardClick(item.id)}
              >
                <CardActionArea>
                  <div>
                    <div className={styles.num_wrap}>
                      numbers of play:
                      <span className="num">{formatCount(item.playCount)}</span>
                    </div>
                    <CardMedia
                      className={classes.card_media_pl}
                      image={item.coverImgUrl}
                    />
                  </div>
                </CardActionArea>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.name.length > 15
                    ? item.name.substr(0, 16) + "..."
                    : item.name}
                </Typography>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

// this function is to send the neteasy mv id to mv page
function MvList({ mvList }) {
  const classes = useStyles();
  const history = useHistory();
  // TODO: let the id to render MV page
  function handleMvCardClick(id) {
    console.log(id)
    history.push(`/pages/mv/${id}/${"neteasy"}`);
  }

  return (
    <div className={classes.root_mv}>
      <Grid container spacing={3}>
        {/* list all mv list */}
        {mvList.map((item) => {
          return (
            <Grid item xs={4} key={item.id} className={styles.control_hover}>
              <Card
                className={classes.card_root_mv}
                onClick={() => handleMvCardClick(item.id)}
              >
                <CardActionArea>
                  <div>
                    <div className={styles.num_wrap}>
                      numbers of play:
                      <span className="num">{formatCount(item.playCount)}</span>
                    </div>
                    <CardMedia
                      className={classes.card_media_mv}
                      image={item.cover}
                    />
                  </div>
                </CardActionArea>
                {/* TODO: if the name is too long, substr then show ... */}
                <Typography variant="body1" color="textPrimary" component="p">
                  {item.name.length > 15
                    ? item.name.substr(0, 16) + "..."
                    : item.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.name_mv}
                >
                  <span>{item.artistName}</span>
                  <span className="time">{formatDuration(item.duration)}</span>
                </Typography>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export { SongList, PlayList, MvList };
