import {axiosClient} from '../axiosInstance';
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

/************ CREATE **************/

//registe new user based on roll
const createNewUser = async (user) => {
  return await axiosClient
    .post(`admin/register`, user)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const CreateUser = () => {
  return useMutation(createNewUser);
};

//create info folder
const createInfoFolder= async ({id,data}) => {
  return await axiosClient
    .post(`admin/info_folder/${id}`, data)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const CreateFolder = () => {
  return useMutation(createInfoFolder);
};
//create content control
const createContentControl = async ({id,data}) => {
  return await axiosClient
    .post(`admin/content_control/${id}`, data)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const CreateContentControl = () => {
  return useMutation(createContentControl);
};
//create content control
const createQuantityTemplate = async (data) => {
  return await axiosClient
    .post(`admin/quantity_template`, data)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const CreateQuantityTemplate = () => {
  return useMutation(createQuantityTemplate);
};

/************ READ **************/

//fetch all R-kitchen after kommun
export const getReceiver = async (belongToId) => {
  return await axiosClient
  .get(`admin/getallreceiver/${belongToId}`)
  .catch((err) => console.log(err));
};

//fetch all P-kitchen after kommun
export const getProducer = async () => {
  return await axiosClient
    .get('admin/getallproducer')
    .catch((err) => console.log(err));
};
//fetch all kitchen after kommun
export const getAllUsersForAdmin = async () => {
  return await axiosClient
  .get('admin/getalluser')
  .catch((err) => console.log(err));
};
//fetch kitchen function content
export const getKitchenFunctionContentForAdmin = async (id) => {
  return await axiosClient
  .get(`admin/content_control/${id}`)
  .catch((err) => console.log(err));
};

//fetch food waste and lunch stats after kitchen for data analyze
export const getFoodWasteRecordByKitchen = async (kitchenId, dateStart, dateEnd) => {
  return await axiosClient
  .get(`admin/foodwaste/${kitchenId}&${dateStart}&${dateEnd}`)
  .catch((err) => console.log(err));
};

export const getTotalFoodWasteRecordByKitchen = async (kitchenId, dateStart, dateEnd) => {
  return await axiosClient
  .get(`admin/total_foodwaste/${kitchenId}&${dateStart}&${dateEnd}`)
  .catch((err) => console.log(err));
};

export const getAverageFoodWasteByKitchen = async (kitchenId, dateStart, dateEnd) => {
  return await axiosClient
  .get(`admin/average_foodwaste_by_day/${kitchenId}&${dateStart}&${dateEnd}`)
  .catch((err) => console.log(err));
};

export const getAverageFoodWastePerGuest = async (kitchenId, dateStart, dateEnd) => {
  return await axiosClient
  .get(`admin/average_foodwaste_per_guest/${kitchenId}&${dateStart}&${dateEnd}`)
  .catch((err) => console.log(err));
};

export const getAverageFoodWastePerGuestByDay = async (kitchenId, dateStart, dateEnd) => {
  return await axiosClient
  .get(`admin/average_foodwaste_per_guest_by_day/${kitchenId}&${dateStart}&${dateEnd}`)
  .catch((err) => console.log(err));
};

//fetch all lunch stats records
export const getLunchStatsRecordByKitchen = async (kitchenId) => {
  return await axiosClient
  .get(`admin/lunchstats/${kitchenId.id}`)
  .catch((err) => console.log(err));
};

//get user trace data
export const getUserTraceData = async (traceId) => {
  return await axiosClient
  .get(`admin/get_user_trace_date/${traceId}`)
  .catch((err) => console.log(err));
}

//get info folder
export const getInfoFolder = async (id) => {
  return await axiosClient
  .get(`admin/info_folder/${id}`)
  .catch((err) => console.log(err));
}

//get quantity_templates
export const getQuantityTemplate = async (templateName) => {
  return await axiosClient
  .get(`admin/quantity_templates?templateName=${templateName}`)
  .catch((err) => console.log(err));
}

/************ UPDATE **************/

//Update admin PW and Email
const UpdateSectorAdmin = async (updateAdmin) => {
  return await axiosClient
    .patch(`admin/sector/update`, updateAdmin)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const UpdateAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation(UpdateSectorAdmin, {
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
//Update kitchen PW
const UpdateKitchenPw = async ({id,data}) => {
  return await axiosClient
    .patch(`admin/receiver/update/${id}`, data)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const UpdateKitchenpw = () => {
  return useMutation(UpdateKitchenPw);
};
//Update kitchen PW
const updateKitchenDeliveryTime = async ({id,data}) => {
  return await axiosClient
    .patch(`admin/receiver/update_delivery_time/${id}`, data)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const UpdateKitchenDeliveryTime = () => {
  return useMutation(updateKitchenDeliveryTime);
};

//change belongTo kitchen
const UpdateBelonging = async ({id,update}) => {
  return await axiosClient
    .patch(`admin/receiver/update-main-kitchen/${id}`,update)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const UpdateSubKitchen = () => {
  return useMutation(UpdateBelonging);
};
//change kitchen FUNCTION
const UpdateKitchen = async ({id,isProducer,belongToKitchen}) => {
  return await axiosClient
    .patch(`admin/kitchen/update/${id}&${isProducer}&${belongToKitchen}`)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const UpdateKitchenFunction = () => {
  return useMutation(UpdateKitchen);
};


//update function content of kitchen
const UpdateFunctionContent = async ({id,widgetData}) => {
  const dataObject = widgetData.reduce((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});
  return await axiosClient
    .patch(`admin/content_control/update/${id}`,dataObject)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const UpdateKitchenFunctionContent = () => {
  return useMutation(UpdateFunctionContent);
};

//update function content of kitchen
const updateInfoFolder = async ({id,data}) => {
  return await axiosClient
    .patch(`admin/info_folder/update/${id}`,data)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const UpdateInfoFolder = () => {
  return useMutation(updateInfoFolder);
};

//update kitchen status
const updateUsername = async ({id,data}) => {
  return await axiosClient
    .patch(`admin/receiver/update_username/${id}`,data)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const UpdateUsername = () => {
  return useMutation(updateUsername);
};

//update kitchen status
const updateUserStatus = async ({id,data}) => {
  return await axiosClient
    .patch(`admin/receiver/update_user_status/${id}`,data)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const UpdateUserStatus = () => {
  return useMutation(updateUserStatus);
};

//delete user
const deleteOneUser = async (id) => {
  console.log(id)
  return await axiosClient
    .delete(`admin/delete_user/${id}`)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const DeleteOneUser = () => {
  return useMutation(deleteOneUser);
};
//delete Quantity Template
const deleteQuantityTemplate = async (id) => {
  return await axiosClient
    .delete(`admin/delete_quantity_template/${id}`)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const DeleteQuantityTemplate = () => {
  return useMutation(deleteQuantityTemplate);
};

