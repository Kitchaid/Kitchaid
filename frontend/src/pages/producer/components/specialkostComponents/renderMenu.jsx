/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { getMenu } from '../../../../hooks/menu/menu'
import { useQuery } from "react-query";
import { Col, Modal, Row } from "react-bootstrap";
import {
    getSubKitchenId,
} from "../../../../hooks/producerHooks/producerHooks";
import { getAllValueFromSelect } from '../../../../utility/utility'

export default function Menu({getColor,getAllergic}) {
    const [showTypeColor, setShowTypeColor] = useState(false);
    const handleCloseTypeColor = () => setShowTypeColor(false);
    const handleShowTypeColor = () => setShowTypeColor(true);

    const [color, setColor] = useState('');
    const [dishName, setDishName] = useState('')
    const handleShow = () => {
        if (dishName === '') { alert('Välj maträtten först'); return }
        else { handleShowTypeColor() }
    }
    //get subKitchenId and name
    const { data: subKitchenUsers } = useQuery(
        "getSubKitchenId",
        getSubKitchenId
    );
    const [chosenUsers, setChosenUsers] = useState([]);
    const toggleSelection = (user) => {
        if (chosenUsers?.includes(user)) {
            const updatedChosenUsers = chosenUsers.filter(chosenType => chosenType !== user);
            setChosenUsers(updatedChosenUsers.sort());
        } else {
            setChosenUsers([...chosenUsers, user]);
        }
    };
    // get menu
    const { data: get_menu } = useQuery("getMenu", getMenu);
    // get allergic
    const [selectedOption, setSelectedOption] = useState({ allergic: [] });
    // Call getAllergic whenever selectedOption is updated
    useEffect(() => {
        if (selectedOption.allergic) {
            getAllergic(selectedOption.allergic);
        }
    }, [selectedOption]);
    // set color for dish

    const [colorSetForDish, setColorSetForDish] = useState([]);
    const handleClick = () => {
        const newColorSet = {
            dishName: dishName,
            dishColor: color,
            users: chosenUsers
        };
        setColorSetForDish(newColorSet);
        handleCloseTypeColor()
    };
    useEffect(()=>{
        getColor(colorSetForDish)
    },[colorSetForDish])
    return <>
        <Row className="mb-2">
            <Col sm={10}>
                <select
                    name="dishName"
                    className="form-select"
                    onChange={(e) => setDishName(e.target.value)}
                    onBlur={(e) => getAllValueFromSelect(e, get_menu?.data[0]?.menu, setSelectedOption)}
                >
                    <option value={""} disabled selected>Välj maträtten</option>
                    {get_menu?.data[0]?.menu?.map((menu, index) => {
                        return (
                            <option key={index + `${menu?.dishName}`} value={menu?.dishName}>
                                {menu?.dishName}
                            </option>
                        );
                    })}
                </select>
            </Col>
            <Col sm={2}>
                <i className="fa-solid fa-circle cursor mt-2"
                    style={{ color: color }}
                    onClick={handleShow}
                >
                </i>
                <span className="font-size-xs ms-1">#Tag</span>
            </Col>
        </Row>
        <Modal show={showTypeColor} onHide={handleCloseTypeColor} size="lg">
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <input
                    className="w-100"
                    type="color"
                    id="exampleColorInput"
                    value={color}
                    title="Choose your color"
                    onChange={(e) => { setColor(e.target.value) }}
                />
                <hr></hr>
                <div className="special-type-group font-size-s">
                    {subKitchenUsers?.data?.map((user, index) => {
                        return <>
                            <span
                                className={chosenUsers?.includes(user?.username) ?
                                    "special_type button_size cursor" :
                                    'button_size special_type_light cursor'}
                                key={index+`${user?.username}`}
                                onClick={() => toggleSelection(user?.username)}
                            >{user.username}</span>
                        </>
                    })}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={handleClick}>klart</button>
            </Modal.Footer>
        </Modal>
    </>
}