import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Modal from 'react-bootstrap/Modal';
import { useQuery } from "react-query";
import MessageWindow from './MessageWindow'
import { getAllUser } from '../../hooks/security/useUserLogin'
import {
    getMessagesStatus,
    MessagesStatusChange,
} from '../../hooks/messageHooks'
import Badge from 'react-bootstrap/Badge';
import { contextData } from "../../ContextApi";

const Message = () => {
    const { userdata } = useContext(contextData)
    const userId = userdata._id;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [username, setUsername] = useState();
    const [messageSenderId, setMessageSenderId] = useState("6408a5653fa12cd895cd1046");
    const { data: alluser } = useQuery('getAllUser', getAllUser);
    const updatedAllUser = {
        ...alluser?.data,
        filtered: alluser?.data.filter((user) => user._id !== userId),
    };
    const { data: messageStatus } = useQuery('messageStatus', getMessagesStatus)
    //handle click on unread message\
    const { mutate: statusChange } = MessagesStatusChange()
    const handleClick = (senderId, username) => {
        statusChange(senderId);
        handleShow();
        setUsername(username);
        setMessageSenderId(senderId)
    }

    return <>
        {updatedAllUser?.filtered?.map((user, index) => {
            return <>
                <div className="messageUserList" key={index}>
                    <button
                        className="mainButton mt-1 p-1"
                        onClick={() => {
                            handleClick(user._id, user?.username);
                        }}
                    >
                        <span>{user?.username}</span>
                    </button>
                    {messageStatus?.data?.map((condition, index) => {
                        if (condition?.groupMessageIsReaded === false
                            && condition?.messageSender === user?._id
                        ) {
                            return <>
                                <Badge bg="danger" className="badge-message" key={index}>!</Badge>
                            </>
                        } else {
                            return <>
                                <Badge bg="danger" className="badge-message-readed" key={index}>!</Badge>
                            </>
                        }
                    })}
                </div>
            </>
        })}
        <Modal size="sm" show={show} onHide={handleClose}>
            <MessageWindow username={username}
                messageSenderId={messageSenderId}
                userId={userId}
            />
        </Modal>
    </>

};

export default Message;
