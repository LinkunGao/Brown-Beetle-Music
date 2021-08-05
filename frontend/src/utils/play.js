import { EventEmitter } from "events";

const bus = new EventEmitter();
//play music , connect with reactmusicplayers.js
function netCloudRowClick(music_info) {
  bus.emit("playnetcloudMusic", music_info);
}

function spotifyRowClick(music_info) {
  bus.emit("playspotifyMusic", music_info);
}
function playWholeMusicListToRM(music_list_info) {
  bus.emit("playWholeListMusic", music_list_info);
}

export { bus, netCloudRowClick, spotifyRowClick, playWholeMusicListToRM };
