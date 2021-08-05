import axios from 'axios';
import md5 from 'md5';
import { imageUpload } from './imageUpload';

const salt = "12345asdfg";

 async function login(username, password){
    const body = {
        a:username,
        b: md5(md5(password)+salt)
    }
    const response =  await axios.post('/api/login', body);
    return response.data;
} 

async function register(user_info, image){
    
    const imageUrlResponse = await imageUpload(image);
    const imageUrl = imageUrlResponse.headers['location'];

    user_info.icon = imageUrl;
    const body = {
        user:user_info,
        salt: salt
    }
    const response = await axios.post('/api/register', body);
    return response.data;
}


async function editProfile(user, image){
    if(image!==null){
        const imageUrlResponse = await imageUpload(image);
        const imageUrl = imageUrlResponse.headers['location'];
        user.icon = imageUrl;
    }
    const body = user;
  
    const response = await axios.put('/api/editprofile',body);
    console.log(response.data);
    return response.data;
    
}

async function deleteAccount(_id){
    const response =  await axios.delete(`/api/editprofile/${_id}`);

    return response.data;
                
}

export {
    login,
    register,
    editProfile,
    deleteAccount,
}