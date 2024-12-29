import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import UpdateClient from './updates';
import { getSpecialType } from '../../../../hooks/admin/superiorAdmin';
import {
    fetchTotalByFilter,
} from "../../../../hooks/producerHooks/producerHooks";
import { useQuery } from "react-query";
import GetMenu from "./getMenu";
// import { toggleRow } from "../../../../utility/utility";

export function Table({ Special, filterArray, AllergicTypesFromDishes }) {
    const [itemId, setItemId] = useState('');
    const [activeRows, setActiveRows] = useState([]); // Tracks hidden guests' IDs
    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    const [showHiddenGuest, setShowHiddenGuest] = useState(false);
    const handleCloseHiddenGuest = () => setShowHiddenGuest(false);

    const { data: type } = useQuery("getSpecialtype", getSpecialType);

    const [visibleUsers, setVisibleUsers] = useState(Special);  // Track visible users

    const [getColorSet, setGetColorSet] = useState();
    const [weekDay, setWeekDay] = useState();
    const [colorSetArray, setColorSetArray] = useState([]);
    useEffect(() => {
        if (getColorSet && typeof getColorSet === 'object') {
            const colorArray = Object.values(getColorSet);
            setColorSetArray(prevColorSetArray => {
                const updatedArray = [...prevColorSetArray];
                for (let i = 0; i < colorArray.length; i += 3) {
                    const name = colorArray[i];
                    const color = colorArray[i + 1];
                    const values = colorArray[i + 2];

                    const existingIndex = updatedArray?.findIndex(item => item.name === name);

                    if (existingIndex !== -1) {
                        updatedArray[existingIndex].color = color;
                        updatedArray[existingIndex].values = values;
                    } else {
                        updatedArray.push({ name, color, values });
                    }
                }
                return updatedArray;
            });
        }
    }, [getColorSet]);

    // Reset when weekDay changes
    useEffect(() => {
        if (weekDay) {
            // Reset visibleUsers to show all users when weekDay changes
            setVisibleUsers(Special);
            setActiveRows([]); // Reset activeRows since no one should be hidden
        }
    }, [weekDay, Special]);

    // Handle toggling row (hiding/showing guests)
    // const handleToggleRow = (id) => {
    //     // Add or remove guest from activeRows (hidden guests)
    //     toggleRow(id, setActiveRows);

    //     // Update visible users based on the activeRows
    //     setVisibleUsers(prevVisibleUsers => {
    //         if (activeRows.includes(id)) {
    //             // If guest is currently hidden, restore them to visibleUsers
    //             return Special;
    //         } else {
    //             // If guest is visible, hide them from visibleUsers
    //             return prevVisibleUsers?.filter(user => user._id !== id);
    //         }
    //     });
    // };
    // Handle toggling row (hiding/showing guests)
    const handleToggleRow = (id) => {
        // Add or remove guest from activeRows (hidden guests)
        //  toggleRow(id, setActiveRows);
        setActiveRows(prevActiveRows => {
            const isCurrentlyHidden = prevActiveRows.includes(id);

            // Update activeRows
            const updatedActiveRows = isCurrentlyHidden
                ? prevActiveRows.filter(rowId => rowId !== id) // Unhide the guest
                : [...prevActiveRows, id]; // Hide the guest

            // Update visible users based on updated activeRows
            setVisibleUsers(Special.filter(user => !updatedActiveRows.includes(user._id)));

            return updatedActiveRows;
        });
    };

    // handleHiddenUsersChange(visibleUsers);
    const getColorForDish = (colorSet) => setGetColorSet(colorSet);
    const getWeekDay = (weekDay) => setWeekDay(weekDay);
    //getAllergicTypes
    const [allergic, setAllergic] = useState([]);
    const getAllergicTypes = (allergic) => {
        setAllergic(allergic)
    };
    useEffect(() => {
        AllergicTypesFromDishes(allergic);
    }, [allergic])
    const setBackgroundColor = (username) => {
        const colorObj = colorSetArray?.find(obj => obj.values.includes(username));
        return colorObj ? colorObj.color : '';
    };
    const { data: total } = useQuery(["getTotal", Object.assign(filterArray, { activeRows: activeRows })], () => fetchTotalByFilter(filterArray),
    );
    return (
        <>
            <GetMenu getColorForDish={getColorForDish} getWeekDay={getWeekDay} getAllergicTypes={getAllergicTypes} />
            <table className="table table-striped text-center mb-3 overflow font-size-xs">
                <thead>
                    <tr>
                        <th scope="col">Dölj
                            <i className="fa-solid fa-eye ms-2 cursor" onClick={() => setShowHiddenGuest(true)}></i>
                        </th>
                        <th scope="col">Namnet</th>
                        <th scope="col">Allergi mot</th>
                        <th scope="col">Tillhör</th>
                        <th scope="col">Portion</th>
                        <th scope="col">kommentar</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                {visibleUsers?.map((special, index) => (
                    <tbody key={index} className="text-center mb-3">
                        <tr
                            key={special?._id}
                            className={activeRows.includes(special?._id) ? 'd-none' : ''}
                        >
                            <th scope="row">
                                <i className="fa-solid fa-eye-slash" onClick={() => handleToggleRow(special._id)}></i>
                            </th>
                            <td key={index}>{special.person_name}</td>
                            <td>
                                {special?.allergic?.map((item, index) => {
                                    const matchingType = type?.data?.Special_type[0]?.special_type?.find(typeObj => typeObj.s_type === item);
                                    const typeColor = matchingType ? matchingType.color : '';
                                    return (
                                        <span style={{ backgroundColor: typeColor }} key={index}>
                                            &nbsp;{item}&nbsp;
                                        </span>
                                    );
                                })}
                            </td>
                            <td>
                                <span className="font-weight-md" style={{ backgroundColor: setBackgroundColor(special?.username) }}>
                                    {special?.username}
                                </span>
                                <br /><span className="font-size-xs">{special?.section}</span>
                            </td>
                            <td>{special?.portion}</td>
                            <td>{special?.comment}</td>
                            <td>
                                <span type="button" onClick={() => { handleShowUpdate(); setItemId(special._id); }}>
                                    <i className="fa-solid fa-file-pen glow"></i>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </table>
            <table className="table table-striped text-center mb-3">
                <thead>
                    <tr>
                        <th scope="col">Total:</th>
                        {total?.data?.map((item, index) => {
                            const matchingType = type?.data?.Special_type[0]?.special_type?.find(typeObj => typeObj.s_type === item?.type);
                            const typeColor = matchingType ? matchingType.color : '';
                            return (
                                <th scope="col" key={index}>
                                    <span className="font-size-xs" style={{ backgroundColor: typeColor }}>
                                        {item?.type}: {item?.total[0]?.TotalSpecial}st
                                    </span>
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody></tbody>
            </table>

            {/* Update Modal */}
            <Modal show={showUpdate} onHide={handleCloseUpdate}>
                <Modal.Header closeButton>
                    <Modal.Title>Uppdatera specialkost</Modal.Title>
                </Modal.Header>
                <UpdateClient itemId={itemId} />
            </Modal>

            {/* Hidden Guest Modal */}
            <Modal show={showHiddenGuest} onHide={handleCloseHiddenGuest} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Återställ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-striped text-center mb-3 overflow font-size-xs">
                        <thead>
                            <tr>
                                <th scope="col">Återställ</th>
                                <th scope="col">Namnet</th>
                                <th scope="col">Allergi mot</th>
                                <th scope="col">Tillhör</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeRows?.map((id) => {
                                const special = Special?.find(user => user._id === id); // Get the hidden guest from Special
                                return (
                                    special && (
                                        <tr key={special?._id}>
                                            <th scope="row">
                                                <i className="fa-solid fa-eye" onClick={() => handleToggleRow(id)}></i>
                                            </th>
                                            <td>{special?.person_name}</td>
                                            <td>
                                                {special?.allergic?.map((item, index) => {
                                                    const matchingType = type?.data?.Special_type?.[0]?.special_type?.find(typeObj => typeObj.s_type === item);
                                                    const typeColor = matchingType ? matchingType.color : '';
                                                    return (
                                                        <span style={{ backgroundColor: typeColor }} key={index}>
                                                            &nbsp;{item}&nbsp;
                                                        </span>
                                                    );
                                                })}
                                            </td>
                                            <td>
                                                <span className="font-weight-md">{special?.username}</span>
                                                <br />{special?.section}
                                            </td>
                                        </tr>
                                    )
                                );
                            })}
                        </tbody>
                    </table>
                </Modal.Body>

            </Modal>
        </>
    );
}
