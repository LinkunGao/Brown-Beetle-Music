import { useEffect, useState } from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {getCurrentMvUrlById, getSimiMvUrl, getMvDetail, getArtistInfo} from '../api/explore';
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, makeStyles, Typography} from '@material-ui/core';
import {formatCount,formatDuration} from '../utils/format';
import Plyr from 'plyr-react'
import 'plyr-react/dist/plyr.css'



const useStyles = makeStyles((theme)=>({
    root:{
        padding:30,
        display:"flex",
        flexDirection:'row',
    },
    video_title:{

    },
    video_div:{
        width:"100%"
    },
    video:{
        width:"100%"
    },
    mv_info_root:{

    },
    singer_info_root:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
    },
    singer_info_img_div:{
        marginRight:5,
        width:"60px",
        borderRadius:"50%",
    },
    singer_info_img:{
        width:"100%",
        borderRadius:"50%",
    },
    mv_info_div:{

    },
    mvslist:{
        display:"flex",
        flexDirection:"column",
    },
    card_root:{
        maxWidth: '100%',
    },
    card_media:{
        height: 80,
    }
}));

export default function MvPage(){
    const {id, type} = useParams();
    const classes = useStyles();
    const history = useHistory();
    
    const [mvUrl, setMvUrl] = useState('');
    const [similarMv, setSimilarMv] = useState([]);
    const [mvInfo, setMvInfo] = useState({});
    const [artistInfo, setArtistInfo] = useState({});

   
    const videoSrc = {
        type: "video",
        sources: [
          {
            src: mvUrl,
            // provider: "youtube"
          }
        ]
      };


     

    useEffect(()=>{
        async function getAllData(){
            await getMvUrl();
            await getSimilarMvUrlByMvId();
            await getMvDetailData();
        }
        getAllData();
        // buffer_myvideo();
    },[id, type])

    async function getMvUrl(){
        const res = await getCurrentMvUrlById({id});
        if(res.data.code===200){
            setMvUrl(res.data.data.url);
        }
    }
    
    async function getSimilarMvUrlByMvId(){
        const res = await getSimiMvUrl({id});
        if(res.data.code===200){
            setSimilarMv(res.data.mvs);
        }
    }

    async function getMvDetailData(){
        const res = await getMvDetail({id});
        if (res.data.code === 200) {
            setMvInfo({
                mvName: res.data.data.name,
                playCount: res.data.data.playCount,
                publishTime: res.data.data.publishTime,
                desc: res.data.data.desc,
            });
            await getArtistInfoData(res.data.data.artistId);
        }  
    }

    async function getArtistInfoData(artistId){
        const res = await getArtistInfo({artistId});
        if (res.data.code === 200) {
            setArtistInfo({
              artistName: res.data.artist.name,
              artistCover: res.data.artist.picUrl,
            });
          }
    }

    function reloadNewMv(id){
        history.push(`/pages/mv/${id}/${"neteasy"}`);
        window.location.reload();
    }

    // function buffer_myvideo(){
    //     const video = document.querySelector('#my_video');

    //     if(!!video){
    //         video.addEventListener('loadedmetadata', function() {
    //             if (video.buffered.length === 0) return;
            
    //             const bufferedSeconds = video.buffered.end(0) - video.buffered.start(0);
    //             console.log(`${bufferedSeconds} seconds of video are ready to play.`);
    //           });
    //     }else{
    //         console.log("no")
    //     }
        
    // }
    
    
    function renderMvPlayer(){
        return(
            <div>
                <h3 className={classes.video_title}>
                    {type==="neteasy"?<img width='20' src='/images/neteasecloudmusic.png' alt = '' />:''}
                    <span style={{marginLeft:20}}>MV Detail:</span>
                </h3>
                <div className={classes.video_div}>
                    {/* <video id="my_video" autoPlay preload="auto" controls src={mvUrl} className={classes.video} controls></video> */}

                    {/* <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' width="100%"/> */}
                    <Plyr preload="auto" source={videoSrc}/>
                </div>
            </div>
        );
    }

    function renderMvDetail(){
        return (
            <div className={classes.mv_info_root}>
                <div className={classes.singer_info_root}>
                    <div className={classes.singer_info_img_div}>
                        <img className={classes.singer_info_img} src={artistInfo.artistCover} alt=""/>
                    </div>
                    <div>{artistInfo.artistName}</div>
                </div>
                <div className={classes.mv_info_div}>
                    <h2>{mvInfo.mvName}</h2>
                    <span >Publish time: {mvInfo.publishTime}</span>
                    <span style={{marginLeft:10}}>Watch: {formatCount(mvInfo.playCount)}</span>
                    <p>{mvInfo.desc}</p>
                </div>
            </div>
          );
    }

    function renderSimilarMvList(){
        return(
            <Grid className={classes.mvslist} container spacing={1} >
                <Grid item>
                <h3>Similar Recommend:</h3>
                </Grid>
                    {
                        similarMv.map((item, index)=>(
                            <Grid key={index} item>
                                <Card className={classes.card_root}>
                                    <CardActionArea onClick={()=>reloadNewMv(item.id)}>
                                        <CardMedia className={classes.card_media} image={item.cover} />
                                        <CardContent>
                                            <Typography variant="body1" color="textPrimary" component="p">
                                                {item.name}
                                                <span style={{marginLeft:5}}>
                                                    {item.artistName}
                                                </span> 
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Duration: {formatDuration(item.duration)}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={()=>reloadNewMv(item.id)}>
                                            Watch MV
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    }
            </Grid>
        );
    }

    return(
        <Grid container spacing={2} className={classes.root} >
            <Grid item xs={8}>
                <Grid container spacing={2}>
                    <Grid item >
                        {renderMvPlayer()}
                    </Grid>
                    <Grid item>
                        {renderMvDetail()}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4}>
                {renderSimilarMvList()}
            </Grid>
        </Grid>
    )
}