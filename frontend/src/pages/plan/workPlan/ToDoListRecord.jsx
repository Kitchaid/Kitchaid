/* eslint-disable react/prop-types */
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useQuery } from 'react-query';
import { getPlans, UpdatePlan, DeletePlans, DeleteOnePlan } from "../../../hooks/plan/workPlanHooks.js";
import Spinner from '../../../Partials/Spinner'
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ToDoListRecord(props) {
  const [show, setShow] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const handleSmClose = () => setSmShow(false);
  const handleSmShow = () => setSmShow(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [id, setId] = useState();
  // Using the fetching hook
  let weekNumber = props.weekNumber
  let weekday = props.weekday
  const { data, error, isLoading } = useQuery(
    ['getPlans', weekday, weekNumber], () => getPlans(weekday, weekNumber),
    {
      refetchInterval: 1000
    }
  );
  const renderWeekDay = () => {
    if (weekday === '1') return "Måndag";
    if (weekday === '2') return "Tisdag";
    if (weekday === '3') return "Onsdag";
    if (weekday === '4') return "Torsdag";
    if (weekday === '5') return "Fredag";
  }
  //delete all
  const { mutate: Delete } = DeletePlans()
  const handleDeleteAll = (weekNumber, weekday) => {
    Delete({ weekNumber, weekday })
  }
  //delete one
  const { mutate: DeleteOne } = DeleteOnePlan();
  const handelDeleteOne = (id) => {
    DeleteOne(id);
  }
  //move task to next day
  const { mutate: updatePlan } = UpdatePlan();
  const handleUpdate = () => {
    updatePlan({ id, weekday, weekNumber })
  }
  //print out form
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef?.current,
    documentTitle: "Köks veckoplan -- Kitchaid",
  });
  const getPageMargins = () => {
    return `@page { margin: 25mm 25mm 0 25mm !important; }`;
  };

  // Error and Loading states
  if (error) return <div>Nånting gick fel</div>;
  if (isLoading) return <div><Spinner /></div>;



  return (
    <>
      <div className="todoAndOrderStyle w-75 text-light">
        <div className="table-container" ref={componentRef}>
          <style>{getPageMargins()}</style>
          <span>Vecka: {weekNumber} </span><span> {renderWeekDay()}</span>
          <hr></hr>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Flytta</th>
                <th scope="col">Uppgifter</th>
                <th scope="col">Prioritet</th>
                <th scope="col">Kommentar</th>
                <th scope="col"></th>
              </tr>
            </thead>
            {data?.data.map((tasks, index) => {
              return (
                <>
                  <tbody key={index}>
                    <tr className={index % 2 !== 0 ? "odd-row" : "even-row"} >
                      <th scope="row">
                        <i
                          className="fa-solid fa-share-from-square glow text-light"
                          onClick={() => { handleSmShow(); setId(tasks._id) }}></i>
                      </th>
                      <td>{tasks.task}</td>
                      <td>
                        <Box>
                          <Rating
                            name="read-only"
                            value={tasks.priorityRating}
                            readOnly
                            className="startRating"
                          />
                        </Box></td>
                      <td>{tasks.comment}</td>
                      <td>
                        <span
                          type="button"
                          onClick={() => handelDeleteOne(tasks._id)}
                        >
                          <i className="fa-solid fa-trash-can glow text-light"></i>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </>
              );
            })}
          </table>
        </div>
      </div>
      <button className="mainButton mb-2 p-1  text-light" onClick={handleShow}>
        <span>Radera allt</span>
      </button>
      <div className="printForm mt-3" onClick={() => { handlePrint() }}>
        <i className="fa-solid fa-print ms-2 text-light"></i>
        <span> Utskriv</span>
      </div>
      <Modal
        size="sm"
        show={show}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Radera allt?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Färdig med alla uppgifter?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Nej
          </Button>
          <Button variant="danger" onClick={() => { handleDeleteAll(weekNumber, weekday); handleClose() }}>
            Jo, radera allt
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        size="sm"
        show={smShow}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleSmClose}
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>Flytta uppgiften till nästa arbetsdag?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSmClose}>
            Nej
          </Button>
          <Button variant="danger" onClick={() => { handleUpdate(); handleSmClose() }}>
            Jo,flytta uppgiften.
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ToDoListRecord;
