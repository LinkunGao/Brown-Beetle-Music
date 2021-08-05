import axios from "axios";
import {useState, useEffect} from 'react';


export default function useGet(url) {
    const [data, setData] = useState('');

    useEffect(()=>{
        async function fetchData() {
            const response = await axios.get(url);
            setData(response.data);
        }
        fetchData();
    }, [url]);

    return {data};
}