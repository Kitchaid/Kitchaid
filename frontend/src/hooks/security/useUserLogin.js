import { useMutation } from 'react-query';
import {axiosClient} from '../axiosInstance';

const postUserData = async (data) => {
    const res = await axiosClient.post('user/login', data).then(res => {
        return {
            Access_token: res.data?.token,
            user_info: res.data?.info,
            msg:res.data?.msg
        }
    });
    return res;
}
const postUserTrace = async () => {
    const res = await axiosClient.post('user/trace');
    return res;
}

export const useUserLogin = () => {
    return useMutation(postUserData);
}

export const useUserTrace = () => {
    return useMutation(postUserTrace);
}

export const getAllUser = async ()=> {
    return await axiosClient
    .get("user/getalluser")
    .catch((err) => console.log(err));
}

//fetch kitchen function content
export const getKitchenFunctionContentForClient = async () => {
    return await axiosClient
    .get(`admin/content_control`)
    .catch((err) => console.log(err));
  };
 