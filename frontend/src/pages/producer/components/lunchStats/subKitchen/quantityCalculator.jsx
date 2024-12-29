/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { Col, Row, Table, Modal } from "react-bootstrap";
import TemplateTable from "./tables"
import { CalculatorRowMain } from './CalculatorRow'
import { CalculatorRowSideAndSauce } from './CalculatorRowSides'


const Calculator = ({ dataArray, dishName, sidesName, selectedDish, weekNumber, userInfo }) => {
  const [result, setResult] = useState({});
  const [resultMain, setResultMain] = useState({});
  const [weekday, setWeekday] = useState('Välj dag')
  const [alternative, setAlternative] = useState('Välj alternative')
  const getTotal = (result) => {
    setResult(result)
  };
  const getTotalMain = (resultMain) => {
    setResultMain(resultMain)
  };
  const [activeRows, setActiveRows] = useState([]);
  const [activeRowsSide, setActiveRowsSide] = useState([]);

  useEffect(() => {
    setActiveRows(dataArray?.map(user => user._id));
    setActiveRowsSide(dataArray?.map(user => user._id));
  }, [dataArray])
  const toggleRowVisibility = (id) => {
    setActiveRows(current =>
      current.includes(id) ? current.filter(_id => _id !== id) : [...current, id]
    );
  };
  const toggleRowVisibilitySide = (id) => {
    setActiveRowsSide(current =>
      current.includes(id) ? current.filter(_id => _id !== id) : [...current, id]
    );
  };

  const hiddenList = dataArray?.filter(({ _id }) => !activeRows.includes(_id));
  const hiddenListSide = dataArray?.filter(({ _id }) => !activeRowsSide.includes(_id));
  //handleShowHiddenGuest
  const [showHiddenGuestMain, setShowHiddenGuestMain] = useState(false);
  const [showHiddenGuestSide, setShowHiddenGuestSide] = useState(false);
  const handleCloseHiddenGuestMain = () => setShowHiddenGuestMain(false);
  const handleCloseHiddenGuestSide = () => setShowHiddenGuestSide(false);

  const asyncWeekDay = () => {
    if (weekday == 1) { return 'Måndag' }
    if (weekday == 2) { return 'Tisdag' }
    if (weekday == 3) { return 'Onsdag' }
    if (weekday == 4) { return 'Torsdag' }
    if (weekday == 5) { return 'Fredag' }
    return
  }
  return (
    <>
      <div className="print-page print-table">
        <Row className="mt-3 mb-3 m-auto">
          <h6 className="mb-3">Vecka: {weekNumber}</h6>
          <Col sm={6} className='d-flex'>
            <select className="form-control mb-2 me-2" onChange={(e) => { setWeekday(e.target.value) }}>
              <option value="" selected disabled>Välj dag</option>
              <option value={1}>Måndag</option>
              <option value={2}>Tisdag</option>
              <option value={3}>Onsdag</option>
              <option value={4}>Torsdag</option>
              <option value={5}>Fredag</option>
            </select>
            <select className="form-control mb-2" onChange={(e) => { setAlternative(e.target.value) }}>
              <option value="" selected disabled>Välj alternative</option>
              <option value={1}>Alt 1</option>
              <option value={2}>Alt 2</option>
            </select>
          </Col>
          <Col sm={6}>
            <div className="m-auto">
              <h5 className="ms-4">{dishName}</h5>
              <h6 className="ms-4">tillbehör: {sidesName}</h6>
            </div>
          </Col>
        </Row>
        <hr></hr>
        <Row className="w-25">
          <Col className="text-center">
            <i className="fa-solid fa-eye cursor" onClick={() => {
              setShowHiddenGuestMain(true)
            }}></i>
          </Col>
          <Col className="text-center">
            <h6 className="mb-3 ms-3">Huvurätt</h6>
          </Col>
        </Row>
        <Table bordered hover
          table={+true} table-striped={+true}
          className="font-size-xs text-center">
          <thead>
            <tr>
              <th className="text-dark" scope="col" style={{ width: '100px' }}>Leveranstid</th>
              <th className="text-dark text-center" scope="col">Avdelning</th>
              <th className="text-dark" scope="col">Ätande</th>
              <th className="text-dark" scope="col" style={{ width: '70' }}>Huvurätt(Enhet)</th>
              <th className="text-dark" scope="col">kommentar</th>
              <th scope="col" className="font-size-xxxs text-dark" style={{ width: '120px' }}>Mängd/ätande(ätande/bleck)
                <br></br>(Huvurätt)
              </th>
            </tr>
          </thead>
          <tbody
            style={{ maxHeight: '3500', overflowY: 'auto' }}
          >
            {dataArray?.map((data, index) => {
              return <CalculatorRowMain
                key={index + data._id}
                data={data}
                dishName={dishName}
                sidesName={sidesName}
                selectedDish={selectedDish}
                getTotalMain={getTotalMain}
                isActive={activeRows?.includes(data._id)}
                toggleRowVisibility={toggleRowVisibility}
                alternative={alternative}
                weekday={weekday}
                weekNumber={weekNumber}
                userInfo={userInfo}
              />
            })}
          </tbody>
        </Table>
        <Table bordered hover
          table={+true} table-striped={+true}
          className="font-size-xs text-center">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col">Total Ätande</th>
              <th scope="col">Huvurätt(Enhet)</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <th scope="row"></th>
              <td>Total</td>
              <td>{resultMain?.resultGuest ? resultMain?.resultGuest?.toFixed(0) : 1}</td>
              <td>{resultMain?.resultMain ? resultMain?.resultMain?.toFixed(1) : 1} ({resultMain.unitMain})</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="print-page  print-table">
        <hr></hr>
        <Row className="d-flex">
          <Col sm={2}>
            <h6 className="mb-3">Vecka: {weekNumber}</h6>
            <h6 className="font-size-xs text-light bg-dark p-1">{asyncWeekDay()}</h6>
          </Col>
          <Col className="d-flex">
            <i className="fa-solid fa-eye cursor" onClick={() => {
              setShowHiddenGuestSide(true)
            }}></i>
            <h6 className="mb-3 ms-2">Tillbehör/Sås</h6>
            <h6 className="font-size-xs p-1 ms-3">Alternative: {alternative}</h6>
          </Col>
        </Row>
        <Table bordered hover
          table={+true} table-striped={+true}
          className="font-size-xs text-center">
          <thead>
            <tr>
              <th scope="col">Leveranstid</th>
              <th scope="col">Avdelning</th>
              <th scope="col">Ätande</th>
              <th scope="col">Tillbehör(Enhet)
                <br></br>
                <span className="text-light bg-dark">{sidesName}</span>
              </th>
              <th scope="col">Sås(Liter)</th>
              <th scope="col">kommentar</th>
              <th scope="col" className="font-size-xxxs">Mängd/ätande(ätande/bleck)
                <br></br>(Tillbehör)
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {dataArray?.map((data, index) => {
              return <CalculatorRowSideAndSauce
                key={index + data._id}
                data={data}
                dishName={dishName}
                sidesName={sidesName}
                selectedDish={selectedDish}
                getTotal={getTotal}
                isActive={activeRowsSide?.includes(data._id)}
                toggleRowVisibilitySide={toggleRowVisibilitySide}
                alternative={3}
                weekday={weekday}
                weekNumber={weekNumber}
                userInfo={userInfo}
              />
            })}
          </tbody>
        </Table>
        <Table bordered hover
          table={+true} table-striped={+true}
          className="font-size-xs text-center">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col">Total Ätande</th>
              <th scope="col">Tillbehör(Enhet)</th>
              <th scope="col">Sås(Liter)</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <th scope="row"></th>
              <td>Total</td>
              <td>{result?.resultGuest ? result?.resultGuest?.toFixed(0) : 1}</td>
              <td>{result?.resultSide ? result?.resultSide?.toFixed(1) : 1} ({result.unitSide})</td>
              <td>{result?.resultSauce ? result?.resultSauce?.toFixed(1) : 1} (Liter)</td>
            </tr>
          </tbody>
        </Table>
        <div className='template_bar'>
          <TemplateTable dishName={dishName} />
        </div>
      </div>
      {/* handleShowHiddenGuest */}
      <Modal show={showHiddenGuestMain} onHide={handleCloseHiddenGuestMain} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>
            Återställ Huvurätt
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table
            className="table table-striped text-center mb-3 overflow font-size-xs"
          >
            <thead>
              <tr>
                <th scope="col">Återställ
                </th>
                <th scope="col">Leveranstid</th>
                <th scope="col">Avdelning</th>
              </tr>
            </thead>
            {hiddenList?.map((user, index) => {
              return <>
                <tbody className='text-center mb-3'>
                  <tr
                    key={index + user._id}
                  >
                    <td scope="row">
                      <i className="fa-solid fa-eye" onClick={() => {
                        toggleRowVisibility(user._id, setActiveRows);
                      }}></i>
                    </td>
                    <td >{user.data.foodReadyTimeHours}:{user.data.foodReadyTimeMinutes}</td>
                    <td >{user._id}</td>
                  </tr>
                </tbody>
              </>
            })}
          </table>
        </Modal.Body>
      </Modal>
      {/* handleShowHiddenGuestSide */}
      <Modal show={showHiddenGuestSide} onHide={handleCloseHiddenGuestSide} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>
            Återställ Tillbehör
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table
            className="table table-striped text-center mb-3 overflow font-size-xs"
          >
            <thead>
              <tr>
                <th scope="col">Återställ
                </th>
                <th scope="col">Leveranstid</th>
                <th scope="col">Avdelning</th>
              </tr>
            </thead>
            {hiddenListSide?.map((user, index) => {
              return <>
                <tbody className='text-center mb-3'>
                  <tr
                    key={index + user._id}
                  >
                    <td scope="row">
                      <i className="fa-solid fa-eye" onClick={() => {
                        toggleRowVisibilitySide(user._id, setActiveRowsSide);
                      }}></i>
                    </td>
                    <td >{user.data.foodReadyTimeHours}:{user.data.foodReadyTimeMinutes}</td>
                    <td >{user._id}</td>
                  </tr>
                </tbody>
              </>
            })}
          </table>
        </Modal.Body>
      </Modal>
    </>
  );
};

const QuantityCalculator = (props) => {
  //print out list
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef?.current,
    documentTitle: "Lunch statistik -- Kitchaid",
  });
  const getPageMargins = () => {
    return `@page { margin: 15mm 10mm 0 10mm !important; }`;
  };
  return (
    <div>
      <div ref={componentRef}>
        <style>{getPageMargins()}</style>
        <Calculator
          dataArray={props.props}
          dishName={props.dishName}
          sidesName={props.sidesName}
          selectedDish={props.selectedDish}
          weekNumber={props.weekNumber}
          userInfo={props.userInfo}
        />
      </div>
      <Row>
        <Col sm={{ span: 3, offset: 9 }}>
          <div className="printForm printer-icon" onClick={() => { handlePrint() }}>
            <span className="glow">Utskriv</span><i className="fa-solid fa-print glow ms-3"></i>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default QuantityCalculator;
