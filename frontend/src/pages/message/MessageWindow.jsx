/* eslint-disable react/prop-types */
import React, { useEffect,useState }from 'react';
import { useForm } from "react-hook-form";
import { Modal } from 'react-bootstrap';
import { useQuery } from "react-query";
import {
    getMessages,
    getMessagesFromReceiver,
    getMessagesTimestamp,
    CreateMessage,
    InsertMessages,
} from '../../hooks/messageHooks'
import Spinner from '../../Partials/Spinner'

function MessageWindow(props) {
    const { mutate: createConversition } = CreateMessage()
    const { mutate: insertMessage } = InsertMessages()
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [mergeTimestamp,setMergeTimestamp] = useState()
    let senderId = props.messageSenderId;
    const { data: getMessageSendByContact, error: messageError, isLoading: messageIsLoading } = useQuery(
        ['getMessages', senderId], () => getMessages(senderId));
    const { data: getMessageSendByUser, } = useQuery(
        ['getMessageSendByContact', senderId],
        () => getMessagesFromReceiver(senderId));
    const { data: timestamp } = useQuery('getTimestamp', getMessagesTimestamp)
    const timeStampAfterSort = mergeTimestamp?.sort(function (a, b) {
        return new Date(a.timestamp) - new Date(b.timestamp);
    });
    useEffect(()=>{
        setMergeTimestamp(timestamp?.data[0]?.allMessages)
    },[timestamp])
    const onSubmit = data => {
        let senderId = props.userId;
        let receiverId = props.messageSenderId;
        if (getMessageSendByUser?.data?.length === 0) {
            createConversition({
                receiverId, senderId, data
            });
            reset();
            updateScroll()
        } else {
            let _id = getMessageSendByUser?.data[0]?._id
            insertMessage(
                { _id, data }
            )
            reset();
            updateScroll();
        }
    };
    function updateScroll() {
        var element = document.getElementById("message-body");
        if (element === null) { return }
        else { element.scrollTop = element?.scrollHeight; }
    }
 // Error and Loading states
 if (messageError) return <div>Nånting gick fel</div>;
 if (messageIsLoading)
   return (
     <div>
       <Spinner />
     </div>
   );
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>{props?.username}</Modal.Title>
            </Modal.Header>
            <Modal.Body id='message-body'>
                {timeStampAfterSort?.map((items, index) => {
                    return <div key={index}>
                        {getMessageSendByContact?.data[0]?.userMessages?.map((message, index) => {

                            if (message?._id === items._id) {
                                return <div key={index}>
                                    <p className='message-text-SendByContact'>{message.messageText}</p>
                                </div>
                            }
                        })

                        }
                        {getMessageSendByUser?.data[0]?.userMessages?.map((message, index) => {

                            if (message?._id === items?._id) {
                                return <div className='message-container' key={index}>
                                    <p className='message-text-SendByUser'>{message.messageText}</p>
                                </div>
                            }
                        })
                        }
                    </div>
                })}
            </Modal.Body>
            <Modal.Footer>
                <form onSubmit={handleSubmit(onSubmit)} className="message-input">
                    <div className='txt-input'>
                        <input {...register("messageFromUser", { required: true })}
                            className="form-control"
                        />
                        {errors.messageFromUser && <span>Skriv din meddelande</span>}
                    </div>
                    <div>
                        <button className="stats_card ms-3 p-1 w-100">
                            Send
                        </button>
                    </div>
                </form>
            </Modal.Footer>
        </>
    );
}

export default MessageWindow;