import getRequest from '../utils/getRequest';

// get the single song url form neteasy
function getSingleSongUrl({id}){
    
    return getRequest({
        url: '/song/url',
        method: 'get',
        params: {id},
    })
}
// get the playlist from neteasy
const getPlaylistDetail = ({ id }) => {
    return getRequest({
      url: '/playlist/detail',
      method: 'get',
      params: {
        id,
      },
    })
  }
// get mv info
const getCurrentMvUrlById = ({id})=>{
    return getRequest({
        url: '/mv/url',
        method: 'get',
        params: {
          id,
        },
      })
}
// get the similar mv info
const getSimiMvUrl = ({ id }) => {
    return getRequest({
      url: '/simi/mv',
      method: 'get',
      params: {
        mvid:id,
      },
    })
  }
  // get the mv details
const getMvDetail = ({ id }) => {
    return getRequest({
      url: '/mv/detail',
      method: 'get',
      params: {
        mvid:id,
      },
    })
  }
  // get artiste info
const getArtistInfo = ({ artistId }) => {
    return getRequest({
      url: '/artists',
      method: 'get',
      params: {
        id: artistId,
      },
    })
  }
  // get the recommend music list from neteasy
const getNetEasyRecommendlist = ({ limit = 10 } = {}) => {
    return getRequest({
      url: '/personalized',
      method: 'get',
      params: {
        limit,
      },
    })
  }
export {
    getSingleSongUrl,
    getPlaylistDetail,
    getCurrentMvUrlById,
    getSimiMvUrl,
    getMvDetail,
    getArtistInfo,
    getNetEasyRecommendlist,
}