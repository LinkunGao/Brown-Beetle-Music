import ReactJkMusicPlayer from 'react-jinke-music-player';
import {bus} from '../../utils/play';
import {useState} from 'react';
import {getSingleSongUrl} from '../../api/explore';
import {makeStyles} from '@material-ui/core';
import {getSpotifyAPIToken, getSingleSpotifySongUrl} from '../../api/spotifyAPI';

const useStyle = makeStyles((theme)=>({
    audio:{
      zIndex:100,
    },
  }))


export default function ReactMusicPlayer(){

    const styles = useStyle();
   
  // *******************ToDo: make a function to paly sigle music********************** //
  
  const [listSrc, setListSrc] = useState([]);

// when the music info source is come from neteasy 
 bus.once('playnetcloudMusic', async (music_info)=>{    
    const id = music_info.song_id;
    const response = await getSingleSongUrl({id});   
    //add music 
    if(response.data.code ===200){      
      if(!!music_info.title){       
        setListSrc ([{
          name: music_info.title,
          musicSrc: response.data.data[0].url,
          cover: "/images/default.png", 
          singer:music_info.artist,
          }])         
        
      }else{        
        setListSrc([{
          name: music_info.music_name,
          musicSrc: response.data.data[0].url,
          cover: "/images/default.png", 
          singer:music_info.artist,
          }])
      }
      
        }
        
  });
  //handle addmusic functions
  bus.once('playspotifyMusic', async (music_info)=>{
    const id = music_info.song_id;
    const token = await getSpotifyAPIToken();
    const response = await getSingleSpotifySongUrl({token, id});
    if(!!response){      
      setListSrc([{
        name: response.name,
        musicSrc: response.tracks.items[0].preview_url,
        cover: response.images[2].url,
        singer:music_info.artist,
        }])       
    }
  } )

  bus.once('playWholeListMusic', (music_list_info)=>{    
    setListSrc(music_list_info);
  })


// *******************************************************//

return (
    //jinkeplayer configs
    (!!listSrc)? 
    <ReactJkMusicPlayer
    className={styles.audio}
    audioLists={listSrc}
    defaultPosition={{bottom:0, left:0}}
    theme = 'light'  
    showThemeSwitch =  {false} 
    showDownload = {false}    
        />
    : <ReactJkMusicPlayer
    className={styles.audio}
    defaultPosition={{bottom:0, left:0}}
    
    />
);


}