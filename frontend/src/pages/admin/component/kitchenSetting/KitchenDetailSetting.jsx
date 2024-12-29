import React, { useState } from "react";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { Modal, Row, Col, Button } from "react-bootstrap";
import VikareiParmSetting from "./vikarieParmSetting";
import {
  getProducer,
  getReceiver,
  UpdateKitchenpw,
  UpdateSubKitchen,
  UpdateKitchenFunction,
  UpdateKitchenFunctionContent,
  UpdateKitchenDeliveryTime,
  UpdateUsername,
  UpdateUserStatus,
  DeleteOneUser
} from "../../../../hooks/admin/admin";
import WidgetSetting from "./widgetSetting"
import Accordion from "react-bootstrap/Accordion";
import Spinner from "../../../../Partials/Spinner";

function UserDetails(props) {
  const belongToId = props._id;
  const [smShow, setSmShow] = useState(false);
  const [smShowUsername, setSmShowUsername] = useState(false);
  const [show, setShow] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [showUserStatus, setShowUserStatus] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);
  const [functionShow, setFunctionShow] = useState(false);
  const [widgetShow, setWidgetShow] = useState(false);
  const [vPShow, setVPShow] = useState(false);
  const [isProducer, setIsProducer] = useState();
  const [kitchenName, setKitchenName] = useState('');
  const [widgetData, setWidgetData] = useState();
  const [deliveryTime, setDeliveryTime] = useState(false);
  const [id, setId] = useState();
  const [username, setUsername] = useState("");
  const [userStatus, setUserStatus] = useState(false);
  const [userMakeOwnMainDish, setUserMakeOwnMainDish] = useState(false);
  const [userMakeOwnSide, setUserMakeOwnSide] = useState(false);
  const [userMakeOwnSauce, setUserMakeOwnSauce] = useState(false);
  const [selectedHours, setSelectedHours] = useState('0');
  const [selectedMinutes, setSelectedMinutes] = useState('0');
  // Using the fetching hook
  const {
    data: dataReceiver,
    error: errorReceiver,
    isLoading: loadingReceiver,
  } = useQuery(["getReceiver", belongToId], () => getReceiver(belongToId));
  const {
    data: dataProducer,
  } = useQuery("getProducer", getProducer);
  //change belongTo kitchen
  const [update, setUpdate] = useState(dataReceiver?.data);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdate((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  //Update kitchen
  const { mutate: subKitchen } = UpdateSubKitchen();
  const { mutate: updateKitchenFunction } = UpdateKitchenFunction();
  const { mutate: updateKitchenFunctionContent } = UpdateKitchenFunctionContent();
  const { mutate: updateKitchenDeliveryTime } = UpdateKitchenDeliveryTime();
  const { mutate: updateUsername } = UpdateUsername();
  const { mutate: updateUserStatus } = UpdateUserStatus();
  const { mutate: deleteOneUser } = DeleteOneUser();
  const renderSelect = () => {
    return (
      <select
        onChange={handleChange}
        name='belongToId'
        className="form-select"
      >
        <option value={"507f1f77bcf86cd799439011"}>Tillagningskök</option>
        {dataProducer?.data.map((kitchen, index) => {
          return (
            <option key={index} value={kitchen._id}>
              {kitchen.username}
            </option>
          );
        })}
      </select>
    );
  };

  const handleHoursChange = (e) => {
    setSelectedHours(e.target.value);
  };

  const handleMinutesChange = (e) => {
    setSelectedMinutes(e.target.value);
  };
  const handleTimeSubmit = (e) => {
    e.preventDefault();
    const data = {
      hours: selectedHours,
      minutes: selectedMinutes
    };
    updateKitchenDeliveryTime({ id, data });
  };
  const handleBelongtoSubmit = async () => {
    subKitchen({ id, update })
  };
  const handleFunctiontoSubmit = async () => {
    const belongToKitchen = undefined;
    updateKitchenFunction({ id, isProducer, belongToKitchen });
    setFunctionShow(false);
    setConfirmShow(false);
  };
  const handleWidgetToSubmit = async () => {
    updateKitchenFunctionContent({ id, widgetData })
  };
  const handleUpdateUsername = async (e) => {
    e.preventDefault();
    const data = {
      username: username
    };
    if (username !== undefined || username !== "") { updateUsername({ id, data }) }
    else (alert('Vänligen ange användarnamn'))
  };
  //user status
  const handleUserStatus = () => {
    setUserStatus(!userStatus);
  }
  const handleUserMakeOwnMainDish = () => {
    setUserMakeOwnMainDish(!userMakeOwnMainDish);
  }
  const handleUserMakeOwnSide = () => {
    setUserMakeOwnSide(!userMakeOwnSide);
  }
  const handleUserMakeOwnSauce = () => {
    setUserMakeOwnSauce(!userMakeOwnSauce);
  }
  const handleUserStatusSubmit = () => {
    const data = {
      isActived: userStatus,
      makeOwnMainDish: userMakeOwnMainDish,
      makeOwnSide: userMakeOwnSide,
      makeOwnSauce: userMakeOwnSauce,
    }
    updateUserStatus({ id, data })
  }
  //update kitchen PW delivery time
  const { mutate: updatePW } = UpdateKitchenpw()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    updatePW({ id, data });
    reset();
  };
  const widgetdata = (data) => {
    setWidgetData(data)
  }
  //delete user
  const handleUserDelete = () => {
    if (username !== kitchenName || username === "") {
      alert('Vänligen bekräfta och ange rätt användarnamn!');
      return
    }
    deleteOneUser(id)
  }
  if (errorReceiver) return <div>Nånting gick fel</div>;
  if (loadingReceiver)
    return (
      <div style={{ height: '100vh' }}>
        <Spinner />
      </div>
    );
  return (
    <>
      <div className="">
        <Accordion className="w-100 m-auto">
          {dataReceiver?.data.map((kitchen, index) => {
            return (
              <>
                <h6 className="small mb-3">Mottagningskök:</h6>
                <Accordion.Item eventKey={index} className='mb-3'>
                  <Accordion.Header>{kitchen.username}</Accordion.Header>
                  <Accordion.Body>
                    <div className="d-flex m-auto mt-2">
                      <div className="m-auto">
                        <button
                          className="stats_card m-2 w-100"
                          onClick={() => {
                            setSmShow(true);
                            setId(kitchen?._id);
                            setKitchenName(kitchen?.username)
                          }}
                        >
                          <span className="small">Ändra lösenord</span>
                        </button>
                        <button
                          className="stats_card m-2 w-100"
                          onClick={() => {
                            setSmShowUsername(true);
                            setId(kitchen?._id);
                            setKitchenName(kitchen?.username)
                          }}
                        >
                          <span className="small">Ändra användarnamn</span>
                        </button>
                        <button
                          className="stats_card m-2 w-100"
                          onClick={() => {
                            setId(kitchen?._id);
                            setShow(true);
                          }}
                        >
                          <span className="small">Ändra tillhörighet</span>
                        </button>
                        <button
                          className="stats_card m-2 w-100"
                          onClick={() => {
                            setId(kitchen?._id);
                            setFunctionShow(true);
                          }}
                        >
                          <span className="small">Ändra köksfunktioner</span>
                        </button>
                      </div>
                      <div className="m-auto">
                        <button
                          className="stats_card m-2 w-100"
                          onClick={() => {
                            setId(kitchen?._id);
                            setShowUserStatus(true);
                            setUserStatus(kitchen?.isActived)
                          }}
                        >
                          <span className="small">Ändra kökets status</span>
                        </button>
                        <button
                          className="stats_card m-2 w-100"
                          onClick={() => {
                            setWidgetShow(true);
                            setId(kitchen?._id);
                            setKitchenName(kitchen?.username)
                          }}
                        >
                          <span className="small">Widgetinställning</span>
                        </button>
                        <button
                          className="stats_card m-2 w-100"
                          onClick={() => {
                            setDeliveryTime(true);
                            setId(kitchen?._id);
                            setKitchenName(kitchen?.username)
                          }}
                        >
                          <span className="small">Leveranstid</span>
                        </button>
                        <button
                          className="stats_card m-2 w-100"
                          onClick={() => {
                            setVPShow(true);
                            setId(kitchen?._id);
                            setKitchenName(kitchen?.username)
                          }}
                        >
                          <span className="small">Vikarie pärm Inställning</span>
                        </button>
                        <Button
                          className="m-2 w-100"
                          variant="danger"
                          onClick={() => {
                            setShowDeleteUser(true);
                            setId(kitchen?._id);
                            setKitchenName(kitchen?.username)
                          }}
                        >
                          <span className="small">Radera användare</span>
                        </Button>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </>
            );
          })}
        </Accordion>
        {/* change password */}
        <Modal
          size="sm"
          show={smShow}
          centered
          onHide={() => setSmShow(false)}
          aria-labelledby="example-modal-sizes-title-sm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Header closeButton>
              <Modal.Title>Ändra lösenord av {kitchenName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                    type='password'
                    className="form-control"
                    placeholder="Lösenord"
                    {...register("password", { required: true, maxLength: 50, type: String })}
                    aria-invalid={errors.passowrd ? "true" : "false"}
                  />
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
                    type='password'
                    className="form-control"
                    placeholder="Bekräfta Lösenord"
                    // defaultValue={admin_email}
                    {...register("password2", { required: true, maxLength: 50, type: String })}
                    aria-invalid={errors.passowrd2 ? "true" : "false"}
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button type="submit" className="stats_card w-100">
                Uppdatera
              </button>
            </Modal.Footer>
          </form>
        </Modal>
        {/* change username */}
        <Modal
          size="sm"
          show={smShowUsername}
          centered
          onHide={() => setSmShowUsername(false)}
          aria-labelledby="example-modal-sizes-title-sm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Header closeButton>
              <Modal.Title>Ändra användarnamn av {kitchenName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="input-group">
                <div className=" m-auto mb-3 item formFrame w-100">
                  <label
                    className="visually-hidden"
                    htmlFor="autoSizingInput"
                  ></label>
                  <input
                    aria-label="username"
                    aria-describedby="basic-addon1"
                    type='text'
                    className="form-control"
                    placeholder="Användarnamn"
                    defaultValue={kitchenName}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button type="button" className="stats_card w-100" onClick={(e) => handleUpdateUsername(e)}>
                Uppdatera
              </button>
            </Modal.Footer>
          </form>
        </Modal>
        {/* change status */}
        <Modal
          size="sm"
          show={showUserStatus}
          centered
          onHide={() => setShowUserStatus(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
              Ändra kökets status
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="mb-3">
              <Col xs={10}><span>Aktiverad</span></Col>
              <Col xs={2}>
                <input
                  type="checkbox"
                  checked={userStatus}
                  onChange={handleUserStatus}
                /></Col>
            </Row>
            <Row className="mb-3">
              <Col xs={10}><span>Utför egen huvudrätt</span></Col>
              <Col xs={2}>
                <input
                  type="checkbox"
                  checked={userMakeOwnMainDish}
                  onChange={handleUserMakeOwnMainDish}
                /></Col>
            </Row>
            <Row className="mb-3">
              <Col xs={10}><span>Utför egen tillbehör</span></Col>
              <Col xs={2}>
                <input
                  type="checkbox"
                  checked={userMakeOwnSide}
                  onChange={handleUserMakeOwnSide}
                /></Col>
            </Row>
            <Row className="mb-3">
              <Col xs={10}><span>Utför egen kall sås</span></Col>
              <Col xs={2}>
                <input
                  type="checkbox"
                  checked={userMakeOwnSauce}
                  onChange={handleUserMakeOwnSauce}
                /></Col>
            </Row>
            <button
              className="stats_card mt-3 w-100"
              onClick={() => {
                handleUserStatusSubmit();
                setShowUserStatus(false);
              }}
            >
              Uppdatera
            </button>
          </Modal.Body>
        </Modal>
        {/* change belonging */}
        <Modal
          size="sm"
          show={show}
          centered
          onHide={() => setShow(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
              Ändra tillhörighet till
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {renderSelect()}
            <button
              className="stats_card mt-3 w-100"
              onClick={() => {
                handleBelongtoSubmit();
                setShow(false);
              }}
            >
              Uppdatera
            </button>
          </Modal.Body>
        </Modal>
        {/* change function */}
        <Modal
          size="sm"
          show={functionShow}
          centered
          onHide={() => setFunctionShow(false)}
          aria-labelledby="function-sm"
        >
          <Modal.Header>
            <Modal.Title id="function-sm">
              Ändra kökets funktion till
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <button className="stats_card w-100" onClick={() => { setIsProducer(true); setConfirmShow(true) }}> Tillagningskök </button>
          </Modal.Body>
        </Modal>
        {/*change delivery time*/}
        <Modal
          size="sm"
          show={deliveryTime}
          centered
          onHide={() => setDeliveryTime(false)}
          aria-labelledby="example-modal-sizes-title-sm">
          <form>
            <Modal.Header closeButton>
              <Modal.Title>Ändra leveranstid av {kitchenName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="input-group">
                <label>
                  Hours:
                  <select value={selectedHours} onChange={handleHoursChange}>
                    {[...Array(24).keys()].map(hour => (
                      <option key={hour} value={hour}>{hour}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Minutes:
                  <select value={selectedMinutes} onChange={handleMinutesChange}>
                    {[...Array(60).keys()].map(minute => (
                      <option key={minute} value={minute}>{minute}</option>
                    ))}
                  </select>
                </label>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={(e) => { handleTimeSubmit(e); setDeliveryTime(false) }} className="stats_card w-100">
                Uppdatera
              </button>
            </Modal.Footer>
          </form>
        </Modal>
        {/* confirm */}
        <Modal
          size="sm"
          show={confirmShow}
          centered
          onHide={() => setConfirmShow(false)}
          aria-labelledby="confirm-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="confirm-sm">
              Är du säker?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <button
              className="mt-3"
              variant="warning"
              onClick={() => {
                handleFunctiontoSubmit();
              }}
            >
              Jo, Uppdatera
            </button>
            <button
              className="mt-3 ms-3"
              variant="danger"
              onClick={() => {
                setIsProducer(false);
                setFunctionShow(false);
                setConfirmShow(false);
              }}
            >
              Nej
            </button>
          </Modal.Body>
        </Modal>
        {/* change widget */}
        <Modal
          size="md"
          show={widgetShow}
          centered
          onHide={() => setWidgetShow(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
              Ändra kökets widget
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <WidgetSetting widgetdata={widgetdata} id={id} />
          </Modal.Body>
          <Modal.Footer>
            <button
              className="mt-3 stats_card w-100"
              onClick={() => {
                handleWidgetToSubmit();
                setWidgetShow(false);
              }}
            >
              Uppdatera
            </button>
          </Modal.Footer>
        </Modal>
        {/* change vikarie parm */}
        <Modal
          size="md"
          show={vPShow}
          centered
          onHide={() => setVPShow(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
              Vikarie pärm inställning
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <VikareiParmSetting id={id} />
          </Modal.Body>
        </Modal>
        {/* kitchen function */}
        <Modal
          size="sm"
          show={confirmShow}
          centered
          onHide={() => setFunctionShow(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
              Är du säker?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <button
              className="mt-3"
              variant="warning"
              onClick={() => {
                handleFunctiontoSubmit();
                setFunctionShow(false);
              }}
            >
              Jo, Uppdatera
            </button>
            <button
              className="mt-3 ms-3"
              variant="danger"
              onClick={() => {
                setIsProducer(false)
                setFunctionShow(false);
                setConfirmShow(false)
              }}
            >
              Nej
            </button>
          </Modal.Body>
        </Modal>
        {/* kitchen user delete */}
        <Modal
          size="sm"
          show={showDeleteUser}
          centered
          onHide={() => setShowDeleteUser(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
              Är du säker?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <span className="font-size-s">
                Är du säker på att du vill ta bort den här användaren?
                Att ta bort användaren kommer även att radera all information relaterad till användaren.
                Vänligen bekräfta och ange rätt användarnamn och klicka på ta bort.
              </span>
            </div>
            <hr></hr>
            <div className="input-group">
              <div className=" m-auto mb-3 item formFrame w-100">
                <label
                  className="visually-hidden"
                  htmlFor="autoSizingInput"
                ></label>
                <input
                  aria-label="username"
                  aria-describedby="basic-addon1"
                  type='text'
                  className="form-control"
                  placeholder="Användarnamn"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <hr></hr>
            <Button
              className="mt-3"
              variant="warning"
              onClick={() => {
                handleUserDelete();
                setShowDeleteUser(false);
              }}
            >
              Jo, radera
            </Button>
            <Button
              className="mt-3 ms-3"
              variant="danger"
              onClick={() => {
                setShowDeleteUser(false);
              }}
            >
              Nej
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default UserDetails;
