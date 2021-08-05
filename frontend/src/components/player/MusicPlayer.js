import {getSingleSongUrl} from '../../api/explore';
import {bus} from '../../utils/play';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core';
import AudioPlayer from 'material-ui-audio-player';
import { useEffect, useRef, useState } from 'react';

const muiTheme = createMuiTheme({});

const useStyles = makeStyles((theme) => {
    return {
      root: {
        [theme.breakpoints.down('sm')]: {
          width: '100%',
        },
      },
      loopIcon: {
        color: '#3f51b5',
        '&.selected': {
          color: '#0921a9',
        },
        '&:hover': {
          color: '#7986cb',
        },
        [theme.breakpoints.down('sm')]: {
          display: 'none',
        },
      },
      playIcon: {
        color: '#f50057',
        '&:hover': {
          color: '#ff4081',
        },
      },
      replayIcon: {
        color: '#e6e600',
      },
      pauseIcon: {
        color: '#0099ff',
      },
      volumeIcon: {
        color: 'rgba(0, 0, 0, 0.54)',
      },
      volumeSlider: {
        color: 'black',
      },
      progressTime: {
        color: 'rgba(0, 0, 0, 0.54)',
      },
      mainSlider: {
        color: '#3f51b5',
        '& .MuiSlider-rail': {
          color: '#7986cb',
        },
        '& .MuiSlider-track': {
          color: '#3f51b5',
        },
        '& .MuiSlider-thumb': {
          color: '#303f9f',
        },
      },
    };
  });

export default function MusicPlayer(){
   // *******************ToDo: make a function to paly sigle music********************** //
  const [url, setUrl] = useState('');
  const [currentSong, setCurrentSong] = useState(null);
  const audioRef = useRef(null);
  const [src, setSrc] = useState([]);
  useEffect(()=>(
    bus.on('playMusic', async (music_info)=>{
    const id = music_info.song_id;
    const response = await getSingleSongUrl({id});
    if(response.data.code ===200){
      console.log(response)
      setUrl(response.data.data[0].url);
      setCurrentSong(music_info);
    }}),
    bus.on('pauseMusic', ()=>{
      audioRef.current.pause();
    })

),[]);

useEffect(()=>(
    function handleEmptyUrl(){
        if(url!==null){
            setSrc([url, ...src])
        }
    }
), [url]);

console.log(currentSong);
console.log(url);
console.log(src)
// *******************************************************//
    return(
        <ThemeProvider theme={muiTheme}>
            {/* <AudioPlayer
                elevation={1}
                width="100%"
                useStyles={useStyles}
                variation="default"
                spacing={3}
                download={true}
                autoplay={true}
                order="standart"
                preload="auto"
                loop={true}
                src={url}
            /> */}
            <AudioPlayer
            elevation={1}
            width="100%"
            variation="default"
            spacing={3}
            download={true}
            autoplay={true}
            order="standart"
            preload="auto"
            loop={true}
            src={url}
        />
        </ThemeProvider>
    );
}