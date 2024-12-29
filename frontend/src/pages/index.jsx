import React, { useState } from "react";
import { Container, Col, Row, Offcanvas, Navbar, Nav } from 'react-bootstrap'
import Feedback from '../Partials/Feedback'
import { useNavigate } from "react-router-dom";
import Footer from '../Partials/Footer'

function Index() {
    const navigate = useNavigate();
    const [showKontakt, setShowKontakt] = useState(false);
    const handleCloseKontakt = () => setShowKontakt(false);
    const handleShowKontakt = () => setShowKontakt(true);
    return <>
            <Navbar bg="light" variant="light">
                <Container fluid>
                    <Navbar.Brand onClick={() => navigate("/")}>
                        <picture>
                            <img className="index-logo" src="./imgsAndVideos/Logo_black_text.png" alt="hero pic" />
                        </picture>
                    </Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link onClick={handleShowKontakt}>Boka demo</Nav.Link>
                        <Nav.Link onClick={() => navigate("/login")}>Redan kund? Login här</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        <Container>
            <header>
                <figure>
                    <picture>
                        <img className="index-hero" src="./imgsAndVideos/Hero-img.jpg" alt="hero pic" />
                    </picture>
                </figure>
            </header>
            <main>
                <section className="mb-5 mt-5 index-section">
                    <Row>
                        <Col className="text-light m-auto fs-5 text-dark" xs={12} md={12} lg={6} xl={6} xxl={6}>
                            <h5 className="ms-3 mt-3">ALLT I ETT</h5>
                            <ul className="m-auto">
                                <li><i className="fa-regular fa-clipboard p-2 glow"></i><span className="font-size-s"> Dokumentera lunchstatistik i appen enligt maträtten</span></li>
                                <li><i className="fa-regular fa-clipboard p-2 glow"></i><span className="font-size-s"> Dokumentera matsvinn direkt i appen när det är lämpligt</span></li>
                                <li><i className="fa-regular fa-clipboard p-2 glow"></i><span className="font-size-s"> Olika funktioner baserade på köks funktion</span></li>
                                <li><i className="fa-regular fa-clipboard p-2 glow"></i><span className="font-size-s"> Planera - Håll koll på hela veckans arbete</span></li>
                                <li><i className="fa-regular fa-clipboard p-2 glow"></i><span className="font-size-s"> Digital kostinnehåll - Spara papper och mer effektiv</span></li>
                                <li><i className="fa-regular fa-clipboard p-2 glow"></i><span className="font-size-s"> Digital vikarienpärm - Förenkla vikariat</span></li>
                            </ul>
                        </Col>
                        <Col xs={{ order: 'first' }} md={12} lg={{ span: 6, order: 'last' }} xl={{ span: 6, order: 'last' }} xxl={{ span: 6, order: 'last' }}>
                            <picture>
                                <img className="index-section-img mt-1 p-1" src="./imgsAndVideos/board-full.jpeg" alt="hero pic" />
                            </picture>
                        </Col>
                    </Row>
                </section>
                <section className="mb-5 index-section">
                    <Row>
                        <Col xs={{ order: 12 }} sm={12} md={12} lg={6} xl={6}>
                            <picture>
                                <img className="index-section-img mt-1 p-1" src="./imgsAndVideos/different-platform.png" alt="hero pic" />
                            </picture>
                        </Col>
                        <Col className="text-light m-auto fs-5 text-dark" xs={12} sm={12} md={12} lg={{ span: 6, order: 'last' }} xl={6}>
                            <h5 className="ms-3 mt-3">ENKELT</h5>
                            <ul className="m-auto">
                                <li><i className="fa-regular fa-clipboard p-2 glow"></i><span className="font-size-s"> Dokumentera med dator / surfplatta / mobil enhet</span></li>
                                <li><i className="fa-regular fa-clipboard p-2 glow"></i><span className="font-size-s"> Digital dokumentation - Paper fri - Rädda jorden</span></li>
                                <li><i className="fa-regular fa-clipboard p-2 glow"></i><span className="font-size-s"> Tillgänglig överallt med internetanslutning</span></li>
                                <li><i className="fa-regular fa-clipboard p-2 glow"></i><span className="font-size-s"> Utskriv tabell för utan internetanslutning</span></li>
                            </ul>
                        </Col>
                    </Row>
                </section>
                <section className="mb-5 index-section">
                    <Row>
                        <Col className="text-light m-auto fs-5 text-dark" xs={12} md={12} lg={6} xl={6} xxl={6}>
                            <h5 className="ms-3 mt-3">Administration</h5>
                            <ul className="m-auto">
                                <li><i className="fa-regular fa-clipboard p-2 glow"></i> <span className="font-size-s">Håll koll på lunchstatistik enligt olika kök</span></li>
                                <li><i className="fa-regular fa-clipboard p-2 glow"></i> <span className="font-size-s">Skapa matsedel efter behöv, upplada bilden till maträtten</span></li>
                                <li><i className="fa-regular fa-clipboard p-2 glow"></i> <span className="font-size-s">Håll koll specialkost efter behöv</span></li>
                                <li><i className="fa-regular fa-clipboard p-2 glow"></i> <span className="font-size-s">Få all matsvinnsdata i en enda diagram för analys</span></li>
                                <li><i className="fa-regular fa-clipboard p-2 glow"></i> <span className="font-size-s">Kontrollera olika inställningar för varsin kök eller skapa nya</span></li>
                            </ul>
                        </Col>
                        <Col xs={{ order: 'first' }} md={12} lg={{ span: 6, order: 'last' }} xl={{ span: 6, order: 'last' }} xxl={{ span: 6, order: 'last' }}>
                            <picture>
                                <img className="index-section-img mt-1 p-1" src="./imgsAndVideos/board-computer.jpg" alt="hero pic" />
                            </picture>
                        </Col>
                    </Row>
                </section>
            </main>
            <footer className="index-footer">
                <Row>
                    <Col xs={12} sm={12}>
                        <picture className="logo mt-5">
                            <img src="./imgsAndVideos/Logo_black_text.png" alt="logo" />
                        </picture>
                    </Col>
                    <Col xs={12} sm={12}>
                        <Footer />
                    </Col>
                </Row>
            </footer>
        </Container>
        <Offcanvas
            show={showKontakt}
            onHide={handleCloseKontakt}
            placement={"bottom"}
            className="Offcanvas"
            style={{ height: "450px" }}
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Boka demo</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Feedback />
            </Offcanvas.Body>
        </Offcanvas>
    </>
}

export default Index;