/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "react-router-dom";
import Spinner from "../../../../Partials/Spinner";
import StatsTable from "./subKitchen/statsTableSubKitchen";
import { getSubKitchenId } from "../../../../hooks/producerHooks/producerHooks";
import { Button, Modal } from "react-bootstrap";
import { useQuery } from "react-query";
import { getMenu } from '../../../../hooks/menu/menu'
import Logbooks from './subKitchen/logbooktables'
// import { useReactToPrint } from "react-to-print";


function StatsRecord() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dishname, setDishname] = useState("")
  const [showInfo, setShowInfo] = useState(false);
  const [id, setId] = useState("6408a5b93fa56cd835cd1083");
  //dish pop up
  const [showDish, setShowDish] = useState(false);
  const handleCloseDish = () => setShowDish(false);
  const handleShowDish = () => setShowDish(true);

  //get subKitchenId and name
  const { data, isLoading, error } = useQuery(
    "getSubKitchenId",
    getSubKitchenId
  );

  // search bar
  const { data: menu } = useQuery("getMenu", getMenu);
  // search bar
  const searchArray = menu?.data[0]?.menu?.filter((dish) => {
    return dish?.dishName.toLowerCase().includes(searchTerm)
  });
  // render logbooks
  const [logbookComponents, setLogbookComponents] = useState([]);
  const addLogbook = () => {
    setLogbookComponents([...logbookComponents, <Logbooks key={logbookComponents.length} />]);
  };

  const removeLogbook = (index) => {
    const updatedLogbookComponents = [...logbookComponents];
    updatedLogbookComponents.splice(index, 1);
    setLogbookComponents(updatedLogbookComponents);
  };
  const renderNextComponen = () => {
    if (logbookComponents.length === 0) {
      return <></>;
    } else {
      return <>
        <i className="fa-solid fa-circle-plus glow ms-4 cursor" onClick={addLogbook}></i>
        <span className="font-size-xs ms-2">Lägg till maträtt</span>
      </>
    }
  }
  //print out list
  // const componentRef = useRef();
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef?.current,
  //   documentTitle: "Lunch statistik -- Kitchaid",
  // });
  // const getPageMargins = () => {
  //   return `@page { margin: 25mm 10mm 0 10mm !important; }`;
  // };
  if (isLoading) {
    return <div>{<Spinner />}</div>;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <select
        onChange={(event) => {
          setId(event.target.value)
        }}
        className="form-control m-auto mb-4 mt-4 searchWindow w-50"
      >
        <option value={"6408a5b93fa56cd835cd1083"}>
          Välj mottagningskök
        </option>
        {data?.data.map((kitchen) => {
          return (
            <option key={kitchen?._id} value={kitchen?._id}>
              {kitchen?.username}
            </option>
          );
        })}
      </select>
      <div className="input-group-sm  mb-3 m-auto w-50">
        <input
          type="search"
          className="form-control m-auto mb-4 mt-4 searchWindow"
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
                    key={index + props.dishName}
                    className="stats_card w-50 mb-2 m-auto"
                    onClick={() => { setDishname(props.dishName); handleShowDish() }}
                  >
                    <span
                      className="font-size-xs"
                      key={index}
                    >{props.dishName}</span>
                  </button>
                </>
              );
            })}
            </li>
          </ul>
        </div>
      </div>
      <Button className="mainButton" onClick={() => setShowInfo(true)}>
        <span>Loggböcker</span>
      </Button>
      {/* ==== info ==== */}
      <Modal show={showInfo} onHide={() => setShowInfo(false)} fullscreen={true}>
        <Modal.Header closeButton>
          <Modal.Title>Loggböcker</Modal.Title>
        </Modal.Header>
        {/* <div ref={componentRef}>
          <style media='print'>{getPageMargins()}</style> */}
        <Logbooks />
        <div>
          <i className="fa-solid fa-circle-plus glow ms-4 cursor" onClick={addLogbook}></i>
          <span className="font-size-xs ms-2">Lägg till maträtt</span>
          {logbookComponents?.map((logbook, index) => (
            <div key={index + logbook}>
              {logbook}
              <i className="fa-solid fa-circle-minus glow ms-4" onClick={() => removeLogbook(index)}></i>
              <span className="font-size-xs ms-2">Ta bort maträtten</span>
            </div>
          ))}
          {renderNextComponen()}
        </div>
        {/* </div> */}
        <Modal.Footer>
          {/* <div className="printForm printer-icon" onClick={handlePrint}>
            <span className="glow">Utskriv</span><i className="fa-solid fa-print glow ms-3"></i>
          </div> */}
          <div className="me-5"><span>Kitchaid.se</span></div>
        </Modal.Footer>
      </Modal>
      {/* ==== dish ====*/}
      <Modal show={showDish} onHide={handleCloseDish}>
        <StatsTable
          props={dishname} kitchenId={id}
        />
      </Modal>

    </>
  );
}

export default StatsRecord;