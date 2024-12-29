/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import {
  SubKitchenCalculatedConsumingData,
} from "../../../../../hooks/producerHooks/producerHooks";
import { useFetchLunchOrdersForCalculate } from '../../../../../hooks/foodOrders/lunchOrders'
import { useQuery } from "react-query";
import { toggleRow } from "../../../../../utility/utility";

export const CalculatorRowSideAndSauce = ({ data, dishName, sidesName, selectedDish, getTotal, isActive, toggleRowVisibilitySide, weekday, alternative, weekNumber, userInfo }) => {
  const totalAvgGuestAmount = data.data.totalAvgGuestAmount !== undefined ? data.data.totalAvgGuestAmount : 0;
  // Fetch lunch orders for the selected week
  const { data: lunchOrders } = useFetchLunchOrdersForCalculate({ weekNumber, weekday, alternative });

  // Function to filter the data and get the amount for a specific user, weekDay, and alt
  const getLunchOrderAmount = (orders, userId) => {
    // Filter the orders based on userId, weekDay, and alt
    const filteredOrder = orders?.find(order =>
      order?._id.username === userId
    );
    // If order exists, return the amount, otherwise return null or 0
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
    ["SubKitchenCalculatedConsumingData", { params }], () => SubKitchenCalculatedConsumingData(params));
  const customSide = consumingData?.data[0]?.totalSideCustom !== undefined ? consumingData?.data[0]?.totalSideCustom : selectedDish.sideIngredientPerGuest * guestAmount
  const customSauce = consumingData?.data[0]?.totalSauceCustom !== undefined ? consumingData?.data[0]?.totalSauceCustom : selectedDish.sauseSoupPerGuest * guestAmount
  const unitSide = consumingData?.data[0]?.records.result.sides.unitSide;

  const handleInputChange = (value) => {
    setGuestAmount(parseFloat(value));
  };
  const [totalSideClass, setTotalSideClass] = useState(document.getElementsByClassName('totalSide'))
  const [totalSauceClass, setTotalSauceClass] = useState(document.getElementsByClassName('totalSauce'))
  const [totalGuestClass, setTotalGuestClass] = useState(document.getElementsByClassName('totalGuest'))
  const [resultSide, setResultSide] = useState(0);
  const [resultSauce, setResultSauce] = useState(0);
  const [resultGuest, setResultGuest] = useState(0);
  // calculate total
  useEffect(() => {
    const fetchGetTotal = async () => {
      if (totalAvgGuestAmount === 0) {
        return
      }
      else {
        setConsumingData(consumingdata);
        try {
          await getTotal({
            resultSide: resultSide,
            resultSauce: resultSauce,
            unitSide: unitSide,
            resultGuest: resultGuest,
            username: data._id
          });
        } catch (error) {
          console.error("Failed to get total:", error);
        }
      }
    }
    fetchGetTotal();
  }, [totalAvgGuestAmount, consumingdata, resultSide, resultSauce, resultGuest, unitSide, data._id]);
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
  //toggle  icon
  const [activeRowsSide, setActiveRowsSide] = useState([]);
  useEffect(() => {
    const initArray = [];
    userInfo.forEach((element) => {
      if (element.makeOwnSide === selectedDish.makeOwnSide &&
        element.makeOwnSide === true) {
        initArray.push(element.username);
      }
      setActiveRowsSide([])
    }, [userInfo, dishName]);
    // After creating initArray, toggle each row
    initArray.forEach((username) => {
      toggleRow(username, setActiveRowsSide);
    });
  }, [userInfo, selectedDish]);
  const [activeRowsSauce, setActiveRowsSauce] = useState([]);
  useEffect(() => {
    const initArray = [];
    userInfo.forEach((element) => {
      if (element.makeOwnSauce === selectedDish.makeOwnSauce &&
        element.makeOwnSauce === true) {
        initArray.push(element.username);
      }
    });
    setActiveRowsSauce([])
    // After creating initArray, toggle each row
    initArray.forEach((username) => {
      toggleRow(username, setActiveRowsSauce);
    });
  }, [userInfo, selectedDish, dishName]);
  const [foodReadyTimeHours, setFRTH] = useState("");
  const [foodReadyTimeMinutes, setFRTM] = useState("")
  useEffect(() => {

    userInfo.forEach(e => {
      if (e.username === data?._id) {
        setFRTH(e.foodReadyTime?.hours);
        setFRTM(e.foodReadyTime?.minutes);
      }
    });
  }, [userInfo]);
  useEffect(() => {
    setTotalSideClass(document.getElementsByClassName('totalSide'));
    setTotalSauceClass(document.getElementsByClassName('totalSauce'));
    setTotalGuestClass(document.getElementsByClassName('totalGuest'));
  }, [activeRowsSide, activeRowsSauce]);
  useEffect(() => {
    const arraySide = Array.prototype.slice.call(totalSideClass);
    const arraySauce = Array.prototype.slice.call(totalSauceClass);
    const arrayGuest = Array.prototype.slice.call(totalGuestClass);
    setResultSide(arraySide.reduce(function (acc, obj) { return acc + Number(obj.innerText); }, 0));
    setResultSauce(arraySauce.reduce(function (acc, obj) { return acc + Number(obj.innerText); }, 0));
    setResultGuest(arrayGuest.reduce(function (acc, obj) { return acc + Number(obj.value); }, 0));
  }, [
    unitSide,
    activeRowsSide,
    activeRowsSauce]);
  return (
    <tr
      className={isActive ? '' : 'd-none'}
    >
      <th scope="row">
        <i className="fa-solid fa-eye-slash me-2"
          onClick={() => { toggleRowVisibilitySide(data._id) }}></i>
        {foodReadyTimeHours}:{foodReadyTimeMinutes}
      </th>
      <td>{data._id}</td>
      <td>
        <input
          type="number"
          className="totalGuest"
          min={1}
          defaultValue={amount}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </td>
      <td onClick={() => toggleRow(data._id, setActiveRowsSide)}>
        {activeRowsSide.includes(data._id) ?
          <i className="fa-solid fa-ban fa-lg GDS-icon mt-2">
            <span className="font-size-xs GDS-text ms-1">Utför-själv</span>
          </i> : ''}
        {activeRowsSide.includes(data._id) ?
          <span>{customSide.toFixed(1)}</span> : <span className="totalSide">{customSide.toFixed(1)}</span>}
        <span className="font-size-xs">
          ({unitSide ? unitSide : selectedDish.sideIngredientUnit})
        </span>
      </td>
      <td onClick={() => toggleRow(data._id, setActiveRowsSauce)}>
        {activeRowsSauce.includes(data._id) ?
          <i className="fa-solid fa-ban fa-lg GDS-icon mt-2">
            <span className="font-size-xs GDS-text ms-1">Utför-själv</span>
          </i> : ''}
        {activeRowsSauce.includes(data._id) ?
          <span>{customSauce.toFixed(1)}</span> : <span className="totalSauce">{customSauce.toFixed(1)}</span>}
        <span className="font-size-xs">
          /(Liter)
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
        {data?.data?.totalAverageSidePerGuest ? data?.data?.totalAverageSidePerGuest.toFixed(0) : ""}
        <span className="font-size-xs">
          pers/{unitSide}
        </span>
      </td>
    </tr>
  );
};