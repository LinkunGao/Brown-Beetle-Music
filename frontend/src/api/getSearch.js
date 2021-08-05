import getRequest from '../utils/getRequest';

export const getSearch = ({keywords, limit, offset, type})=>{
    return getRequest({
        url: '/search',
        method: 'get',
        params: {
          keywords,
          limit,
          offset,
          type,
        },
      });
} 