import { Grid, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getShuffedPublishList } from "../utils/useCrudMusicList";
import { getNetEasyRecommendlist } from "../api/explore";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";

import { useHistory } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  root: {
    // padding: 10,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
  },
  gridList: {
    maxWidth: "100%",
    // // width: 700,
    height: "90vh",
    overflow: "hidden",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  card_root: {
    maxWidth: "100%",
    height: 200,
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.01, 1.01)",
    },
  },
  card_action: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card_media: {
    width: 120,
    height: 120,
  },
}));

function MainMusic() {
  const classes = useStyle();
//   store the recommend user list info
  const [userRecommendList, setUserRecommendList] = useState([]);
//   store the neteasy recommend list info
  const [netEasyRecommendList, setNetRecommendList] = useState([]);
  const history = useHistory();

//   each time load in this page to update the recommend list info 
  useEffect(() => {
    async function getRecommendList() {
      const res_user = await getShuffedPublishList();
      setUserRecommendList(res_user);

      const res_net = await getNetEasyRecommendlist();
      if (res_net.data.code === 200) {
        const limitedlist = [];
        const result = res_net.data.result;
        const shuffedlist = result
          .map((a) => ({ sort: Math.random(), value: a }))
          .sort((a, b) => a.sort - b.sort)
          .map((a) => a.value);
        for (let item of shuffedlist) {
          if (limitedlist.length < 4) {
            limitedlist.push(item);
          }
        }
        setNetRecommendList(limitedlist);
      }
    }
    getRecommendList();
  }, []);

  function userGoToPlayList(_id) {
    history.push(`/pages/playlist/${_id}/${"userlist"}`);
  }

  function netGoToPlayList(id) {
    history.push(`/pages/playlist/${id}/${"neteasy"}`);
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={6}>
        <Grid item xs="6">
          <GridList p={1} cellHeight={300} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
              <ListSubheader component="div" style={{ fontSize: "large" }}>
                Recommend User Music List:
              </ListSubheader>
            </GridListTile>
            {userRecommendList.map((item, index) => (
              <GridListTile
                className={classes.card_root}
                onClick={() => userGoToPlayList(item._id)}
                key={index}
              >
                <img src={item.image} alt = ''/>
                <GridListTileBar
                  title={item.name}
                  subtitle={<span>by: {item.owner.username}</span>}
                />
              </GridListTile>
            ))}
          </GridList>
        </Grid>
        <Grid item xs="6">
          <GridList cellHeight={300} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
              <ListSubheader component="div" style={{ fontSize: "large" }}>
                Recommend NetEase Music List:
              </ListSubheader>
            </GridListTile>
            {netEasyRecommendList.map((item, index) => (
              <GridListTile
                onClick={() => netGoToPlayList(item.id)}
                className={classes.card_root}
                key={index}
              >
                <img src={item.picUrl} alt = ''/>
                <GridListTileBar title={item.name} />
              </GridListTile>
            ))}
          </GridList>
        </Grid>
      </Grid>
    </div>
  );
}

export default MainMusic;
