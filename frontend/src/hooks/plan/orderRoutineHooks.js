import {axiosClient}  from '../axiosInstance'
import { useMutation, useQueryClient } from "react-query";
import "react-router-dom";

//fetch all orderRoutine
export const getOrderRoutine = async () => {
    return await axiosClient
        .get('user/newOrderRoutine')
        .catch((err) => console.log(err));
};

// Create new order
const CreateNewOrder = async (data) => {

    return await axiosClient
        .post('user/newOrderRoutine', data)
        .catch((err) => console.log(err));
};
export const CreateOrderRoutine = () => {
    const queryClient = useQueryClient();
    return useMutation(CreateNewOrder, {
        onSuccess: () => {
            queryClient.invalidateQueries('getOrderRoutine')
        }
    })
}

// delete one specific order
const DeleteOne = async (id) => {
    return await axiosClient
        .delete(`user/newOrderRoutine/delete_one/${id}`)
        .catch((err) => console.log(err));
};
export const DeleteOneOrderRoutine = () => {
    const queryClient = useQueryClient();
    return useMutation(DeleteOne, {
        onSuccess: () => {
            queryClient.invalidateQueries('getOrderRoutine')
        }
    })
}