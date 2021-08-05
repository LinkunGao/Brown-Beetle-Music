import axios from 'axios';

const getRequest = axios.create({
    baseURL:'http://huangjiangjun.top:9000/',
    timeout:6000,
})

export default getRequest; 