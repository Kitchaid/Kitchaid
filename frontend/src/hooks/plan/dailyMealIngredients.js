import {axiosClient}  from '../axiosInstance'
import { useMutation, useQueryClient } from "react-query";
import "react-router-dom";
import { toast } from "react-toastify";

//fetch
export const getMealIngredients = async () => {
    return await axiosClient
        .get(`user/DailyMealIngredient`)
        .catch((err) => console.log(err));
};
//fetch
export const getMealIngredientsByDateProducer = async (date) => {
    return await axiosClient
        .get(`user/DailyMealIngredientProducer/${date}`)
        .catch((err) => console.log(err));
};
export const getMealIngredientsByDateReceiver = async (date) => {
    return await axiosClient
        .get(`user/DailyMealIngredientReceiver/${date}`)
        .catch((err) => console.log(err));
};

//fetch image
export const getImageById= async (_id) => {
  return await axiosClient
  .get(`user/DailyMealImage/${_id}`)
  .catch((err) => console.log(err));
};
//fetch single dish
export const getDishById= async (_id) => {
  return await axiosClient
  .get(`user/DailyMealDish/${_id}`)
  .catch((err) => console.log(err));
};

// Create
const CreateNewMealIngredients = async (data) => {
  let date = data.date
    return await axiosClient
    .post(`user/DailyMealIngredient/${date}`, data)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const CreateMealIngredients = () => {
    const queryClient = useQueryClient();
    return useMutation(CreateNewMealIngredients, {
        onSuccess: () => {
            queryClient.invalidateQueries('getMealIngredients')
        }
    })
}
// Update
const UpdateOneIngredient = async (update) => {
   let _id = update._id
    return await axiosClient
      .patch(`user/DailyMealIngredient_update/${_id}`, update)
      .then((res) => {
        toast(res.data.msg);
        
      })
      .catch((err) => console.log(err));
  };
  export const UpdateMealIngredient = () => {
    const queryClient = useQueryClient();
    return useMutation(UpdateOneIngredient, {
      onSuccess: (data) => {
        queryClient.invalidateQueries("getMealIngredients");
        queryClient.setQueriesData("getMealIngredients", (oldQueryData) => {
          return {
            ...oldQueryData,
            data: [...oldQueryData.data, data?.data],
          };
        });
      },
    });
  };

// delete
const DeleteOne = async (_id) => {
  const ingredientsId = _id._id
  const id = _id.id._id
    return await axiosClient
        .delete(`user/DailyMealIngredient/delete/${ingredientsId}&${id}`)
        .catch((err) => console.log(err));
};
export const DeleteOneMealIngredients = () => {
    const queryClient = useQueryClient();
    return useMutation(DeleteOne, {
        onSuccess: () => {
            queryClient.invalidateQueries('getMealIngredients')
        }
    })
}