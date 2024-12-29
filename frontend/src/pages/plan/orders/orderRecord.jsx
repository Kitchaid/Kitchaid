import React, { useState } from "react";
import { useQuery } from 'react-query';
import { getOrders, DeleteOrders } from '../../../hooks/plan/orderHooks'
import "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import OrderRecordTable from "./orderRecordTable"
import Spinner from '../../../Partials/Spinner'
import "react-datepicker/dist/react-datepicker.css";

function OrderRecord() {
  const [show, setShow] = useState(false);

  // Using the fetching hook
  const { data, error, isLoading } = useQuery('getOrders', getOrders,
  );
  //delete all
  const { mutate } = DeleteOrders()

  // Error and Loading states
  if (error) return <div>Nånting gick fel</div>;
  if (isLoading) return <div><Spinner /></div>;


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return <>
    <div className="todoAndOrderStyle w-75">
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Benämning</th>
              <th scope="col">Kommentar</th>
            </tr>
          </thead>
          {data?.data.map((order) => {
            return (<>
              <OrderRecordTable
                key={order._id}
                id={order._id}
                itemToOrder={order.itemToOrder}
                comment={order.comment}
              /></>
            );
          })}
        </table>
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
        <Modal.Body>Färdig med alla beställning?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Nej
          </Button>
          <Button variant="danger" onClick={() => { mutate(); handleClose() }}>
            Jo, radera allt
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    <button className="mainButton mb-2 p-1" onClick={handleShow}>
      <span>Radera allt</span>
    </button>
  </>

}

export default OrderRecord;
