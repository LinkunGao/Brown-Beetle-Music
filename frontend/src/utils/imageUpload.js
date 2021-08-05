import axios from 'axios';

async function imageUpload(image){

    const imgUploadComfig={
        headers:{
            'content-type': 'multipart/form-data'
        }
    };

    const imgFormData = new FormData();
    imgFormData.append('image', image);

    const imgUploadResponse = await axios.post('/api/image', imgFormData, imgUploadComfig);

    return imgUploadResponse;
}

export {
    imageUpload
}