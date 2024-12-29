import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import { getKitchenFunctionContentForClient } from "../../../hooks/security/useUserLogin"
import { useQuery } from "react-query";
import { Modal } from "react-bootstrap";
import LunchOrders from './lunchOrders'
const Lunch = () => {
  const navigate = useNavigate();
  const { data: functionContent } = useQuery(
    ["getKitchenFunctionContentForClient",],
    () => getKitchenFunctionContentForClient());
  // window show
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (<>
      {functionContent?.data[0]?.lunchStatistik
        ? <button
          className="mainButton mb-4 p-1"
          onClick={() => navigate("/newStats")}
        >
          <span>Ny Lunch Statistik</span>
        </button>
        : <></>}
      {functionContent?.data[0]?.lunchStatistik
        ? <button
          className="mainButton mb-3 p-1"
          onClick={() => navigate("/statsRecord")}
        >
          <span>Statistik</span>
        </button>
        : <></>}
      {functionContent?.data[0]?.lunchStatistikReceiver
        ? <button
          className="mainButton mb-3 p-1"
          onClick={() => navigate("/subKitchen")}
        >
          <span style={{ fontSize: "11px" }}>Mottagningsköks Statistik</span>
        </button>
        : <></>}
      {functionContent?.data[0]?.lunchIngredients
        ? <button
          className="mainButton mb-3 p-1"
          onClick={() => navigate("/DailyMealIngredients")}
        >
          <span style={{ fontSize: "11px" }}>Dagens Lunch innehåll</span>
        </button>
        : <></>}
      {functionContent?.data[0]?.special_production
        ? <button
          className="mainButton mb-3 p-1"
          onClick={() => navigate("/SpecialKost_production")}
        >
          <span style={{ fontSize: "11px" }}>SpecialKost</span>
        </button>
        : <></>}
      <button className="mainButton mb-3 p-1"
        onClick={handleShow}
      >
        <span style={{ fontSize: "11px" }}>Enhetlig lunch beställning</span>
      </button>
    <Modal fullscreen={true} show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Lunch beställning</Modal.Title>
      </Modal.Header>
      <Modal.Body>{<LunchOrders />}</Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  </>
  );
};

export default Lunch;
