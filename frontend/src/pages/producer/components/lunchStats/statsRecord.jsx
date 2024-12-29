/* eslint-disable react/prop-types */
import React, { useState, } from "react";
import "react-router-dom";
import { useQuery } from "react-query";
import { getMenu } from '../../../../hooks/menu/menu'
import StatsTable from "./statsTable";
import Modal from "react-bootstrap/Modal";
import Spinner from "../../../../Partials/Spinner";
// import  from '../../../../Partials/'

function StatsRecord() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dishname, setDishname] = useState("")
  const { data: menu, error, isLoading } = useQuery("getMenu", getMenu);

  // search bar
  const searchArray = menu?.data[0]?.menu?.filter((dish) => {
    return dish?.dishName.toLowerCase().includes(searchTerm)
  });

  // Error and Loading states
  if (error) return <div>Nånting gick fel</div>;
  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );

  return (
    <>
      <input
        type="search"
        className="form-control m-auto mb-4 mt-4 searchWindow w-50"
        placeholder="Sök maträtten"
        aria-label="Sök..."
        aria-describedby="button-addon2"
        onChange={(e) => {
          e.preventDefault();
          setSearchTerm(e.target.value.toLocaleLowerCase());
        }}
        value={searchTerm.toLowerCase()}
      />
      <div className="searchResult">
        <ul>
          <li>{searchArray?.map((props, index) => {
            return (
              <>
                <button
                  key={index + props.dishName}
                  className="stats_card w-50 mb-2 m-auto"
                  onClick={() => { setDishname(props.dishName); handleShow() }}
                >
                  <span className="font-size-xs">{props.dishName}</span>
                </button>
              </>
            );
          })}
          </li>
        </ul>
      </div>
      <Modal show={show} onHide={handleClose}>
        <StatsTable
          props={dishname}
        />
      </Modal>
    </>
  );
}

export default StatsRecord;
