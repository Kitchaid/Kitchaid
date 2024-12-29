/* eslint-disable react/prop-types */
import React, { useState,useEffect } from "react";
import { toggleRow } from '../../../../../utility/utility'


const LogTable = (props) => {
    const avgMain = props.avgMain;
    const avgSide = props.avgSide;
    const item = props.item ? props.item : [];
    const index = props.index;
    const selectedDish = props.selectedDish;
    const setMainSelected = props.setMainSelected;
    const setSideSelected = props.setSideSelected;
    const setSauceSelected = props.setSauceSelected;
    const setActiveRows = props.setActiveRows;
    const setActiveRowsSide = props.setActiveRowsSide;
    const setActiveRowsSas = props.setActiveRowsSas;
    const activeRows = props.activeRows;
    const activeRowsSide = props.activeRowsSide;
    const activeRowsSas = props.activeRowsSas;
    const userInfo = props.userInfo;
    const [foodReadyTimeHours, setFRTH ]= useState("");
    const [foodReadyTimeMinutes, setFRTM ]= useState("")
      useEffect(()=>{
        userInfo.forEach(e => {
            if(e.username === item?._id) {
                setFRTH(e.foodReadyTime?.hours);
                setFRTM(e.foodReadyTime?.minutes);}
        });
    },[userInfo])
    const totalAvgGuestAmount = item?.data?.totalAvgGuestAmount ? item?.data?.totalAvgGuestAmount.toFixed(0) : 1;
    const totalAvgMain = item?.data?.totalAvgMain ? item?.data?.totalAvgMain.toFixed(1) : undefined;
    const unitMain = item?.data?.records?.result?.unitMain ? item?.data?.records?.result?.unitMain : ""
    const totalAvgSide = item?.data?.totalAvgSide ? item?.data?.totalAvgSide.toFixed(2) : undefined;
    const unitSide = item?.data?.records?.result?.sides.unitSide ? item?.data?.records?.result?.sides.unitSide : ""
    const stewSoup = item?.data?.records?.result?.stewSoup ? item?.data?.records?.result?.stewSoup.toFixed(2) : selectedDish.sauseSoupPerGuest;
   
    return (
        <tbody className="text-left">
            <tr
                key={index}
                className={index % 2 !== 0 ? "odd-row" : "even-row"}
            >
                <th className="text-light" scope="row">{foodReadyTimeHours}:{foodReadyTimeMinutes}</th>
                <td className="text-light">{item._id}</td>
                <td className="text-light">{totalAvgGuestAmount}</td>
                <td onClick={() => toggleRow(item._id, setActiveRows,totalAvgMain, setMainSelected)} className='cursor text-light'>
                    {activeRows.includes(item._id) ?
                        <i className="fa-solid fa-ban fa-lg GDS-icon mt-2">
                            <span className="font-size-xs GDS-text ms-1">Utför-själv</span>
                        </i> : ''}
                    {totalAvgMain ? totalAvgMain : selectedDish.mainIngredientPerGuest}
                    <span className="font-size-xs">
                        {unitMain === "" ? `(${selectedDish.mainIngredientUnit})` : `(${unitMain})`}
                    </span>
                </td>
                <td onClick={() => toggleRow(item._id, setActiveRowsSide, totalAvgSide, setSideSelected)} className='cursor text-light'>
                    {activeRowsSide.includes(item._id) ?
                        <i className="fa-solid fa-ban fa-lg GDS-icon mt-2">
                            <span className="font-size-xs GDS-text ms-1">Utför-själv</span>
                        </i> : ''}
                    {totalAvgSide === '0.01' || totalAvgSide === undefined ?
                    selectedDish.sideIngredientPerGuest : totalAvgSide}
                    <span className="font-size-xs">
                    {unitSide === "" ? `(${selectedDish.sideIngredientUnit})` : `(${unitSide})`}
                    </span>
                </td>
                <td onClick={() => toggleRow(item._id, setActiveRowsSas, stewSoup, setSauceSelected)} className='cursor text-light'>
                    {activeRowsSas.includes(item._id) ?
                        <i className="fa-solid fa-ban fa-lg GDS-icon mt-2">
                            <span className="font-size-xs GDS-text ms-1">Utför-själv</span>
                        </i> : ''}
                    {stewSoup}
                    <span className="font-size-xs">
                    {stewSoup === "" ? "" : "(Liter)"}
                    </span>
                </td>
                <td className="text-light">
                    {avgMain}
                    <span className="font-size-xs text-light">
                        ({unitMain})
                    </span>
                    /
                    {avgSide}
                    <span className="font-size-xs text-light">
                        (pers/{unitSide})
                    </span>
                </td>
            </tr>
        </tbody>
    );
};
export default LogTable;