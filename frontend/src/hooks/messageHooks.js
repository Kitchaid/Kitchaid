/* eslint-disable-next-line no-unsafe-optional-chaining */
import {axiosClient} from '../hooks/axiosInstance'
import { useMutation, useQueryClient } from "react-query";
import "react-router-dom";

//fetch all message from sender
export const getMessages = async (messageSenderId) => {
  return await axiosClient
    .get(`user/message/${messageSenderId}`)
    .catch((err) => console.log(err));
};
//fetch all message from receiver
export const getMessagesFromReceiver = async (senderId) => {
  return await axiosClient
    .get(`user/messageFromReceiver/${senderId}`)
    .catch((err) => console.log(err));
};
//fetch message group status
export const getMessagesStatus = async () => {
  return await axiosClient
    .get('user/messageGroupStatus')
    .catch((err) => console.log(err));
};

//fetch message timestamp
export const getMessagesTimestamp = async () => {
  return await axiosClient
    .get('user/messagetimestamp')
    .catch((err) => console.log(err));
};

// Create newmessage
const CreateNewMessage = async ({ senderId, receiverId, data }) => {
  return await axiosClient
    .post(`user/message/${senderId}&${receiverId}`, data)
    .catch((err) => console.log(err));
};
export const CreateMessage = () => {
  const queryClient = useQueryClient();
  return useMutation(CreateNewMessage, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("getMessages");
      queryClient.invalidateQueries("getMessageSendByContact");
      queryClient.invalidateQueries("getTimestamp");
      queryClient.setQueriesData("getMessages", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data?.data],
        };
      });
      queryClient.setQueriesData("getMessageSendByContact", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data?.data],
        };
      });
      queryClient.setQueriesData("getTimestamp", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data?.data],
        };
      });
    }
  })
}
// insert a message
const insertMessage = async ({ _id, data }) => {
  return await axiosClient
    .patch(`user/insertMessage/${_id}`, data)
    .catch((err) => console.log(err));
};
export const InsertMessages = () => {
  const queryClient = useQueryClient();
  return useMutation(insertMessage, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("getMessages");
      queryClient.invalidateQueries("getMessageSendByContact");
      queryClient.invalidateQueries("getTimestamp");
      queryClient.setQueriesData("getMessages", (oldQueryData) => {
        return {
          ...oldQueryData,
          /* eslint-disable-next-line no-unsafe-optional-chaining */
          data: [...oldQueryData.data, data?.data],
        };
      });
      queryClient.setQueriesData("getMessageSendByContact", (oldQueryData) => {
        return {
          ...oldQueryData,
          /* eslint-disable-next-line no-unsafe-optional-chaining */
          data: [...oldQueryData?.data, data?.data],
        };
      });
      queryClient.setQueriesData("getTimestamp", (oldQueryData) => {
        return {
          ...oldQueryData,
          /* eslint-disable-next-line no-unsafe-optional-chaining */
          data: [...oldQueryData.data, data?.data],
        };
      });
    },
  });
};

// change message group status
const messageStatusChange = async (messageSenderId) => {
  return await axiosClient
    .patch(`user/messageStatus/${messageSenderId}`)
    .catch((err) => console.log(err));
};
export const MessagesStatusChange = () => {
  const queryClient = useQueryClient();
  return useMutation(messageStatusChange, {
    onSuccess: () => {
      queryClient.invalidateQueries("getMessages");
    }
  });
};

// delete one specific message
const DeleteOne = async (id) => {
  return await axiosClient
    .delete(`user/message/delete_one/${id}`)
    .catch((err) => console.log(err));
};
export const DeleteOneMessage = () => {
  const queryClient = useQueryClient();
  return useMutation(DeleteOne, {
    onSuccess: () => {
      queryClient.invalidateQueries('getMessages')
    }
  })
}