import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Modal, Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import Footer from "../../Partials/Footer";
import MenuSetting from './component/superiorAdmin/menuSetting/menuSetting';
import MenuTemplate from './component/superiorAdmin/menuSetting/menuTemplate';
import SidesTemplate from './component/superiorAdmin/menuSetting/sidesTemplate';
import DataAnalyze from './component/DataAnalyze';
import NewAdmin from "./component/superiorAdmin/adminSetting/sectionAdminSetting";
import { UpdateAdmin } from '../../hooks/admin/admin';
import SpecialkostType from './component/superiorAdmin/Specialkost/specialType';
import LoginTrace from './component/LoginTrace';
import { contextData } from '../../ContextApi'
import { toast } from "react-toastify";

const AdminHome = () => {
  const { userdata } = useContext(contextData)
  const username = userdata.username;
  const email = userdata.email;
  const [renderController, setRenderController] = useState('');
  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //toggle visibility of password
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }
  //update admin
  const { mutate } = UpdateAdmin();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    mutate(data);
    reset();
  };

  //Render control woindow
  const renderwindow = () => {
    switch (renderController) {
      case 'menuSetting':
        return <>
          <MenuSetting />
        </>;
      case 'menuTemplate':
        return <>
          <MenuTemplate />
        </>;
      case 'sidesTemplate':
        return <>
          <SidesTemplate />
        </>;
      case 'typeSetting':
        return <>
          <SpecialkostType />
        </>;
      case 'dataAnalyze':
        return <>
          <DataAnalyze />
        </>;
      case 'newAdmin':
        return <>
          <NewAdmin />
        </>;
      case 'tracer':
        return <>
          <LoginTrace />
        </>;
      default:
        return <>
          <div className="render-bg">
            <h3>Kitchaid</h3>
          </div>
        </>
    }
  }

  //log out 
  const logout = () => {
    localStorage.clear();
    toast("Utloggad");
    window.location.pathname = "/"
  };

  return (
    <>
      <Container fluid className="mt-3">
        <Row className='m-auto'>
          <Col xs={12} sm={12} md={4} lg={3} xl={2} >
            <Navbar className="bg-body-light m-auto sidebar" collapseOnSelect expand="sm">
              <Container style={{ 'justify-content': 'flex-end' }}>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="sidebar" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="justify-content-end flex-grow-2 pe-3 flex-column" navbarScroll>
                    <picture className="logo mb-3">
                      <img src={"imgsAndVideos/Logo.png"} alt="logo" />
                    </picture>
                    <Nav.Link href="#action1">
                      <button
                        className="stats_card mb-3 w-100 m-auto"
                        onClick={() => setRenderController('menuSetting')}
                      >
                        <span>Maträtt inställning</span>
                      </button>
                    </Nav.Link>
                    <Nav.Link href="#action1">
                      <button
                        className="stats_card mb-3  w-100 m-auto"
                        onClick={() => setRenderController('menuTemplate')}
                      >
                        <span>Menymall</span>
                      </button>
                    </Nav.Link>
                    <Nav.Link href="#action1">
                      <button
                        className="stats_card mb-3  w-100 m-auto"
                        onClick={() => setRenderController('sidesTemplate')}
                      >
                        <span>Tillbehör inställning</span>
                      </button>
                    </Nav.Link>
                    <Nav.Link href="#action1">
                      <button
                        className="stats_card mb-3  w-100 m-auto"
                        onClick={() => setRenderController('typeSetting')}
                      >
                        <span>Specialkost inställning</span>
                      </button>
                    </Nav.Link>
                    <Nav.Link href="#action1">
                      <button className="stats_card mb-3  w-100 m-auto"
                        onClick={() => setRenderController('dataAnalyze')}
                      >
                        <span>Data analys</span>
                      </button>
                    </Nav.Link>
                    <Nav.Link href="#action1">
                      <button
                        className="stats_card mb-3  w-100 m-auto"
                        onClick={() => setRenderController('newAdmin')}
                      >
                        <span>Ny områdes admin</span>
                      </button>
                    </Nav.Link>
                    <Nav.Link href="#action1">
                      <button
                        className="stats_card mb-3  w-100 m-auto"
                        onClick={() => setRenderController('tracer')}
                      >
                        <span>LoginTracer</span>
                      </button>
                    </Nav.Link>
                    <Nav.Link href="#action1">
                      <button className="stats_card mb-3  w-100 m-auto" onClick={logout}>
                        <span>Logga ut</span>
                      </button>
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Col>
          <Col xs={12} sm={12} md={8} lg={9} xl={10}>
            <section className="control-section">
              <Row className="admin-setting renderWindow">
                <Col xs={11} sm={11} md={11} lg={11} xl={11} className="text-light p-2">
                  <p className="fs-6 ms-3 mt-3">Välkommen {username}</p>
                </Col>
                <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                  <div className="text-light">
                    <i className="fa-solid fa-gear fa-spin" onClick={handleShow}></i>
                    <Modal show={show} onHide={handleClose}>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <Modal.Header closeButton>
                          <Modal.Title>Administratör Inställning</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div className="input-group">
                            {errors.email?.type === "required" && (
                              <p className="m-auto ms-5 error" role="alert">
                                E-post adressen?
                              </p>
                            )}
                            <div className="m-auto mb-3 item formFrame w-100">
                              <label
                                className="visually-hidden"
                                htmlFor="autoSizingInput"
                              ></label>
                              <input
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                type="email"
                                className="form-control"
                                defaultValue={email}
                                {...register("email", { required: true, maxLength: 50, type: String })}
                                aria-invalid={errors.email ? "true" : "false"}
                              />
                            </div>
                          </div>

                          <div className="input-group">
                            {errors.password?.type === "required" && (
                              <p className="m-auto ms-5 error" role="alert">
                                Lösenord
                              </p>
                            )}
                            <div className=" m-auto mb-3 item formFrame w-100">
                              <label
                                className="visually-hidden"
                                htmlFor="autoSizingInput"
                              ></label>
                              <input
                                aria-label="Lösenord"
                                aria-describedby="basic-addon1"
                                type={passwordType}
                                className="form-control"
                                placeholder="Lösenord"
                                // defaultValue={admin_email}
                                {...register("password", { required: true, maxLength: 50, type: String })}
                                aria-invalid={errors.passowrd ? "true" : "false"}
                              />
                              <span className="input-group-text" id="basic-addon1" onClick={togglePassword}>
                                {passwordType === "password" ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}
                              </span>
                            </div>
                          </div>

                          <div className="input-group">
                            {errors.password2?.type === "required" && (
                              <p className="m-auto ms-5 error" role="alert">
                                Bekräfta Lösenord
                              </p>
                            )}
                            <div className=" m-auto mb-3 item formFrame w-100">
                              <label
                                className="visually-hidden"
                                htmlFor="autoSizingInput"
                              ></label>
                              <input
                                aria-label="Bekräfta Lösenord"
                                aria-describedby="basic-addon1"
                                type={passwordType}
                                className="form-control"
                                placeholder="Bekräfta Lösenord"
                                {...register("password2", { required: true, maxLength: 50, type: String })}
                                aria-invalid={errors.passowrd2 ? "true" : "false"}
                              />
                              <span className="input-group-text" id="basic-addon1" onClick={togglePassword}>
                                {passwordType === "password" ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}
                              </span>
                            </div>
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <button type="submit" className="stats_card">
                            Uppdatera
                          </button>
                        </Modal.Footer>
                      </form>
                    </Modal>
                  </div>
                </Col>
              </Row>
              <Row>
                {renderwindow()}
              </Row>
            </section>
          </Col>
        </Row>
      </Container>

      <Row className="row">
        <Footer />
      </Row>
    </>
  );
};

export default AdminHome;