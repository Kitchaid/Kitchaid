import React from "react";
import { useNavigate } from 'react-router-dom'
import { getMessagesStatus } from '../hooks/messageHooks'
import { useQuery } from "react-query";
import Badge from 'react-bootstrap/Badge';

const MessageIcon = () => {
    const navigate = useNavigate()
    const { data } = useQuery('getMessagesStatus', getMessagesStatus,
        {
            refetchInterval: 12000
        }
    )
    const renderBadge = () => {
        if (data?.data.length === 0) {
            return <></>
        }
        else {
            return <Badge bg="danger" className="badge">!</Badge>
        }
    }
    return <>
        <div>
            <button onClick={() => navigate("/Message")}>
              <img src="/KitchaidNewUI_icons/chat.png" alt="logo" className="cursor" />
               {renderBadge()}
            </button>
        </div>
    </>
}
export default MessageIcon;