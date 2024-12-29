import { axiosClient } from '../axiosInstance';
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

/************ CREATE **************/
// Create new weekly menu
export const createWeeklyMenu = async (newMenu) => {
    const { data } = await axiosClient
    .post('secure/superior_admin/weekly_menu', newMenu)
    .then((res) => {
        toast(res.data.msg);
      });
    return data;
  };

/************* READ ***************/
// Fetch weekly menu
export const fetchWeeklyMenu = async (id) => {
    const { data } = await axiosClient.get(`secure/superior_admin/weekly_menu/${id}`);
    return data;
  };
// Fetch weekly menus
export const fetchWeeklyMenus = async () => {
    const { data } = await axiosClient.get('secure/superior_admin/weekly_menus');
    return data;
  };
/************ UPDATE **************/
  const updateWeeklyMenu = async ({ id, menu }) => {
    const { data } = await axiosClient
    .patch(`secure/superior_admin/weekly_menu_update/${id}`, { menu })
    .then((res) => {
        toast(res.data.msg);
      });
    return data;
  };
  
  export const UpdateWeeklyMenu = () => {
    const queryClient = useQueryClient();
    // Mutation for updating the menu
    return useMutation(updateWeeklyMenu, {
      onSuccess: () => {
        queryClient.invalidateQueries('fetchWeeklyMenu');
      }
    });
  };
/************ UPDATE **************/
// Delete a weekly menu
export const deleteWeeklyMenu = async (id) => {
    await axiosClient.delete(`secure/superior_admin/weekly_menu_delete/${id}`).then((res) => {
        toast(res.data.msg);
      });
  };
