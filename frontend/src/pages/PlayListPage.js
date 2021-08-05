import { Button, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import {getPlaylistDetail} from '../api/explore';
import {getSingleSongUrl} from '../api/explore';
import CollapsibleTable from '../components/SearchDisplayTable';
import {getSpotifyAPIToken, getSingleSpotifySongUrl} from '../api/spotifyAPI';
import {playWholeMusicListToRM} from '../utils/play';
import {getSinglePublishedList} from '../utils/useCrudMusicList';


const useStyles = makeStyles((theme)=>({
    info_root:{
        paddingTop:"50px",
        paddingLeft:"100px",
        overflow: "scroll",
    },
    info_text:{
        paddingTop:"30px",
    },
    img_div_root:{
        width:"15vw",
    },
    img:{
        width:'100%',
    },
    user_info_root:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
    },
    user_img_div:{
        width:"50px",
        height:"50px",
        borderRadius:"50%",
        border:"1px solid black",
        marginRight:"20px",
    },
    user_icon:{
        width:"100%",
        borderRadius:"50%",
    },
    container:{
        overflow: "scroll"
    }
}))



export default function PlayListPage(){

    const classes = useStyles();
    const {id, type} = useParams();
    const [musicData, setMusicData] = useState([]);
    const [title, setTitle] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [coverImgUrl, setCoverImgUrl] = useState('');
    const [signature, setSignature] = useState('');
    const [username, setUsername] = useState('');
  
    useEffect(()=>{
        async function callMusiclist(){
            if(type==="neteasy"){
                await getPlaylistDataFromNetEasy();
            }else if(type==="userlist"){
                await getUserPublishListFromDB();
            }
        }
        callMusiclist();   
    },[type])
    


    async function getUserPublishListFromDB(){
        const res = await getSinglePublishedList(id);
        setMusicData(res.musiclist);
        setTitle(res.name);
        setAvatarUrl(res.owner.icon);
        setCoverImgUrl(res.image);
        setSignature(res.describtion);
        setUsername(res.owner.username);
    }


    async function getPlaylistDataFromNetEasy(){
        const res = await getPlaylistDetail({id});
        if(res.data.code===200){
            setMusicData(res.data.playlist.tracks);
            setTitle(res.data.playlist.name);
            setAvatarUrl(res.data.playlist.creator.avatarUrl);
            setCoverImgUrl(res.data.playlist.coverImgUrl);
            setSignature(res.data.playlist.creator.signature);
            setUsername(res.data.playlist.creator.nickname);
        }
    }
    
    
// get source url from net easy api by song id
    async function getNetEasyCurrentListSongUrl(id){
        const response = await getSingleSongUrl({id});
        if(response.data.code ===200){
            return response.data.data[0].url
        }
        return ""
    }
// get source url from spotify api by song id
    async function getSpotifyCurrentListSongUrl(id){
        const token = await getSpotifyAPIToken();
        const response = await getSingleSpotifySongUrl({token, id});
        if(!!response){
            return response.tracks.items[0].preview_url;
        }
        return ""
    }
    // when user click play the whole list it will send the whole list musics info to here,
    // we need to judge where the list music come from then to fetch the music source
   async function playWholeList(){
        const music_list_info = [];
        if(type==="neteasy"){
            for (let item of musicData){
                const url = await getNetEasyCurrentListSongUrl(item.id);
                if(!!url){
                    music_list_info.push({
                        name:item.name,
                        musicSrc: url ,
                        cover: item.al.picUrl,
                        singer:item.ar[0].name
                    })
                } 
            }
        }else if(type==="userlist"){
            console.log(musicData)

            for (let item of musicData){
                let url = "";
                if(item.source==="netcloud"||item.source==="neteasy"){
                    url = await getNetEasyCurrentListSongUrl(item.song_id);
                }else if(item.source==="spotify"){
                    url = await getSpotifyCurrentListSongUrl(item.song_id)
                }
                if(!!url){
                    music_list_info.push({
                        name:item.music_name,
                        musicSrc: url ,
                        cover: "/images/default.png",
                        singer:item.artist
                    })
                } 
            }
        }
        console.log(music_list_info)
        playWholeMusicListToRM(music_list_info);
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid container className={classes.info_root}>
                    <Grid item xs={4}>
                        <div className={classes.img_div_root}>
                            <img className={classes.img} src={coverImgUrl} alt=""/>
                        </div>
                    </Grid>
                    <Grid item xs={5} className={classes.info_text}>
                         <h4>MusicList: {title}</h4> 
                         <div className={classes.user_info_root}>
                                <div className={classes.user_img_div}>
                                     <img className={classes.user_icon} src={avatarUrl} alt=""/>
                                </div>
                                <div>
                                    {username}
                                </div>
                         </div>
                         <h4>Description:</h4>
                         <p>{signature}</p>
                    </Grid>
                    <Grid item xs={3} >
                        <Button onClick={()=>playWholeList()} color="primary" variant="contained">
                            Play the list
                        </Button>
                    </Grid>
                </Grid>
                <Grid container className = {classes.container}>
                    <CollapsibleTable songlist={musicData} flag={type} />
                </Grid>
            </Grid>
        </>
    )
}