import { useMutation, useQueryClient } from "react-query";
import "react-router-dom";
import {axiosClient} from "../axiosInstance";
import { toast } from "react-toastify";

//fetch all records
export const getFoodWasteRecord = async () => {
  return await axiosClient.get('/user/foodwaste').catch((err) => console.log(err));
};

// Create new record
const CreateRecord = async (data) => {
  const url = `/user/foodwaste`;

  return await axiosClient
    .post(url, data)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const CreateFoodWasteRecord = () => {
  const queryClient = useQueryClient();
  return useMutation(CreateRecord, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("getFoodWasteRecord");
      queryClient.setQueriesData("getFoodWasteRecord", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
    },
  });
};

// delete one specific record
const DeleteOne = async (id) => {
  const url = `/user/foodwaste/delete/${id}`;

  return await axiosClient.delete(url).catch((err) => console.log(err));
};
export const DeleteOneFoodWasteRecord = () => {
  const queryClient = useQueryClient();
  return useMutation(DeleteOne, {
    onSuccess: () => {
      queryClient.invalidateQueries("getFoodWasteRecord");
    },
  });
};

//get specific record...
export const specificFoodWasteRecord = async (_id) => {
  const url = `/user/foodwaste/thisRecord/${_id}`;
  return await axiosClient.get(url).catch((err) => console.log(err));
};

