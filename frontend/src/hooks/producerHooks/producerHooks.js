import { useMutation, useQueryClient } from "react-query";
import "react-router-dom";
import { axiosClient } from '../axiosInstance';
import { toast } from "react-toastify";

/* ================================ CREATE ===================================== */


// Create new stat
const CreateNewStat = async (data) => {
  const kitchenId = data.kitchenId ? data.kitchenId : "64e3813b8e4cd90f455b63bb";
  return await axiosClient
    .post(`user/newStats?kitchenId=${kitchenId}`, data)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const CreateStat = () => {
  const queryClient = useQueryClient();
  return useMutation(CreateNewStat, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("getStats");
      queryClient.setQueriesData("getStats", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
    },
  });
};

//Create special kost
const CreateSpecialKost = async (data) => {
  try {
    return await axiosClient
      .post('user/special_production', data)
      .then((res) => {
        toast(res.data.msg);
      })
      .catch((err) => console.log(err));
  }
  catch (e) { console.log(e) }
}
export const CreateSpecial = () => {
  const queryClient = useQueryClient();
  return useMutation(CreateSpecialKost, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("fetchSpecialkostByFilter");
      queryClient.setQueriesData("fetchSpecialkostByFilter", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
    },
  });
};
//Create special kost
const UpdateSpecialKost = async ({ _id, data }) => {
  try {
    return await axiosClient
      .patch(`user/special_production/${_id}`, data)
      .then((res) => {
        toast(res.data.msg);
      })
      .catch((err) => console.log(err));
  }
  catch (e) { console.log(e) }
}
export const UpdateSpecial = () => {
  const queryClient = useQueryClient();
  return useMutation(UpdateSpecialKost, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("fetchSpecialkostByFilter");
      queryClient.setQueriesData("fetchSpecialkostByFilter", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
    },
  });
};

//Create specialkost user default filter
const createUserDefaultFilter = async ({ chosenTypesFilterJunior, chosenTypesFilterSenior }) => {
  const filterStringJunior = chosenTypesFilterJunior.join(',')
  const filterStringSenior = chosenTypesFilterSenior.join(',')
  try {
    return await axiosClient
      .patch(`/user/special_production_default_filter/?filterJuior=${filterStringJunior}&filterSenior=${filterStringSenior}`)
      .then((res) => {
        toast(res.data.msg);
      })
      .catch((err) => console.log(err));
  }
  catch (e) { console.log(e) }
}
export const CreateUserDefaultFilter = () => {
  const queryClient = useQueryClient();
  return useMutation(createUserDefaultFilter, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("fetchDefaultTypeByFilter");
      queryClient.setQueriesData("fetchDefaultTypeByFilter", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
    },
  });
};

/* ================================ CREATE ===================================== */

//fetch all stats
export const getStats = async () => {
  return await axiosClient.get(`user/newStats`).catch((err) => console.log(err));
};
//fetch one stats by name
export const getStat = async (params) => {
  const dishName = params.dishName;
  const guestAmount = params.guestAmount ? params.guestAmount : "";
  return await axiosClient
    .get(`user/newStats/get_record_by_name/${dishName}?guestAmount=${guestAmount}`)
    .catch((err) => console.log(err));
};
//fetch side statistic
export const getSideStat = async (params) => {
  const id = params.id;
  const sideIngredient = params.sideIngredient ? params.sideIngredient : "";
  return await axiosClient
    .get(`user/newStats/get_side_record_by_id/${id}?sideIngredient=${sideIngredient}`)
    .catch((err) => console.log(err));
};
//fetch side template
export const getSideTemplate = async () => {
  return await axiosClient
    .get(`user/newStats/side_template`)
    .catch((err) => console.log(err));
};
//fetch one stats by id
export const getStatById = async (id) => {
  return await axiosClient
    .get(`user/newStats/get_record_by_id/${id}`)
    .catch((err) => console.log(err));
};
// getSubKitchenId
export const getSubKitchenId = async () => {
  return await axiosClient
    .get('user/newStats_subkitchen_info')
    .catch((err) => console.log(err));
};

// getSubKitchenStats
export const getSubKitchenStats = async (params) => {
  const id = params.kitchenId;
  const dishName = params.dishName;
  const guestAmount = params.guestAmount ? params.guestAmount : "";
return await axiosClient.get(`user/newStats/sub_stats/${id}?dishName=${dishName}&guestAmount=${guestAmount}`)
    .catch((err) => console.log(err));
};


//getproducer
export const fetchUserInfo = async () => {
  return await axiosClient.get('user/getproducer')
    .catch((err) => console.log(err));
}

//fetch all kitchen after kommun
export const getAllUsers = async () => {
  return await axiosClient
    .get('user/getalluser')
    .catch((err) => console.log(err));
};

//getSpecialkost
export const getSpecialkost = async (_id) => {
  return await axiosClient.get(`user/special_production/${_id}`)
    .catch((err) => console.log(err));
};

//get specific stats...
export const specificStats = async (id) => {
  return await axiosClient.get(`user/newStats/thisRecord/${id}`).catch((err) => console.log(err));
};

//get subKitchen consuming data
export const SubKitchenConsumingData = async (params) => {
  const dishName = params.dishName;
  const sidesName = params.sidesName;
  // const guestAmount = params.guestAmount ? params.guestAmount : "";
  return await axiosClient.get(`/user/newStats/subkitchen/stats/${dishName}?sidesName=${sidesName}`).catch((err) => console.log(err))
}
//get subKitchen consuming data
export const SubKitchenCalculatedConsumingData = async (params) => {
  const dishName = params.dishName;
  const sidesName = params.sidesName;
  const subKitchenName = params.subKitchenName;
  const guestAmount = params.guestAmount ? params.guestAmount : "";
  return await axiosClient.get(`/user/newStats/subkitchen/calculate_stats/${dishName}&${subKitchenName}?customInput=${guestAmount}&sidesName=${sidesName}`).catch((err) => console.log(err))
}

//get subKitchen total consuming data
export const SubKitchenTotalConsumingData = async (params) => {
  const dishName = params.dishName;
  const sidesName = params.sidesName;
  return await axiosClient.get(`/user/newStats/subkitchen/total_stats/${dishName}?sidesName=${sidesName}`).catch((err) => console.log(err))
}
//get subKitchen total consuming data
export const SubKitchenTotalExcludedData = async (excludeParams) => {
  let subKitchenName = excludeParams.subKitchenName ? excludeParams.subKitchenName.join(',') : [];
  let mainSelectedValue = excludeParams.mainSelectedValue ? excludeParams.mainSelectedValue.join(',') : [];
  let sideSelectedValue = excludeParams.sideSelectedValue ? excludeParams.sideSelectedValue.join(',') : [];
  let sauceSelectedValue = excludeParams.sauceSelectedValue ? excludeParams.sauceSelectedValue.join(',') : [];
  const dishName = excludeParams.dishName ? excludeParams.dishName : '';
  const sidesName = excludeParams.sidesName ? excludeParams.sidesName : '';

  return await axiosClient.get(`/user/newStats/subkitchen/total_stats_excluded/${dishName}?sidesName=${sidesName}&subKitchenName=${subKitchenName}&mainSelectedValue=${mainSelectedValue}&sideSelectedValue=${sideSelectedValue}&sauceSelectedValue=${sauceSelectedValue}`).catch((err) => console.log(err))
}

//Get special kost
export const fetchSpecialkost = async (id) => {
  return await axiosClient.get(`user/special_production?id=${id}`)
    .catch((err) => console.log(err));
}
//Get special kost by filter
export const fetchSpecialkostByFilter = async (filterArray) => {
  const group = filterArray.group;
  let part = filterArray.part;
  const filterString = filterArray.filter ? filterArray.filter.join(',') : ''
  return await axiosClient.get(`user/special_production_by_filter/${group}?filter=${filterString}&part=${part}`)
    .catch((err) => console.log(err));
}
//Get special kost total by filter
export const fetchTotalByFilter = async (filterArray) => {
  const group = filterArray.group
  let part = filterArray.part;
  let excludeUserIds = filterArray.activeRows ? filterArray.activeRows.join(',') : '';
  const filterString = filterArray.filter ? filterArray.filter.join(',') : '';
  return await axiosClient.get(`user/special_production_total_by_filter/${group}?filter=${filterString}&part=${part}&excludeUserIds=${excludeUserIds}`)
    .catch((err) => console.log(err));
}
//Get special kost by filter
export const fetchDefaultTypeByFilter = async () => {
  return await axiosClient.get(`user/special_production_default_filter`)
    .catch((err) => console.log(err));
}

/* ================================ UPDATE ===================================== */

// Update a stat
const UpdateOneStat = async ({ _id, sideIngredientId,updateStats }) => {
  return await axiosClient
    .patch(`user/newStats/update/${_id}?sideIngredientId=${sideIngredientId}`, updateStats)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const UpdateStat = () => {
  const queryClient = useQueryClient();
  return useMutation(UpdateOneStat, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("getStats");
      queryClient.setQueriesData("getStats", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data?.data],
        };
      });
    },
  });
};

//Update specialkost user default filter
const updateUserDefaultFilter = async ({ _id, chosenTypesFilterJunior, chosenTypesFilterSenior }) => {
  const filterStringJunior = chosenTypesFilterJunior.join(',')
  const filterStringSenior = chosenTypesFilterSenior.join(',')
  try {
    return await axiosClient
      .patch(`/user/special_production_filter_update/${_id}?filterJunior=${filterStringJunior}&filterSenior=${filterStringSenior}`)
      .then((res) => {
        toast(res.data.msg);
      })
      .catch((err) => console.log(err));
  }
  catch (e) { console.log(e) }
}
export const UpdateUserDefaultFilter = () => {
  const queryClient = useQueryClient();
  return useMutation(updateUserDefaultFilter, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("fetchDefaultTypeByFilter");
      queryClient.setQueriesData("fetchDefaultTypeByFilter", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
    },
  });
};
/* ================================ DELETE ===================================== */

// delete one specific stats
const DeleteOne = async (id) => {
  return await axiosClient.delete(`user/newStats/delete/${id}`).catch((err) => console.log(err));
};
export const DeleteOneStat = () => {
  const queryClient = useQueryClient();
  return useMutation(DeleteOne, {
    onSuccess: () => {
      queryClient.invalidateQueries("getStats");
    },
  });
};
//Delete diet guest
const DeleteOneSpecialkost = async (_id) => {
  return await axiosClient
    .delete(`user/special_production/delete/${_id}`)
    .then((res) => {
      toast(res.data.msg);
    })
    .catch((err) => console.log(err));
};
export const DeleteOneSpecial = () => {
  const queryClient = useQueryClient();
  return useMutation(DeleteOneSpecialkost, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("fetchSpecialkostByFilter");
      queryClient.setQueriesData("fetchSpecialkostByFilter", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
    },
  });
};