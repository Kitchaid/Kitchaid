/* eslint-disable react/prop-types */
import React, { useState} from "react";
import { DeleteOneOrder } from '../../../hooks/plan/orderHooks'
import "react-router-dom";

function OrderRecordTable(props) {
  const [line, setLine] = useState(false);
  const handleClick = () => {
    setLine((current) => !current);
  };

  //delete one
 const {mutate} = DeleteOneOrder()
 
  return (
    <>
        <tbody key={props.id}>
          <tr
            style={{
              textDecoration: line ? "line-through" : "",
            }}
            onClick={handleClick}
          >
            <th scope="row" ></th>
            <td className="text-light">{props.itemToOrder}</td>
            <td className="text-light">{props.comment}</td>
            <td>
              <i
                className="fa-solid fa-trash-can glow"
                onClick={()=>mutate(props.id)}
              ></i>
            </td>
          </tr>
        </tbody>
    </>
  )
}

export default OrderRecordTable;
