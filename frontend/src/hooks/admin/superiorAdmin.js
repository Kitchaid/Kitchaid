import { axiosClient, axiosImageClient } from '../axiosInstance';
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

/************ CREATE **************/

//registe new user based on roll
const createNewAdmin = async (user) => {
  return await axiosClient
    .post(`secure/admin_create`, user)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const CreateAdmin = () => {
  return useMutation(createNewAdmin);
};

//registe new menua
const createMenu = async (submitData) => {
  const formData = new FormData();
  Object.keys(submitData).forEach(key => {
   // If the value is an array, append each item individually
   if (Array.isArray(submitData[key])) {
     submitData[key].forEach((value, index) => {
       formData.append(`${key}[${index}]`, value);  // Will create allergic[0], allergic[1], etc.
     });
   } else {
     formData.append(key, submitData[key]);  // Append normal key-value pairs
   }
 });
  return await axiosImageClient
    .post(`secure/superior_admin/menu`, formData)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const CreateMenu = () => {
  return useMutation(createMenu);
};
//registe menu template
const createMenuTemplate = async (data) => {
  return await axiosClient
    .post('secure/superior_admin/menu_template', data)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const CreateMenuTemplate = () => {
  return useMutation(createMenuTemplate);
};
//registe weekly menu
const createWeeklyMenu = async () => {
  return await axiosClient
    .post(`secure/superior_admin/weekly_menu`)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const CreateWeeklyMenu = () => {
  return useMutation(createWeeklyMenu);
};
//registe weekly menu
const updateWeeklyMenu = async ({ weeklyMenuId }) => {
  return await axiosClient
    .post(`secure/superior_admin/weekly_menu_update?${weeklyMenuId}`)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const UpdateWeeklyMenu = () => {
  const queryClient = useQueryClient();
  return useMutation(updateWeeklyMenu, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("getWeeklyMenu");
      queryClient.setQueriesData("getWeeklyMenu", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data?.data],
        };
      });
    },
  });
};
//registe side template
const createSideTemplate = async (data) => {
  return await axiosClient
    .post(`secure/superior_admin/side_template`, data)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const CreateSideTemplate = () => {
  return useMutation(createSideTemplate);
};
//registe side template
const updateSideTemplate = async ({ id, data }) => {
  return await axiosClient
    .patch(`secure/superior_admin/side_template_update/${id}`, data)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const UpdateSideTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation(updateSideTemplate, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("getSideTemplate");
      queryClient.setQueriesData("getSideTemplate", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data?.data],
        };
      });
    },
  });
};


const createSection = async (data) => {
  return await axiosClient
    .post(`secure/superior_admin/section`, data)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const CreateSection = () => {
  const queryClient = useQueryClient();
  return useMutation(createSection, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("getPartGroup");
      queryClient.setQueriesData("getPartGroup", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data?.data],
        };
      });
    },
  });
};
//Create group section type for specialkost
const createType = async (submitData) => {
  return await axiosClient
    .post(`secure/superior_admin/special_type`, submitData)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const CreateType = () => {
  const queryClient = useQueryClient();
  return useMutation(createType, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("getPartGroup");
      queryClient.setQueriesData("getPartGroup", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data?.data],
        };
      });
    },
  });
};

/************* READ ***************/

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
export const getAllUsersForSuperAdmin = async () => {
  return await axiosClient
    .get('secure/superior_admin/get_all_user')
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

//get image
export const getPublicDishImages = async () => {
  return await axiosClient
    .get(`secure/superior_admin/public_dish_images`)
    .catch((err) => console.log(err));
}
//get type
export const getSpecialType = async () => {
  return await axiosClient
    .get(`secure/superior_admin/special_type`)
    .catch((err) => console.log(err));
}
//get menu template
export const getMenuTemplates = async () => {
  return await axiosClient
    .get(`secure/superior_admin/menu_templates`)
    .catch((err) => console.log(err));
}
//get menu template
export const getMenuTemplate = async (templateId) => {
  return await axiosClient
    .get(`secure/superior_admin/menu_template/${templateId}`)
    .catch((err) => console.log(err));
}
//get side template
export const getSideTemplate = async (group) => {
  return await axiosClient
    .get(`secure/superior_admin/side_template?group=${group}`)
    .catch((err) => console.log(err));
}
//get menu template
export const getWeeklyMenus = async () => {
  return await axiosClient
    .get(`secure/superior_admin/weekly_menus`)
    .catch((err) => console.log(err));
}
//get menu template
export const getWeeklyMenu = async (menuId) => {
  return await axiosClient
    .get(`secure/superior_admin/weekly_menu?${menuId}`)
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

//Update type
const updateType = async ({ typeListId, submitData }) => {
  const _id = typeListId
  return await axiosClient
    .patch(`secure/superior_admin/special_type_update/${_id}`, submitData)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const UpdateType = () => {
  const queryClient = useQueryClient();
  return useMutation(updateType, {
    onSuccess: () => {
      queryClient.invalidateQueries("getSpecialType");
  }});
};

//Update type color
const updateTypeColor = async ({ typeId, typeListId, data }) => {
  const _id = typeId
  const color = data?.color.split("#")
  return await axiosClient
    .patch(`secure/superior_admin/special_type_color_update/${_id}&${typeListId}&${color}`)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const UpdateTypeColor = () => {
  const queryClient = useQueryClient();
  return useMutation(updateTypeColor,
   { onSuccess: () => {
      queryClient.invalidateQueries("getSpecialType")
    }}
    );
};
//Update menu
const updateMenu = async ({ id, submitData }) => {
  const formData = new FormData();
   Object.keys(submitData).forEach(key => {
    // If the value is an array, append each item individually
    if (Array.isArray(submitData[key])) {
      submitData[key].forEach((value, index) => {
        formData.append(`${key}[${index}]`, value);  // Will create allergic[0], allergic[1], etc.
      });
    } else {
      formData.append(key, submitData[key]);  // Append normal key-value pairs
    }
  });
  return await axiosImageClient
    .patch(`secure/superior_admin/menu_update/${id}`, formData)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const UpdateMenu = () => {
  const queryClient = useQueryClient();
  return useMutation(updateMenu, 
   { onSuccess: () => {
      queryClient.invalidateQueries("getMenu")
    }}
    );
};

//Update one dish
const updateDish = async ({ id, dishId, submitData }) => {
  const formData = new FormData();
  Object.keys(submitData).forEach(key => {
   // If the value is an array, append each item individually
   if (Array.isArray(submitData[key])) {
     submitData[key].forEach((value, index) => {
       formData.append(`${key}[${index}]`, value);  // Will create allergic[0], allergic[1], etc.
     });
   } else {
     formData.append(key, submitData[key]);  // Append normal key-value pairs
   }
 });
  return await axiosImageClient
    .patch(`secure/superior_admin/dish_update/${id}&${dishId}`, formData)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const UpdateDish = () => {
  const queryClient = useQueryClient();
  return useMutation(updateDish,
  {onSuccess: () => {
      queryClient.invalidateQueries("getMenuForAdmin")
    }}
    );
};

//change belongTo kitchen
const UpdateBelonging = async ({ id, update }) => {
  return await axiosClient
    .patch(`admin/receiver/update-main-kitchen/${id}`, update)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const UpdateSubKitchen = () => {
  const queryClient = useQueryClient();
  return useMutation(UpdateBelonging,
    {onSuccess: () => {
      queryClient.invalidateQueries("getReceiver")
    }}
    );
};

//change kitchen FUNCTION
const UpdateKitchen = async ({ id, isProducer, belongToKitchen }) => {
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
const UpdateFunctionContent = async ({ id, widgetData }) => {
  const dataObject = widgetData.reduce((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});
  return await axiosClient
    .patch(`admin/content_control/update/${id}`, dataObject)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const UpdateKitchenFunctionContent = () => {
  return useMutation(UpdateFunctionContent);
};


//update function content of kitchen
const updateInfoFolder = async ({ id, data }) => {
  return await axiosClient
    .patch(`admin/info_folder/update/${id}`, data)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const UpdateInfoFolder = () => {
  return useMutation(updateInfoFolder);
};
//registe menu template
const updateMenuTemplate = async (data) => {
  const id = data?.templateId
  const templateName = data?.data?.templateName
  return await axiosClient
    .patch(`secure/superior_admin/menu_template_update/${id}?templateName=${templateName}`, data?.data)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const UpdateMenuTemplate = () => {
  return useMutation(updateMenuTemplate);
};

//Delete dish
const restoreDish = async ({ id, dishId, isDeleted }) => {
  const dishDeleted = { isDeleted: isDeleted }
  return await axiosClient
    .patch(`secure/superior_admin/menu_restore_dish/${id}&${dishId}`, dishDeleted)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
}
export const RestoreOneDish = () => {
  const queryClient = useQueryClient();
  return useMutation(restoreDish,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getMenuForAdmin');
      },
    });
}

//Delete dish
const DeleteDish = async ({ id, dishId, isDeleted }) => {
  const dishDeleted = { isDeleted: isDeleted }
  return await axiosClient
    .patch(`secure/superior_admin/menu_delete_dish/${id}&${dishId}`, dishDeleted)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
}
export const DeleteOneDish = () => {
  const queryClient = useQueryClient();
  return useMutation(DeleteDish,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getMenuForAdmin');
      },
    }

  );
}
//Delete menu side
const DeleteSide = async ({ id, sideId, isDeleted }) => {
  const sideDeleted = { isDeleted: !isDeleted }
  return await axiosClient
    .patch(`secure/superior_admin/menu_delete_side/${id}&${sideId}`, sideDeleted)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
}
export const DeleteOneSide = () => {
  return useMutation(DeleteSide);
}

//Delete One allergic type
const deleteType = async ({ typeListId, typeId }) => {
  const _id = typeListId
  return await axiosClient
    .patch(`secure/superior_admin/special_type_delete/${_id}&${typeId}`)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const DeleteType = () => {
  return useMutation(deleteType);
};