// src/hooks/useCreateLunchOrder.js
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { axiosClient } from '../axiosInstance';
import { toast } from "react-toastify";

// Create a new lunch order
export const useCreateLunchOrder = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async (newOrder) => {
            const { userId, weeklyMenuId, orders } = newOrder;

            return axiosClient.post(`user/lunchOrder/new`, {
                userId,
                weeklyMenuId,
                weekOfYear: orders.weekOfYear,
                // dishId: orders.dishId,
                amount: orders.amount,
                weekDay: orders.weekDay,
                alt: orders.alt,
            }).then((res) => {
                toast(res.data.msg);
            });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('lunchOrders');
            },
        }
    );
};
export const useCreateMultiLunchOrder = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async (newOrder) => {
            const { orders } = newOrder;
            return axiosClient.post(`user/lunchOrder_multi/new`, { orders })
                .then((res) => {
                    toast(res.data.msg);
                });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('lunchOrders');
            },
        }
    );
};

// Fetch orders by weekOfYear
export const useFetchLunchOrders = (weekNumber) => {
    return useQuery(
        ['lunchOrders', weekNumber],
        async () => {
            const { data } = await axiosClient.get(`user/lunchOrder/fetch/${weekNumber.weekNumber}`);
            return data;
        },
        {
            enabled: !!weekNumber, // Only run the query if weekOfYear is provided
        }
    );
};
export const useFetchLunchOrdersAdmin = ({ weekNumber }) => {
    return useQuery(
        ['lunchOrders', weekNumber], // Add userId to the query key
        async () => {
            const { data } = await axiosClient.get(`user/lunchOrder/fetch_for_admin/${weekNumber}`);
            return data;
        },
        {
            enabled: !!weekNumber, // Only run the query if both weekNumber and userId are provided
        }
    );
};
export const useFetchLunchOrdersForCalculate = ({ weekNumber, weekday, alternative }) => {
    return useQuery(
        ['lunchOrders', { weekNumber, alternative, weekday }], // Add userId to the query key
        async () => {
            const { data } = await axiosClient.get(`user/lunchOrder/fetch_for_calculate/${weekNumber}&${alternative}&${weekday}`);
            return data;
        },
        {
            enabled: !!weekNumber, // Only run the query if both weekNumber and userId are provided
        }
    );
};

// Update lunch order
export const useUpdateLunchOrder = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (orderUpdate) => {
            const { userId, weekNumber, weekDay, dishId, amount, alt } = orderUpdate;
            return axiosClient.patch(`user/lunchOrder/modify`, {
                userId,
                weekNumber,
                weekDay,
                dishId,
                amount,
                alt,
            }).then((res) => {
                toast(res.data.msg);
            });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('useFetchLunchOrders');
            },
        }
    );
};


export const useUpdateLunchOrders = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async ({ userId, weekNumber, lunchOrders }) => {
            return await axiosClient.put(`user/lunchOrders/modify`, { userId, weekNumber, lunchOrders })
                .then((res) => {
                    toast(res.data.msg);
                })
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('fetchLunchOrders'); // Refetch data after update
            }
        }
    )
}
// Delete entire lunch order
export const useDeleteLunchOrders = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async ({ userId, weekNumber }) => {
            console.log({ userId, weekNumber });
            return axiosClient.delete(`user/lunchOrders/delete`, { data: { userId, weekNumber } }).then((res) => {
                toast(res.data.msg);
            });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('fetchLunchOrders');
            },
        }
    );
};