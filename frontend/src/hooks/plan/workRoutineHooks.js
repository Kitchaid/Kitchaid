import {axiosClient}  from '../axiosInstance'
import { useMutation, useQueryClient } from "react-query";
import "react-router-dom";

//fetch all WorkRoutine
export const getWorkRoutine = async () => {
    return await axiosClient
        .get('user/newWorkRoutine/')
        .catch((err) => console.log(err));
};

// Create new Work
const CreateNewWork = async (data) => {

    return await axiosClient
        .post('user/newWorkRoutine/', data)
        .catch((err) => console.log(err));
};
export const CreateWorkRoutine = () => {
    const queryClient = useQueryClient();
    return useMutation(CreateNewWork, {
        onSuccess: () => {
            queryClient.invalidateQueries('getWorkRoutine')
        }
    })
}
// delete all Works
const Delete = async () => {
    return await axiosClient
        .delete('user/newWorkRoutine/delete_all')
        .catch((err) => console.log(err));
};
export const DeleteWorkRoutine = () => {
    const queryClient = useQueryClient();
    return useMutation(Delete, {
        onSuccess: () => {
            queryClient.invalidateQueries('getWorkRoutine')
        }
    })
}
// delete one specific Works
const DeleteOne = async (id) => {
    return await axiosClient
        .delete(`user/newWorkRoutine/delete_one/${id}`)
        .catch((err) => console.log(err));
};
export const DeleteOneWorkRoutine = () => {
    const queryClient = useQueryClient();
    return useMutation(DeleteOne, {
        onSuccess: () => {
            queryClient.invalidateQueries('getWorks')
        }
    })
}