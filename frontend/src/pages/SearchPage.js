import { useEffect, useState } from "react";
import { useParams } from "react-router";
import SwipeableViews from "react-swipeable-views";
import {
  AppBar,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  useTheme,
} from "@material-ui/core";
import TabPanel from "../components/TabPanel";
import { getSearch } from "../api/getSearch";
import { SongList, PlayList, MvList } from "../components/searchPageEachList";
import Pagination from "@material-ui/lab/Pagination";
import { getSpotifyAPIToken, searchSpotifyAPI } from "../api/spotifyAPI";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // overflow: "scroll",
  },
  paper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing(2),
    backgroundColor: "#70d9e7",
    marginTop: theme.spacing(1),
    borderRadius: 5,
  },
  pagin_grid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    overflow: "scroll",
  },
}));

export default function SearchPage() {
  const styles = useStyles();
  const theme = useTheme();

  const { keyword } = useParams();
  const [type, setType] = useState("1");
  const [limit_item, setLimit_item] = useState(15);
  const [page, setPage] = useState(1);
  const [total_item, setTotal_item] = useState(0);
  const [songList, setSongList] = useState([]);
  const [playList, setPlayList] = useState([]);
  const [mvList, setMvList] = useState([]);

  // spotify
  const [spotifySongList, setSpotifySongList] = useState([]);

  const [tabValue, setTabValue] = useState(0);

  // use useEffect hook to handle multiple refresh issuses.
  useEffect(() => {
    // spotify
    async function spotify() {
      const token = await getSpotifyAPIToken();
      const response_search_spotify = await searchSpotifyAPI({
        token,
        keyword,
        limit: limit_item,
        offset: (page - 1) * limit_item,
      });
      setSpotifySongList(response_search_spotify);
    }
    spotify();
    // netcloud get the music info from netease api
    async function getSearchData() {
      const response = await getSearch({
        keywords: keyword,
        type,
        limit: limit_item,
        offset: (page - 1) * limit_item,
      });
      if (response.data.code === 200) {
        if (
          response.data.result.songCount > 0 ||
          type === "1000" ||
          type === "1004"
        ) {
          switch (type) {
            case "1":
              setSongList(response.data.result.songs);
              setTotal_item(response.data.result.songCount);
              break;
            case "1000":
              setPlayList(response.data.result.playlists);
              setTotal_item(response.data.result.playlistCount);
              break;
            case "1004":
              setMvList(response.data.result && response.data.result.mvs);
              setTotal_item(response.data.result.mvCount);
              break;
            default:
              break;
          }
        } else {
          alert(`No result match '${keyword}', please try again!`);
        }
      }
    }
    getSearchData();
  }, [type, keyword, page, limit_item]);

  function handleTabChange(e, newValue) {
    switch (newValue) {
      case 0:
        setType("1");
        break;
      case 1:
        setType("1000");
        break;
      case 2:
        setType("1004");
        break;
      default:
        setType("1");
    }
    setPage(1);
    newValue === 2 ? setLimit_item(12) : setLimit_item(16);
    setTabValue(newValue);
  }

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  function handleChangeIndex(index) {
    setTabValue(index);
  }
  const handleOnChange = (e, page) => {
    setPage(page);
  };

  return (
    <div className={styles.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <AppBar position="static" color="default">
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Songs" {...a11yProps(0)} />
              <Tab label="Public MusicList" {...a11yProps(1)} />
              <Tab label="MV" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={tabValue}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={tabValue} index={0} dir={theme.direction}>
              {(!!songList || !!spotifySongList) && (
                <SongList
                  songList={songList}
                  spotifySongList={spotifySongList}
                />
              )}
            </TabPanel>
            <TabPanel value={tabValue} index={1} dir={theme.direction}>
              {/* TODO  to achieve the music list function */}
              {!!playList && <PlayList playList={playList} />}
            </TabPanel>
            <TabPanel
              value={tabValue}
              index={2}
              dir={theme.direction}
              className={styles.container}
            >
              {!!mvList && <MvList mvList={mvList} />}
            </TabPanel>
          </SwipeableViews>
        </Grid>
        <Grid item xs={12} className={styles.pagin_grid}>
          <Pagination
            color="secondary"
            page={page}
            onChange={handleOnChange}
            count={Math.round(total_item / limit_item)}
          />
        </Grid>
      </Grid>
    </div>
  );
}
