import axios from 'axios';
import { imageUpload } from './imageUpload';

// this function is for create a individual music list
async function createMusicList(playlist, image){
    // git the playlist image url
    const imagePlayList = await imageUpload(image);
    const imageUrl = imagePlayList.headers['location'];

    // name, imageUrl, userID, list[]
    playlist.image = imageUrl;
    const body = playlist;

    const response = await axios.post('/api/playlist', body);
    return response.data;

}
// for update music list
async function updateMusicList(musiclist){
    const response = await axios.put(`/api/playlist/musiclist`, musiclist);

    return response.data;
}
// for delete music list
async function deleteMusicList(_id){
    const response = await axios.delete(`/api/playlist/musiclist/${_id}`);

    return response.data;
}
// for delete single music
async function deleteSingleMusic(singleMusic){
    const response = await axios.delete(`/api/playlist/songs`, {data:singleMusic});
    return response.data;
}
// for get shuffed recommend user music list
async function getShuffedPublishList(){
    const response = await axios.get('/api/playlist/shuffedlist');
    return response.data;
}
// for get a single user published music list
async function getSinglePublishedList(_id){
    const response = await axios.get(`/api/playlist/singlelist/${_id}`);
    return response.data;
}

export {
    createMusicList,
    deleteMusicList,
    updateMusicList,
    deleteSingleMusic,
    getShuffedPublishList,
    getSinglePublishedList,
}