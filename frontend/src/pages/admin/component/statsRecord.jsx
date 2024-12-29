import React, { useState, useContext } from "react";
import "react-router-dom";
import StatsTable from "../../producer/components/lunchStats/subKitchen/statsTableSubKitchen";
import { Modal } from "react-bootstrap";
import { useQuery } from "react-query";
import { getMenu } from '../../../hooks/menu/menu'
import { contextData } from '../../../ContextApi'


function StatsRecord(props) {
    const [searchTerm, setSearchTerm] = useState("");
    const [dishname, setDishname] = useState("")
    //dishes pop up
    const [showDish, setShowDish] = useState(false);
    const handleCloseDish = () => setShowDish(false);
    const handleShowDish = () => setShowDish(true);
    //get user info
    const { userdata } = useContext(contextData)
    // search bar
    const { data: menu } = useQuery("getMenu", getMenu);
    // search bar
    const searchArray = menu?.data[0]?.menu?.filter((dish) => {
        return dish?.dishName.toLowerCase().includes(searchTerm)
    });

    return (
        <>
            <div className="d-block m-auto mt-4">
                <div className="input-group-sm formFrame m-auto mb-5">
                    <input
                        type="search"
                        className="form-control m-auto searchWindow w-50"
                        placeholder="Sök maträtten"
                        aria-label="Sök..."
                        aria-describedby="button-addon2"
                        onChange={(e) => {
                            e.preventDefault();
                            setSearchTerm(e.target.value.toLocaleLowerCase());
                        }}
                        value={searchTerm}
                    />
                </div>
                <div className="searchResult">
                    <div>
                        <ul>
                            <li>{searchArray?.map((props, index) => {
                                return (
                                    <>
                                        <button
                                            key={index}
                                            className="stats_card w-100 mb-2"
                                            variant="primary"
                                            onClick={() => { setDishname(props.dishName); handleShowDish() }}
                                        >
                                            <span className="font-size-xs">{props.dishName}</span>
                                        </button>
                                    </>
                                );
                            })}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* ==== dish ====*/}
            <Modal show={showDish} onHide={handleCloseDish}>
                <StatsTable
                    props={dishname} kitchenId={props.props} isAdmin={userdata.isAdmin}
                />
            </Modal>
        </>
    );
}

export default StatsRecord;
