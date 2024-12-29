/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Menu from './renderMenu'
import { Col, Row } from "react-bootstrap";

export default function GetMenu({getColorForDish, getWeekDay, getAllergicTypes}) {
/* ========== render menu ================ */
const [menu, setMenu] = useState([]); 
const [allergicTypeArray, setAllergicTypeArray] = useState([]); // To store allergic data
const [getColorSet, setGetColorSet] = useState();
const [weekDay, setWeekDay] = useState(0);
// This will be passed down to Menu component to fetch its allergic data
const getColor = (colorSet) => {
    setGetColorSet(colorSet)
}

// Function to add a new menu and its allergic info
const addMenu = () => {
    const newMenu = <Menu key={menu.length} getColor={getColor} getAllergic={(allergic) => handleAddAllergic(allergic, menu.length)} />;
    setMenu([...menu, newMenu]);
};

// Function to remove a menu and its allergic info by index
const removeMenu = (index) => {
    const updatedMenu = [...menu];
    updatedMenu.splice(index, 1);
    setMenu(updatedMenu);
    // Remove corresponding allergic data
    handleRemoveAllergic(index);
};

// Handle adding allergic info
const handleAddAllergic = (allergic, index) => {
    setAllergicTypeArray(prev => {
        const newAllergics = [...prev];
        newAllergics[index] = allergic; // Store allergic data by index
        return newAllergics;
    });
};

// Handle removing allergic info when a menu is removed
const handleRemoveAllergic = (index) => {
    setAllergicTypeArray(prev => {
        const newAllergics = [...prev];
        newAllergics.splice(index, 1); // Remove the allergic data for the removed menu
        return newAllergics;
    });
};

// Pass the color and weekday info to parent props
useEffect(()=>{
    getAllergicTypes(allergicTypeArray);
    getColorForDish(getColorSet);
    getWeekDay(weekDay);
},[allergicTypeArray,getColorSet,weekDay])

return (
    <>
        <div>
            <select className="form-control mt-4 mb-3" onChange={(e) => setWeekDay(e.target.value)}>
                <option value="" selected disabled>Välj dag</option>
                <option value="1">Måndag</option>
                <option value="2">Tisdag</option>
                <option value="3">Onsdag</option>
                <option value="4">Torsdag</option>
                <option value="5">Fredag</option>
            </select>
        </div>
        <hr></hr>
        <Row className="w-100">
            <Col sm={2}>
                <i className="fa-solid fa-circle-plus glow ms-2 cursor mt-2" onClick={addMenu}></i>
                <span className="font-size-xs ms-1 mt-2">Lägg till maträtt</span>
            </Col>
            <Col sm={10}>
                {menu.map((menu, index) => (
                    <Row key={index+`${menu}`}>
                        <Col sm={10}>
                            {menu}
                        </Col>
                        <Col sm={2}>
                            <i className="fa-solid fa-circle-minus glow mt-2" onClick={() => removeMenu(index)}></i>
                            <span className="font-size-xs ms-1">Ta bort</span>
                        </Col>
                    </Row>
                ))}
            </Col>
        </Row>
        <hr></hr>
    </>
);
}
