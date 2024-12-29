/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import {
  SubKitchenCalculatedConsumingData,
} from "../../../../../hooks/producerHooks/producerHooks";
import { useFetchLunchOrdersForCalculate } from '../../../../../hooks/foodOrders/lunchOrders'
import { useQuery } from "react-query";
import { toggleRow } from "../../../../../utility/utility";
// import { toast } from "react-toastify";

export const CalculatorRowMain = ({ data, dishName, sidesName, selectedDish, getTotalMain, isActive, toggleRowVisibility, weekday, alternative, weekNumber, userInfo }) => {
  const totalAvgGuestAmount = data.data.totalAvgGuestAmount !== undefined ? data.data.totalAvgGuestAmount : 0;
  // const sessionGuestAmount = sessionStorage.getItem(`${dishName}.${data._id}:guestAmount`)
  // Fetch lunch orders for the selected week
  const { data: lunchOrders } = useFetchLunchOrdersForCalculate({ weekNumber, weekday, alternative });

  const getLunchOrderAmount = (orders, userId) => {
    const filteredOrder = orders?.find(order => order?._id.username === userId);
    return filteredOrder ? filteredOrder?.alts[0]?.lunchOrders[0]?.amount : null;
  };
  // Fetch the amount based on userId, weekDay, and alt
  const amount = getLunchOrderAmount(lunchOrders, data._id);
  const [guestAmount, setGuestAmount] = useState(amount);
  useEffect(() => {
    setGuestAmount(amount);
  }, [amount, weekday, alternative]);

  const [consumingData, setConsumingData] = useState();
  const [params, setParams] = useState({
  })
  useEffect(() => {
    setParams({
      dishName: dishName,
      sidesName: sidesName,
      guestAmount: isActive ? guestAmount : 0,
      subKitchenName: data._id,
    })
  }, [dishName, sidesName, guestAmount, data._id]);
  const { data: consumingdata } = useQuery(
    ["SubKitchenConsumingDataMain", { params }], () => SubKitchenCalculatedConsumingData(params));
  const customMain = consumingData?.data[0]?.totalMainCustom !== undefined ? consumingData?.data[0]?.totalMainCustom : selectedDish.mainIngredientPerGuest * guestAmount
  const unitMain = consumingData?.data[0]?.records.result.unitMain
  const handleInputChange = (value) => {
    setGuestAmount(parseFloat(value));
  };
  const [totalMainClass, setTotalMainClass] = useState(document.getElementsByClassName('totalMain'))
  const [totalGuestClass, setTotalGuestClass] = useState(document.getElementsByClassName('totalGuestMain'))
  const [resultMain, setResultMain] = useState(0);
  const [resultGuest, setResultGuest] = useState(0)
  const [activeRows, setActiveRows] = useState([]);

  // calculate total
  useEffect(() => {
    const fetchGetTotal = async () => {
      if (totalAvgGuestAmount === 0) {
        return
      }
      else {
        setConsumingData(consumingdata);
        try {
          await getTotalMain({
            resultMain: resultMain,
            unitMain: unitMain,
            resultGuest: resultGuest,
            username: data._id
          });
        } catch (error) {
          console.error("Failed to get total:", error);
        }
      }
    }
    fetchGetTotal();
  }, [totalAvgGuestAmount, consumingdata, resultMain, resultGuest, unitMain, data._id,activeRows]);

  //reset comment
  const [comment, setComment] = useState("")
  useEffect(() => {
    if (dishName && sidesName) {
      // If dishName and sideName are set, retrieve the comment from backend
      setComment(consumingData?.data[0]?.records?.result?.sides?.comment || "");
    } else {
      // Otherwise, reset comment to an empty string
      setComment("");
    }
  }, [dishName, sidesName, consumingData]);
  //TOGGLE ROWS
  useEffect(() => {
    const initArray = [];
    userInfo.forEach((element) => {
      if (element.makeOwnMainDish === selectedDish.makeOwnMainDish &&
        element.makeOwnMainDish === true) {
        initArray.push(element.username);
      }
      setActiveRows([])
    }, [userInfo, dishName]);

    // After creating initArray, toggle each row
    initArray.forEach((username) => {
      toggleRow(username, setActiveRows);
    });
  }, [userInfo, selectedDish,dishName]);
  const [foodReadyTimeHours, setFRTH] = useState("");
  const [foodReadyTimeMinutes, setFRTM] = useState("")
  useEffect(() => {

    userInfo.forEach(e => {
      if (e.username === data?._id) {
        setFRTH(e.foodReadyTime?.hours);
        setFRTM(e.foodReadyTime?.minutes);
      }
    });
  }, [userInfo])
  useEffect(() => {
    setTotalMainClass(document.getElementsByClassName('totalMain'));
    setTotalGuestClass(document.getElementsByClassName('totalGuestMain'))
  }, [activeRows]);
  useEffect(() => {
    const arrayMain = Array.prototype.slice.call(totalMainClass);
    const arrayGuest = Array.prototype.slice.call(totalGuestClass);
    setResultMain(arrayMain.reduce(function (acc, obj) { return acc + Number(obj.innerText); }, 0));
    setResultGuest(arrayGuest.reduce(function (acc, obj) { return acc + Number(obj.value); }, 0));
  }, [
    unitMain,
    activeRows]);
  return (
    <tr
      className={isActive ? '' : 'd-none'}
    >
      <th scope="row">
        <i className="fa-solid fa-eye-slash me-2"
          onClick={() => { toggleRowVisibility(data._id) }}></i>
        {foodReadyTimeHours}:{foodReadyTimeMinutes}
      </th>
      <td>{data._id}</td>
      <td>
      {activeRows.includes(data._id) ? 
      <input
          type="number"
          min={1}
          defaultValue={amount}
          onChange={(e) => handleInputChange(e.target.value)}
        /> :
        <input
          type="number"
          min={1}
          className="totalGuestMain"
          defaultValue={amount}
          onChange={(e) => handleInputChange(e.target.value)}
        />}
        
      </td>
      <td onClick={() => toggleRow(data._id, setActiveRows)}>
        {activeRows.includes(data._id) ?
          <i className="fa-solid fa-ban fa-lg GDS-icon mt-2">
            <span className="font-size-xs GDS-text ms-1">Utför-själv</span>
          </i> : ''}
          {activeRows.includes(data._id) ?
          <span>{customMain.toFixed(1)}</span> : <span className="totalMain">{customMain.toFixed(1)}</span>}
        <span className="font-size-xs">
          ({unitMain ? unitMain : selectedDish.mainIngredientUnit})
        </span>
      </td>
      <td >
        <textarea
          className="font-size-xxs text-center text-danger"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </td>
      <td>
        {data?.data?.totalAverageMainPerGuest ? data?.data?.totalAverageMainPerGuest.toFixed(3) : ""}
        <span className="font-size-xs">
          {unitMain}/pers
        </span>
      </td>
    </tr>
  );
};
