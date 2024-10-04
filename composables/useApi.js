import axios from 'axios'


export const useApi = () => {
    const config = useRuntimeConfig()
    const baseURL = 'https://api.unsplash.com';

    const instance = axios.create({
        baseURL,
        headers: {
             Authorization: `Client-ID ${config.public.Access_Key}`
        },
    });
    return instance;
};