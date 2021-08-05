import axios from "axios";

const spotify = {
  ClientId: "059ad76bbaf44fb2a737ac62e14c5125",
  ClientSecret: "eab6b45570f8414799a852886f5a079c",
};

export async function getSpotifyAPIToken() {
  // axios('https://accounts.spotify.com/api/token', {
  //     headers:{

  //         'Content-Type' : 'application/x-www-form-urlencoded',

  //         'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' +spotify.ClientSecret)
  //       },
  //       data: 'grant_type=client_credentials',
  //       method: 'POST',
  // }).then(tokenResponse=>{
  //     console.log(tokenResponse.data.access_token)
  //     return tokenResponse.data.access_token
  // });
  const tokenResponse = await axios("https://accounts.spotify.com/api/token", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",

      Authorization:
        "Basic " + btoa(spotify.ClientId + ":" + spotify.ClientSecret),
    },
    data: "grant_type=client_credentials",
    method: "POST",
  });
  return tokenResponse.data.access_token;
}

export async function searchSpotifyAPI({ token, keyword, limit, offset }) {
  console.log("hello search spotify");
  const searchResponse = await axios("https://api.spotify.com/v1/search", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    params: {
      query: keyword,
      type: "album,artist",
      market: "US",
      limit,
      offset,
    },
  });
  return searchResponse.data.albums.items;
}

export async function getSingleSpotifySongUrl({ token, id }) {
  const singleMusicResponse = await axios(
    `https://api.spotify.com/v1/albums/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params: {
        market: "US",
      },
    }
  );
  return singleMusicResponse.data;
}
