import React, { useState } from "react";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import KitchenDetailSetting from "./KitchenDetailSetting"
import VikareiParmSetting from "./vikarieParmSetting";
import Modal from "react-bootstrap/Modal";
import WidgetSetting from "./widgetSetting"
import Accordion from "react-bootstrap/Accordion";
import {
  getProducer,
  UpdateKitchenpw,
  UpdateKitchenFunction,
  UpdateKitchenFunctionContent,
} from "../../../../hooks/admin/admin";
import Spinner from "../../../../Partials/Spinner";

function AllUserList() {
  const [smShow, setSmShow] = useState(false);
  const [kitchenName, setKitchenName] = useState('');
  const [isProducer, setIsProducer] = useState(true);
  const [id, setId] = useState('');
  const [belongToKitchen, setBelongToKitchen] = useState();
  const [widgetData, setWidgetData] = useState();
  const [widgetShow, setWidgetShow] = useState(false);
  const [vPShow, setVPShow] = useState(false);
  const [confirmProducerShow, setConfirmProducerShow] = useState(false);
  const [functionProducerShow, setFunctionProducerShow] = useState(false);
  // Using the fetching hook
  const { data, error, isLoading } = useQuery("getProducer", () => getProducer());
  //update kitchen PW
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
  //Update kitchen function
  const handleChange = (e) => {
    const { value } = e.target;
    setBelongToKitchen(value)
  };
  //render select menu
  const renderSelect = () => {
    return (
      <div>
        <select
          onChange={handleChange}
          name="belongTo_id"
          className="form-select"
        >
          <option value={"507f1f77bcf86cd799439011"}>Tillhör köket</option>
          {data?.data.map((kitchen, index) => {
            return (
              <option key={index} value={kitchen._id}>
                {kitchen.username}
              </option>
            );
          })}
        </select>
      </div>
    );
  };
  const { mutate: updateKitchenFunction } = UpdateKitchenFunction();
  const handleFunctiontoSubmit = async () => {
    updateKitchenFunction({ id, isProducer, belongToKitchen })
  };

  //Update widget
  const widgetdata = (data) => {
    setWidgetData(data)
  }
  const { mutate: updateKitchenFunctionContent } = UpdateKitchenFunctionContent();
  const handleWidgetToSubmit = async () => {
    updateKitchenFunctionContent({ id, widgetData })
  };
  if (error) return <div>Nånting gick fel</div>;
  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  return (
    <>
      <main>
        <section className="mt-3 m-auto overflow">
          <Accordion className="w-100 m-auto">
            {data?.data.map((kitchen, index) => {
              return (
                <>
                  <h6 className="small mb-3">Produktionskök:</h6>
                  <Accordion.Item eventKey={index} className='mb-3'>
                    <Accordion.Header>{kitchen.username}</Accordion.Header>
                    <Accordion.Body>
                      <div className="d-flex m-auto">
                        <div className="m-auto mt-2">
                          <button
                            key={index}
                            className="stats_card m-2 w-100"
                            onClick={() => setId(kitchen?._id)}
                          >
                            <span className="small">Mottagningskök</span>
                          </button>
                          <button
                            className="stats_card m-2 w-100"
                            onClick={() => {
                              setSmShow(true);
                              setId(kitchen?._id)
                              setKitchenName(kitchen?.username)
                            }}
                          >
                            <span className=" small">Ändra lösenord</span>
                          </button>
                          <button
                            className="stats_card m-2 w-100"
                            onClick={() => {
                              setId(kitchen?._id);
                              setFunctionProducerShow(true);
                            }}
                          >
                            <span className="small">Ändra köksfunktioner</span>
                          </button>
                        </div>
                        <div className="m-auto">
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
                            disabled
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
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </>
              );
            })}
          </Accordion>
        </section>
        <section>
          <KitchenDetailSetting
            key={id}
            _id={id}
          />
        </section>
        {/*change password*/}
        <Modal
          size="sm"
          show={smShow}
          centered
          onHide={() => setSmShow(false)}
          aria-labelledby="example-modal-sizes-title-sm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Header closebutton>
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
                    // defaultValue={admin_email}
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
        {/* change widget */}
        <Modal
          size="md"
          show={widgetShow}
          centered
          onHide={() => setWidgetShow(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closebutton>
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
        {/* change function */}
        <Modal
          size="sm"
          show={functionProducerShow}
          centered
          onHide={() => setFunctionProducerShow(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header>
            <Modal.Title id="example-modal-sizes-title-sm">
              Ändra kökets funktion till
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Välja :</h6>
            {renderSelect()}
            <button className="stats_card w-100 mt-3" onClick={() => { setIsProducer(false); setConfirmProducerShow(true) }}> Mottagningskök </button>
          </Modal.Body>
        </Modal>
        {/*confirm changes*/}
        <Modal
          size="sm"
          show={confirmProducerShow}
          centered
          onHide={() => setConfirmProducerShow(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header>
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
                setConfirmProducerShow(false)
                setFunctionProducerShow(false);
              }}
            >
              Jo, Uppdatera
            </button>
            <button
              className="mt-3 ms-3"
              variant="danger"
              onClick={() => {
                setFunctionProducerShow(false);
                setConfirmProducerShow(false)
              }}
            >
              Nej
            </button>
          </Modal.Body>
        </Modal>
        {/* change vikarie parm */}
        <Modal
          size="md"
          show={vPShow}
          centered
          onHide={() => setVPShow(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closebutton>
            <Modal.Title id="example-modal-sizes-title-sm">
              Vikarie pärm inställning
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <VikareiParmSetting id={id} />
          </Modal.Body>
        </Modal>
      </main>
    </>
  );
}

export default AllUserList;
