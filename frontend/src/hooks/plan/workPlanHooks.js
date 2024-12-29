import { axiosClient } from '../axiosInstance'
import { useMutation, useQueryClient } from "react-query";
import "react-router-dom";

//fetch plans by week 
export const getPlans = async (weekday, weekNumber) => {
    return await axiosClient
        .get(`user/newTask/byWeek/${weekNumber}&${weekday}`)
        .catch((err) => console.log(err));
};
//get QuantityTemplate By Name
export const getQuantityTemplateByName = async (dishName) => {
    return await axiosClient
        .get(`user/get_quantity_template_by_name?dishName=${dishName}`)
        .catch((err) => console.log(err));
};

// Create new plan
const CreateNewPlan = async (data) => {
    return await axiosClient.post('user/newTask/', data).catch((err) => console.log(err));
};
export const CreatePlan = () => {
    const queryClient = useQueryClient();
    return useMutation(CreateNewPlan, {
        onSuccess: () => {
            queryClient.invalidateQueries('getPlans')
        }
    })
}

// Update plan
const updatePlan = async (data) => {
    console.log(data)
    const weekday = data.weekday;
    const updateId = data.id;
    const weekNumber = data.weekNumber;
    return await axiosClient
        .patch(`user/newTask/update/${weekNumber}&${weekday}&${updateId}`)
        .catch((err) => console.log(err));
};
export const UpdatePlan = () => {
    const queryClient = useQueryClient();
    return useMutation(updatePlan, {
        onSuccess: () => {
            queryClient.invalidateQueries('getPlans')
        }
    })
}

// delete all orders
const Delete = async ({ weekNumber, weekday }) => {
    console.log(weekNumber + weekday)
    return await axiosClient
        .delete(`user/newTask/delete_all/${weekNumber}&${weekday}`)
        .catch((err) => console.log(err));
};
export const DeletePlans = () => {
    const queryClient = useQueryClient();
    return useMutation(Delete, {
        onSuccess: () => {
            queryClient.invalidateQueries('getPlans')
        }
    })
}
// delete one specific orders
const DeleteOne = async (id) => {
    return await axiosClient
        .delete(`user/newTask/delete_one/${id}`)
        .catch((err) => console.log(err));
};
export const DeleteOnePlan = () => {
    const queryClient = useQueryClient();
    return useMutation(DeleteOne, {
        onSuccess: () => {
            queryClient.invalidateQueries('getPlans')
        }
    })
}