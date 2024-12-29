import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import {
  getRoutine,
  getWorkRoutine,
  getSection,
  getSpecial,
  getSignininfo,
  getContactinfo,
} from "../../../../hooks/receiverHooks/receiverHooks";
import { getSpecialType } from '../../../../hooks/admin/superiorAdmin'
import diskImg from "./diskImg";
import {
  Accordion,
  Container,
  Row,
  Modal,
  Card,
} from "react-bootstrap";

const Vikarieparm = () => {
  const navigate = useNavigate();

  const [showFrukost, setShowFrukost] = useState(false);
  const [showLunch, setShowLunch] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [showDishes, setShowDishes] = useState(false);
  const [showClean, setShowClean] = useState(false);

  //get all information
  const { data: routine } = useQuery("getRoutine", getRoutine);
  const { data: workRoutine } = useQuery('getWorkRoutine', () => getWorkRoutine());
  const { data: section } = useQuery("getSection", getSection);
  const { data: special } = useQuery("getSpecial", getSpecial);
  const { data: signininfo } = useQuery("getSignininfo", getSignininfo);
  const { data: contactinfo } = useQuery("getContactinfo", getContactinfo);
  //special diet color
  const { data: type } = useQuery("getSpecialtype", getSpecialType);
  return (
    <>
      <div className=" mx-auto item">
        <div className="text-center text-light mb-3">
          <span>Min arbetstid: {workRoutine?.data[0]?.my_work_time}</span>
          <br></br><span>Rast 30 min</span>
        </div>
        <Accordion defaultActiveKey="0" className="m-auto">
          <Accordion.Item eventKey="1">
            <Accordion.Header className="routineLayout">
              Jobb rutin
            </Accordion.Header>
            <Accordion.Body>
              {/* breakfast */}
              <button
                className="stats_card mt-2 w-100 mb-2"
                value={'breakfast'}
                onClick={() => { setShowFrukost(true) }}
              >
                <span className="text-center">Frukost</span>
              </button>
              <Modal show={showFrukost} onHide={() => setShowFrukost(false)}>
                <Modal.Header closebutton>
                  <Modal.Title className="ms-auto fs-3">
                    &nbsp;&nbsp; Morgonrutiner
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col"><span className="font-size-s">Vardag</span></th>
                        <th scope="col"><span className="font-size-s">Servering</span></th>
                      </tr>
                    </thead>
                    <tbody key={routine?.data._id}>
                      <tr>
                        <th scope="row"></th>
                        <td><span className="font-size-s">Måndag</span></td>
                        <td><span className="font-size-s">{routine?.data.breakfast_monday}</span></td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td><span className="font-size-s">Tisdag</span></td>
                        <td><span className="font-size-s">{routine?.data.breakfast_tuesday}</span></td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td><span className="font-size-s">Onsdag</span></td>
                        <td><span className="font-size-s">{routine?.data.breakfast_wednesday}</span></td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td><span className="font-size-s">Torsdag</span></td>
                        <td><span className="font-size-s">{routine?.data.breakfast_thursday}</span></td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td><span className="font-size-s">Fredag</span></td>
                        <td><span className="font-size-s">{routine?.data.breakfast_friday}</span></td>
                      </tr>
                    </tbody>
                  </table>
                  <div>
                    <button
                      variant="warning"
                      className=" m-auto"
                      onClick={() => {
                        navigate("/WorkRoutine");
                      }}
                    >
                      Uppdatera
                    </button>
                  </div>
                  <div className=" mx-auto item p-4">
                    <span className="routine_text">
                      Om man kommer som vikarie så är de ok att servera fil /
                      yoghurt vid grötfrukosten, då de kan vara lite ont om
                      tid på morgonen.
                    </span>
                  </div>
                  <Card className="text-center">
                    <Card.Header>
                      <Card.Title className="m-2 fs-5">
                        <h6 className="font-size-s">Avdelningar som behöver frukost</h6>
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <table className="table table-striped text-center">
                        <thead>
                          <tr>
                            <th scope="col"></th>
                            <th scope="col">Namnet</th>
                            <th scope="col">Antal bord</th>
                          </tr>
                        </thead>
                        {section?.data.map((section, index) => {
                          return (
                            <>
                              <tbody key={index} className={section.breakfast ? "text-center" : "d-none"}>
                                <tr>
                                  <th scope="row"></th>
                                  <td>{section.section_name}</td>
                                  <td>{section.numberOfTable}</td>
                                </tr>
                              </tbody>
                            </>
                          );
                        })}
                      </table>
                    </Card.Body>
                  </Card>
                  <Card className="text-center mt-3">
                    {workRoutine?.data.map((routine, index) => {
                      return <>
                        <div key={index}>
                          <Card.Header>
                            <Card.Title className="m-2 fs-5">
                              Kl. {routine.routine_time_breakfast}
                            </Card.Title>
                          </Card.Header>
                          <Card.Body>
                            <Card.Text className="routine_text">
                              {routine.routine_breakfast}
                            </Card.Text>
                          </Card.Body>
                        </div>
                      </>
                    })}
                  </Card>
                </Modal.Body>
              </Modal>

              {/* Lunch rutin */}
              <button
                className="stats_card w-100 mb-2"
                value={'lunch'}
                onClick={() => { setShowLunch(true) }}
              >
                <span className="text-center">Lunch</span>
              </button>
              <Modal show={showLunch} onHide={() => setShowLunch(false)}>
                <Modal.Header closebutton>
                  <Modal.Title className="ms-auto fs-3">
                    &nbsp;&nbsp; Lunchrutiner
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Card className="text-center">
                    {workRoutine?.data.map((routine, index) => {
                      return <>
                        <div key={index}>
                          <Card.Header>
                            <Card.Title className="m-2 fs-5">
                              {routine.routine_time_lunch}
                            </Card.Title>
                          </Card.Header>
                          <Card.Body>
                            <Card.Text className="routine_text">
                              {routine.routine_lunch}
                            </Card.Text>
                          </Card.Body>
                        </div>
                      </>
                    })}
                  </Card>
                  <Card className="text-center">
                    <Card.Body>
                      <table className="table table-striped text-center">
                        <thead>
                          <tr>
                            <th scope="col"></th>
                            <th scope="col">Namnet</th>
                            <th scope="col">Antal bord</th>
                          </tr>
                        </thead>
                        {section?.data.map((section, index) => {
                          return (
                            <>
                              <tbody key={index} className={section.lunch ? "text-center" : "d-none"}>
                                <tr>
                                  <th scope="row"></th>
                                  <td>{section.section_name}</td>
                                  <td>{section.numberOfTable}</td>
                                </tr>
                              </tbody>
                            </>
                          );
                        })}
                      </table>
                      <Card.Footer className="text-muted">
                        <button
                          variant="warning"
                          className=" m-auto"
                          onClick={() => {
                            navigate("/WorkRoutine");
                          }}
                        >
                          Uppdatera avdelningarna
                        </button>
                      </Card.Footer>
                    </Card.Body>
                  </Card>
                </Modal.Body>
              </Modal>

              {/* Snack time rutin  */}
              <button
                className="stats_card w-100 mb-2"
                value={'snack'}
                onClick={() => { setShowSnack(true) }}
              >
                <span className="text-center">Mellanmål</span>
              </button>
              <Modal show={showSnack} onHide={() => setShowSnack(false)}>
                <Modal.Header closebutton>
                  <Modal.Title className="ms-auto fs-3">
                    &nbsp;&nbsp; Mellanmål
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col"><span className="font-size-s">Vardag</span></th>
                        <th scope="col"><span className="font-size-s">Servering</span></th>
                      </tr>
                    </thead>
                    <tbody key={routine?.data._id}>
                      <tr>
                        <th scope="row"></th>
                        <td><span className="font-size-s">Måndag</span></td>
                        <td><span className="font-size-s">{routine?.data.snack_monday}</span></td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td><span className="font-size-s">Tisdag</span></td>
                        <td><span className="font-size-s">{routine?.data.snack_tuesday}</span></td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td><span className="font-size-s">Onsdag</span></td>
                        <td><span className="font-size-s">{routine?.data.snack_wednesday}</span></td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td><span className="font-size-s">Torsdag</span></td>
                        <td><span className="font-size-s">{routine?.data.snack_thursday}</span></td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td><span className="font-size-s">Fredag</span></td>
                        <td><span className="font-size-s">{routine?.data.snack_friday}</span></td>
                      </tr>
                    </tbody>
                  </table>
                  <div>
                    <button
                      variant="warning"
                      className=" m-auto mb-3"
                      onClick={() => {
                        navigate("/WorkRoutine");
                      }}
                    >
                      Uppdatera
                    </button>
                    <Card className="text-center">
                      <Card.Header>
                        <Card.Title className="m-2 fs-5">
                          <h6 className="font-size-s">Avdelningar som behöver mellanmål</h6>
                        </Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <table className="table table-striped text-center">
                          <thead>
                            <tr>
                              <th scope="col"></th>
                              <th scope="col">Namnet</th>
                              <th scope="col">Antal bord</th>
                            </tr>
                          </thead>
                          {section?.data.map((section, index) => {
                            return (
                              <>
                                <tbody key={index} className={section?.snack ? "text-center" : "d-none"}>
                                  <tr>
                                    <th scope="row"></th>
                                    <td>{section.section_name}</td>
                                    <td>{section.numberOfTable}</td>
                                  </tr>
                                </tbody>
                              </>
                            );
                          })}
                        </table>
                      </Card.Body>
                    </Card>
                    <Card className="text-center mt-3">
                      <Card.Header>
                        <Card.Title className="m-2 fs-5">
                          Kl. 13:00 - 15:30
                        </Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <Card.Text className="routine_text">
                          &bull; Avsluta dagen med att städa i köket, stänga
                          av diskmaskinen, gå ut med alla sopor, kolla så spis
                          och ugn är avstängda. Kolla även om dörrarna till
                          kylarna är stängda. Kolla så kontakten till
                          värmeskåpen är utdragen.
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>Övriga rutiner</Card.Footer>
                      <Card.Body>
                        <Card.Text className="routine_text">
                          &bull; Kom ihåg att kitchecka. Registrera rengöring,
                          temperatur m.m.
                          {<br></br>}&bull; Tisdag & torsdag: Leverans av
                          varor.
                          {<br></br>}&bull; Torsdagar: Gör alla beställningar
                          från Martin & Servera. {<br></br>}
                          {<br></br>}
                          <strong>Om tid finns: </strong>
                          {<br></br>}&bull; Städa golv {<br></br>} &bull;
                          Golvbrunnar {<br></br>}&bull; Rengöring av
                          diskmaskinen {<br></br>}&bull; Städa torrföråd{" "}
                          {<br></br>}&bull; Städa kyl & frys{<br></br>} &bull;
                          Torka rent alla hyllor och övriga ytor.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                </Modal.Body>
              </Modal>

              {/* Do the dishes  */}
              <button
                className="stats_card w-100 mb-2"
                onClick={() => setShowDishes(true)}
              >
                <span className="text-center">Disk</span>
              </button>
              <Modal show={showDishes} onHide={() => setShowDishes(false)}>
                <Modal.Header closebutton>
                  <Modal.Title>Disk rutin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {diskImg?.map((img, index) => {
                    return (
                      <>
                        <Card
                          style={{ width: "20rem" }}
                          key={index}
                          className="m-auto mb-3"
                        >
                          <Card.Img variant="top" src={img.src} />
                          <Card.Body>
                            <Card.Title>{img.imgName}</Card.Title>
                            <Card.Text>{img.description}</Card.Text>
                          </Card.Body>
                        </Card>
                      </>
                    );
                  })}
                </Modal.Body>
              </Modal>

              {/* do the clean */}
              <button
                className="stats_card w-100 mb-2"
                onClick={() => setShowClean(true)}
              >
                <span className="text-center">Specialkost</span>
              </button>
              <Modal show={showClean} onHide={() => setShowClean(false)}>
                <Modal.Header closebutton>
                  <Modal.Title>Special Kost</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <table
                    className="table table-striped text-center"
                    style={{ fontSize: "13px" }}
                  >
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Namnet</th>
                        <th scope="col">Allergi mot</th>
                        <th scope="col">Tillhör avd</th>
                        <th scope="col">Kommentar</th>
                      </tr>
                    </thead>
                    {special?.data.map((special, index) => {
                      return (
                        <>
                          <tbody key={index} className='text-center mb-3'>
                            <tr
                              key={special._id}
                            >
                              <td key={index}>{special.person_name}</td>
                              <td>{special?.allergic?.map((item, index) => {
                                const matchingType = type?.data?.Special_type[0]?.special_type.find(typeObj => typeObj.s_type === item);
                                const typeColor = matchingType ? matchingType.color : '';
                                return <>
                                  <span style={{ backgroundColor: typeColor }} key={index}>
                                    &nbsp;{item}&nbsp;
                                  </span>
                                </>
                              })}
                              </td>
                              <td>
                                <span className="font-weight-md">{special.username}</span>
                                <br></br>{special.section}
                              </td>
                              <td>{special.portion}</td>
                              <td>{special.comment}</td>
                            </tr>
                          </tbody>
                        </>
                      );
                    })}
                  </table>
                  <button
                    variant="warning"
                    className=" m-auto"
                    onClick={() => {
                      navigate("/WorkRoutine");
                    }}
                  >
                    Uppdatera specialkost
                  </button>
                </Modal.Body>
              </Modal>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Inloggningsuppgifter</Accordion.Header>
            <Accordion.Body>
              <Container>
                <Row>
                  <table
                    className="table table-striped"
                    style={{ fontSize: "13px" }}
                  >
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Enhet</th>
                        <th scope="col">Användarnamn</th>
                        <th scope="col">Lösenord</th>
                      </tr>
                    </thead>
                    {signininfo?.data.map((signininfo) => {
                      return (
                        <>
                          <tbody key={signininfo?._id}>
                            <tr>
                              <th scope="row"></th>
                              <td>{signininfo.unit_name}</td>
                              <td>{signininfo.username}</td>
                              <td>{signininfo.password}</td>
                            </tr>
                          </tbody>
                        </>
                      );
                    })}
                  </table>
                </Row>
                <button
                  variant="primary"
                  className=" m-0 stats_card"
                  onClick={() => {
                    navigate("/WorkRoutine");
                  }}
                >
                  <span className="d-block m-auto">Uppdatera</span>
                </button>
              </Container>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Kontaktinformation</Accordion.Header>
            <Accordion.Body>
              <Container>
                <Row>
                  <table
                    className="table table-striped"
                    style={{ fontSize: "13px" }}
                  >
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Enhet</th>
                        <th scope="col">Kontakt nummer</th>
                      </tr>
                    </thead>
                    {contactinfo?.data.map((contact) => {
                      return (
                        <>
                          <tbody key={contact?._id}>
                            <tr>
                              <th scope="row"></th>
                              <td>{contact.unit_name}</td>
                              <td>{contact.telephone_number}</td>
                            </tr>
                          </tbody>
                        </>
                      );
                    })}
                  </table>
                </Row>
                <button
                  variant="primary"
                  className=" m-0 stats_card"
                  onClick={() => {
                    navigate("/WorkRoutine");
                  }}
                >
                  <span className="d-block m-auto">Uppdatera</span>
                </button>
              </Container>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
};

export default Vikarieparm;
