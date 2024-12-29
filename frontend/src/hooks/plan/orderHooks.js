import {axiosClient}  from '../axiosInstance'
import { useMutation, useQueryClient } from "react-query";
import "react-router-dom";

//fetch all orders
export const getOrders = async () => {
    return await axiosClient
        .get("user/newOrder")
        .catch((err) => console.log(err));
};

// Create new order
const CreateNewOrder = async (data) => {
    return await axiosClient
        .post("user/newOrder", data)
        .catch((err) => console.log(err));
};
export const CreateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation(CreateNewOrder, {
        onSuccess: () => {
            queryClient.invalidateQueries('getOrders')
        }
    })
}
// delete all orders
const Delete = async () => {
    return await axiosClient
        .delete("user/newOrder/delete_all")
        .catch((err) => console.log(err));
};
export const DeleteOrders = () => {
    const queryClient = useQueryClient();
    return useMutation(Delete, {
        onSuccess: () => {
            queryClient.invalidateQueries('getOrders')
        }
    })
}
// delete one specific orders
const DeleteOne = async (id) => {
    return await axiosClient
        .delete(`user/newOrder/delete_one/${id}`)
        .catch((err) => console.log(err));
};
export const DeleteOneOrder = () => {
    const queryClient = useQueryClient();
    return useMutation(DeleteOne, {
        onSuccess: () => {
            queryClient.invalidateQueries('getOrders')
        }
    })
}