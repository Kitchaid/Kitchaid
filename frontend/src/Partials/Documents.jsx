import { React, useState } from "react";
import { Modal,  Col, Row, Container, Offcanvas } from "react-bootstrap";
import Feedback from "./Feedback";
import Intro from "./Introduction";
function Documents() {
  const [show, setShow] = useState(false);
  const [showKontakt, setShowKontakt] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseKontakt = () => setShowKontakt(false);
  const handleShowKontakt = () => setShowKontakt(true);
  return (
    <Container className="mb-3 me-3">
      <Row>
        <Col xs={4} md={4} className="mb-2 text-center">
          <span className="document small" onClick={handleShow}>
            Introduktion
          </span>
          <Modal
          size="md"
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Intro />
        </Modal>
        </Col>
        <Col xs={4} md={4} className="mb-2 text-center">
        <span className="ms-2 small">
        <a className="small" href="https://josef-ablizs-organization.gitbook.io/kitchaid/">Hur funkar appen?</a>
      </span>
        </Col>
        <Col xs={4} md={4} className="mb-2 text-center">
        <span className="document small" onClick={handleShowKontakt}>
            Kontakt oss
          </span>
        <Offcanvas
        show={showKontakt}
        onHide={handleCloseKontakt}
        placement={"bottom"}
        className="Offcanvas"
        style={{ height: "450px" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Funderingar?</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Feedback />
        </Offcanvas.Body>
      </Offcanvas>
        </Col>
      </Row>
    </Container>
  );
}

export default Documents;
