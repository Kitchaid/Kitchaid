import "react-router-dom";
import { axiosClient } from '../axiosInstance';
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

//get all food routine
export const getRoutine = async () => {
    return await axiosClient.get('user/food_routine/').catch((err) => console.log(err));
};
// Update a food routine
const UpdateOneFoodRoutine = async ({ _id, updateRoutine }) => {

    return await axiosClient
        .patch(`user/food_routine/update/${_id}`, updateRoutine)
        .then((res) => {
            toast(res.data.msg);

        })
        .catch((err) => console.log(err));
};
export const UpdateFoodRoutine = () => {
    const queryClient = useQueryClient();
    return useMutation(UpdateOneFoodRoutine, {
        onSuccess: (data) => {
            queryClient.invalidateQueries("getRoutine");
            queryClient.setQueriesData("getRoutine", (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [...oldQueryData.data, data?.data],
                };
            });
        },
    });
};
//get all work routine
export const getWorkRoutine = async () => {
    return await axiosClient.get(`user/work_routine`).catch((err) => console.log(err));
};

//Creat new section
const CreateNewSection = async (newSection) => {
    return axiosClient
        .post('user/food_routine/section/', newSection)
        .catch((err) => console.log(err));
};
export const CreateSection = () => {
    const queryClient = useQueryClient();
    return useMutation(CreateNewSection, {
        onSuccess: (data) => {
            queryClient.invalidateQueries("getSection");
            queryClient.setQueriesData("getSection", (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [...oldQueryData.data, data.data],
                };
            });
        },
    });
}

//update section
const updateSection = async (updateSection) => {
    return axiosClient
        .post('user/food_routine/section/update', updateSection)
        .catch((err) => console.log(err));
};
export const UpdateSection = () => {
    return useMutation(updateSection);
};
//Get sections
export const getSection = async () => {
    return await axiosClient.get('user/food_routine/section').catch((err) => console.log(err));
};
//Delete section
const DeleteOne = async (_id) => {
    return await axiosClient
        .delete(`user/food_routine/section/delete/${_id}`).catch((err) => console.log(err));
};
export const DeleteOneSection = () => {
    const queryClient = useQueryClient();
    return useMutation(DeleteOne, {
        onSuccess: () => {
            queryClient.invalidateQueries("getSection");
        },
    });
};
//Creat new specialFood
const CreateNewSpecial = async (data) => {
    return axiosClient
        .post('user/special', data)
        .catch((err) => console.log(err));
};
export const CreateSpecial = () => {
    const queryClient = useQueryClient();
    return useMutation(CreateNewSpecial, {
        onSuccess: (data) => {
            queryClient.invalidateQueries("getSpecial");
            queryClient.setQueriesData("getSpecial", (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [...oldQueryData.data, data.data],
                };
            });
        },
    });
};
//Get special kost
export const getSpecial = async () => {
    return await axiosClient.get('user/special').catch((err) => console.log(err));
};
//Delete speciakFood
const DeleteOneSp = async (_id) => {
    return await axiosClient
        .delete(`user/special/delete/${_id}`).catch((err) => console.log(err));
};
export const DeleteOneSpecial = () => {
    const queryClient = useQueryClient();
    return useMutation(DeleteOneSp, {
        onSuccess: () => {
            queryClient.invalidateQueries("getSpecial");
        },
    });
};
//Create sign in info
const CreateNewSignIn = async (data) => {
    return axiosClient
        .post('user/signininfo', data)
        .catch((err) => console.log(err));
};
export const CreateSignIn = () => {
    const queryClient = useQueryClient();
    return useMutation(CreateNewSignIn, {
        onSuccess: (data) => {
            queryClient.invalidateQueries("getSpecial");
            queryClient.setQueriesData("getSpecial", (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [...oldQueryData.data, data.data],
                };
            });
        },
    });
};
//Get sign in info
export const getSignininfo = async () => {
    return await axiosClient.get('user/signininfo').catch((err) => console.log(err));
};
//Delete sign in info
const DeleteOneSignin = async (_id) => {
    return await axiosClient
        .delete(`user/signininfo/delete/${_id}`).catch((err) => console.log(err));
};
export const DeleteOneSignIn = () => {
    const queryClient = useQueryClient();
    return useMutation(DeleteOneSignin, {
        onSuccess: () => {
            queryClient.invalidateQueries("getSignininfo");
        },
    });
};
//create contact info
const CreateNewContact = async (data) => {
    return axiosClient
        .post('user/contactInfo', data)
        .catch((err) => console.log(err));
};
export const CreateContact = () => {
    const queryClient = useQueryClient();
    return useMutation(CreateNewContact, {
        onSuccess: (data) => {
            queryClient.invalidateQueries("getContactinfo");
            queryClient.setQueriesData("getContactinfo", (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [...oldQueryData.data, data.data],
                };
            });
        },
    });
};
//Get contact info
export const getContactinfo = async () => {
    return await axiosClient.get('user/contactInfo').catch((err) => console.log(err));
};
//Delete sign in info
const DeleteOneContact = async (_id) => {
    return await axiosClient
        .delete(`user/contactInfo/delete/${_id}`).catch((err) => console.log(err));
};
export const DeleteOneContactInfo = () => {
    const queryClient = useQueryClient();
    return useMutation(DeleteOneContact, {
        onSuccess: () => {
            queryClient.invalidateQueries("getContactinfo");
        },
    });
};

