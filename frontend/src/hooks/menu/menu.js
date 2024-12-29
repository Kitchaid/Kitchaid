import "react-router-dom";
import {axiosClient} from '../axiosInstance';

//fetch menu admin
export const getMenuForAdmin = async (templateName) => {
  return await axiosClient.get(`user/get_menu?templateName=${templateName}`).catch((err) => console.log(err));
};
//fetch menu by id
export const getMenuById = async (id) => {
  return await axiosClient.get(`user/get_menu_by_id?id=${id}`).catch((err) => console.log(err));
};
//fetch menu user
export const getMenu = async () => {
  return await axiosClient.get(`user/get_menu_for_user`).catch((err) => console.log(err));
};
//fetch delete menu
export const getDeleteMenu = async () => {
  return await axiosClient.get(`user/get_deleted_menu`).catch((err) => console.log(err));
};