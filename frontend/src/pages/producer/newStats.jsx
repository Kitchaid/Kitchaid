import React, { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { CreateStat, getSideTemplate } from "../../hooks/producerHooks/producerHooks";
import { getMenu } from '../../hooks/menu/menu';
import Tips from "../../Partials/Tips";
import { Row, Col, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { getAllValueFromSelect } from '../../utility/utility';
import StatsRecord from './components/lunchStats/statsRecord';
function NewStats() {
  const [selectedOption, setSelectedOption] = useState("");
  const [usedSide, setUsedSide] = useState(selectedOption?.defaultPerGuest);
  const [unitSide, setUnitSide] = useState(selectedOption?.unit);
  const [remain, setRemain] = useState();
  // get menu
  const { data: get_menu } = useQuery("getMenu", getMenu);
  //sides
  const { data: SideTemplate } = useQuery("getSideTemplate", () => getSideTemplate());
  //use react form hook  for create new stats
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      usedSideIngredient: usedSide,
      remainInStockSide: remain
    }
  });
  const { mutate } = CreateStat();
  const onSubmit = (data) => {
    mutate(data);
    reset();
  };
  // calculate amount for side for dish
  const guestAmount = watch('guestAmount')
  const purchasedSide = watch('purchasedSide')
  const usedSideInput = watch('usedSideIngredient')

  useEffect(() => {
    setUsedSide(selectedOption?.defaultPerGuest * parseInt(guestAmount))
    setUnitSide(selectedOption?.unit)
    setRemain(purchasedSide - usedSideInput)
  }, [selectedOption, guestAmount, SideTemplate?.data[0]?.side], purchasedSide, usedSideInput)
  //tips pop up
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //print out form
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef?.current,
    documentTitle: "Lunch statistik - produktionskök -- KITCHAID",
  });
  const getPageMargins = () => {
    return `@page { margin: 25mm 50mm 0 50mm !important; }`;
  };

  return (
    <>
      <form
        className="row align-items-center "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div ref={componentRef}>
          <style>{getPageMargins()}</style>
          <Row className="mt-4">
            {/* Left Column: Previous Content */}
            <Col lg={4} md={4} sm={12} xs={12} className="mb-4">
              {errors.dishName && (
                <p className="ms-1 p-1 error fs-6" role="alert">
                  Välj maträtten
                </p>
              )}
              <div className="mx-auto formFrame">
                <label className="visually-hidden" htmlFor="autoSizingInput"></label>
                <select
                  className="form-control"
                  name="dishName"
                  {...register("dishName", {
                    required: true,
                  })}
                >
                  <option value={""} disabled selected>Välj maträtten</option>
                  {get_menu?.data[0]?.menu?.map((menu, index) => {
                    return (
                      <option key={index} value={menu.dishName}>
                        {menu.dishName}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mx-auto formFrame mt-4">
                <label
                  className="visually-hidden"
                  htmlFor="autoSizingInput"
                ></label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Huvudkryddor(Smak) t.ex. Curry"
                  {...register("mainSpices", {
                    maxLength: 30,
                    type: String,
                  })}
                  aria-invalid={errors.mainSpices ? "true" : "false"}
                />
              </div>
              {errors.guestAmount?.type === "required" && (
                <p className="m-auto ms-5 error" role="alert">
                  Hur många gäster?
                </p>
              )}
              <div className="mx-auto formFrame">
                <Row>
                  <Col sm={12}>
                    <label htmlFor="autoSizingInput"
                    ><span className="text-light font-size-s">Antal ätande t.ex. 500</span></label>
                  </Col>
                  <Col sm={12}>
                    <input
                      type="number"
                      min={0}
                      className="form-control"
                      defaultValue={1}
                      onWheel={(e) => { e.preventDefault(); e.stopPropagation(); }}
                      {...register("guestAmount", {
                        required: true,
                        maxLength: 10,
                        type: Number,
                      })}
                      aria-invalid={errors.guestAmount ? "true" : "false"}
                    />
                  </Col>
                </Row>
              </div>
              {errors.mainIngredient?.type === "required" && (
                <p className="m-auto ms-5 error" role="alert">
                  Huvudvaror?
                </p>
              )}
              <div className="mx-auto formFrame mt-4">
                <label
                  className="visually-hidden"
                  htmlFor="autoSizingInput"
                ></label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Huvudkomponent t.ex. Köttbullar"
                  {...register("mainIngredient", {
                    required: true,
                    maxLength: 20,
                    type: String || Number,
                  })}
                  aria-invalid={errors.mainIngredient ? "true" : "false"}
                />
              </div>
              {errors.purchasedMainIngredient?.type === "required" && (
                <p className="m-auto ms-5 error" role="alert">
                  Måste fylla i
                </p>
              )}
              <div className="mx-auto formFrame">
                <Row>
                  <Col sm={12}>
                    <label htmlFor="autoSizingInput"
                    ><span className="text-light font-size-s">Tilllagad/inköpta mängd t.ex. 70</span></label>
                  </Col>
                  <Col sm={12}>
                    <input
                      type="number"
                      min={0}
                      step=".01"
                      className="form-control"
                      defaultValue={1}
                      {...register("purchasedMainIngredient", {
                        required: true,
                        maxLength: 10,
                        type: Number,
                      })}
                      aria-invalid={errors.purchasedMainIngredient ? "true" : "false"}
                    />
                  </Col>
                </Row>
              </div>
              {errors.usedMainIngredient?.type === "required" && (
                <p className="m-auto ms-5 error" role="alert">
                  Måste fylla i
                </p>
              )}
              <div className=" mx-auto formFrame d-block">
                <Row>
                  <Col sm={12}>
                    <label htmlFor="autoSizingInput"
                    ><span className="text-light font-size-s">Använd t.ex. 60</span></label>
                  </Col>
                  <Col sm={12}>
                    <input
                      type="number"
                      min={0}
                      step=".01"
                      className="form-control"
                      defaultValue={1}
                      {...register("usedMainIngredient", {
                        required: true,
                        maxLength: 10,
                        type: Number,
                      })}
                      aria-invalid={errors.usedMainIngredient ? "true" : "false"}
                    />
                  </Col>
                </Row>
              </div>
              {errors.remainInStockMain?.type === "required" && (
                <p className="m-auto ms-5 error" role="alert">
                  Måste fylla i
                </p>
              )}
              <div className=" mx-auto formFrame mt-4">
                <label
                  className="visually-hidden"
                  htmlFor="autoSizingInput"
                ></label>
                <input
                  type="number"
                  min={0}
                  step=".01"
                  className="form-control"
                  placeholder="Kvar t.ex. 10"
                  {...register("remainInStockMain", {
                    required: true,
                    maxLength: 10,
                  })}
                  aria-invalid={errors.remainInStockMain ? "true" : "false"}
                />
              </div>
              {errors.unitMain?.type === "required" && (
                <p className="m-auto ms-5 error" role="alert">
                  Välj enhet
                </p>
              )}
              <i
                className="fa-solid fa-bell fa-bounce glow ms-2"
                onClick={handleShow}
                media="print"
              >
                <span className="tips">tips</span>
              </i>
              <div className="m-auto formFrame mb-3">
                <input
                  className="radio"
                  type="radio"
                  value="FPK"
                  {...register("unitMain", { required: true })}
                  aria-checked={errors.unitMain ? "true" : "false"}
                />
                <label htmlFor="FPK">FPK &nbsp;&nbsp;&nbsp;</label>
                <input
                  className="radio"
                  type="radio"
                  value="Kilo"
                  {...register("unitMain", { required: true })}
                  aria-checked={errors.unitMain ? "true" : "false"}
                />
                <label htmlFor="Kilo">Kilo &nbsp;&nbsp;&nbsp;</label>
                <input
                  className="radio"
                  type="radio"
                  value="Liter"
                  {...register("unitMain", { required: true })}
                  aria-checked={errors.unitMain ? "true" : "false"}
                />
                <label htmlFor="Kilo">Liter &nbsp;&nbsp;&nbsp;</label>
              </div>
              <div className=" mx-auto formFrame d-block">
                <div className="input-group">
                  <input
                    type="number"
                    min={0}
                    step=".01"
                    className="form-control mb-3"
                    placeholder="Soppa/Sås mängd t.ex 30"
                    {...register("stewSoup")}
                  />
                  <div className="input-group-text">
                    <input
                      className="form-check-input d-none"
                      type="radio"
                      value="Liter"
                      readOnly={true}
                      {...register("stewSoupUnit")}
                    />
                    <span className="input-group border-0">Liter</span>
                  </div>
                </div>
                <div className="input-group">
                  <input
                    type="number"
                    min={0}
                    step=".01"
                    className="form-control"
                    placeholder="Soppa/Sås över t.ex. 5"
                    {...register("stewSoupLeft")}
                  />
                  <div className="input-group-text">
                    <input
                      className="form-check-input d-none"
                      type="radio"
                      value="Liter"
                      readOnly={true}
                      {...register("stewSoupUnit")}
                    />
                    <span className="input-group border-0">Liter</span>
                  </div>
                </div>
              </div>
            </Col>
            {/* Right Column: Form Section */}
            <Col lg={4} md={4} sm={12} xs={12}>
              <div className=" mx-auto formFrame mt-4">
                <label className="visually-hidden" htmlFor="autoSizingInput"></label>
                <select
                  className="form-control"
                  {...register("sideIngredient", { required: true })}
                  onBlur={(e) =>
                    getAllValueFromSelect(e, SideTemplate?.data[0]?.side, setSelectedOption)
                  }
                >
                  <option selected value="">
                    Välj tillbehör...
                  </option>
                  {SideTemplate?.data[0]?.side?.map((item, index) => (
                    <option value={item.sideIngredient} key={index}>
                      {item.sideIngredient}
                    </option>
                  ))}
                </select>
              </div>
              <div className=" mx-auto formFrame">
                <Row>
                  <Col sm={12}>
                    <label htmlFor="autoSizingInput">
                      <span className="text-light font-size-s">
                        Tillbehör(ris,pasta..) mängd t.ex. 5
                      </span>
                    </label>
                  </Col>
                  <Col sm={12}>
                    <input
                      type="number"
                      min={0}
                      step=".01"
                      className="form-control"
                      defaultValue={1}
                      {...register("purchasedSide", {
                        required: true,
                        maxLength: 10,
                        type: Number,
                      })}
                      aria-invalid={errors.purchasedSide ? "true" : "false"}
                    />
                  </Col>
                </Row>
              </div>
              <div className="mx-auto formFrame">
                <Row>
                  <Col sm={12}>
                    <label htmlFor="autoSizingInput">
                      <span className="text-light font-size-s">Använd tillbehör t.ex. 4</span>
                    </label>
                  </Col>
                  <Col sm={12}>
                    <input
                      type="number"
                      min={0}
                      step=".01"
                      className="form-control"
                      defaultValue={usedSide}
                      {...register("usedSideIngredient", {
                        required: true,
                        maxLength: 10,
                        type: Number,
                      })}
                      aria-invalid={errors.usedSideIngredient ? "true" : "false"}
                    />
                  </Col>
                </Row>
              </div>
              <div className="mx-auto formFrame mt-4">
                <label className="visually-hidden" htmlFor="autoSizingInput"></label>
                <input
                  type="number"
                  min={0}
                  step=".01"
                  className="form-control"
                  placeholder="Kvar t.ex. 5"
                  defaultValue={remain}
                  {...register("remainInStockSide", {
                    maxLength: 20,
                  })}
                  aria-invalid={errors.remainInStockSide ? "true" : "false"}
                />
              </div>
              <i
                className="fa-solid fa-bell fa-bounce glow ms-2"
                onClick={handleShow}
              >
                <span className="tips">tips</span>
              </i>
              <div className="d-flex ms-5 formFrame font-size-s mb-3">
                <input
                  className="radio me-auto"
                  type="radio"
                  checked={unitSide === "Kilo"}
                  value="Kilo"
                  {...register("unitSide", { required: true })}
                  aria-checked={errors.unitSide ? "true" : "false"}
                />
                <label htmlFor="Kilo" className="me-auto">
                  Kilo
                </label>
                <input
                  className="radio me-auto"
                  type="radio"
                  value="Liter"
                  checked={unitSide === "Liter"}
                  {...register("unitSide", { required: true })}
                  aria-checked={errors.unitSide ? "true" : "false"}
                />
                <label htmlFor="Kilo" className="me-auto">
                  Liter &nbsp;&nbsp;&nbsp;
                </label>
              </div>
              <div className="input-group mx-auto formFrame mt-4">
                <input
                  type="number"
                  min={0}
                  className="form-control mb-3"
                  placeholder="Tallrikssvinn t.ex. 5"
                  {...register("foodWaste", { type: Number })}
                />
                <div className="input-group-text">
                  <input
                    className="form-check-input d-none"
                    type="radio"
                    value="Kilo"
                    readOnly={true}
                    {...register("foodWastUnit")}
                  />
                  <span className="input-group border-0">Kilo</span>
                </div>
              </div>
              <div
                className="input-group  mx-auto formFrame"
                style={{ margin: "10px auto", maxWidth: "350px" }}
              >
                <textarea
                  id="comment"
                  className="form-control"
                  aria-label="With textarea"
                  placeholder="Kommentar"
                  {...register("comment", {
                    maxLength: 300,
                    type: String || Number,
                  })}
                  aria-invalid={errors.comment ? "true" : "false"}
                ></textarea>
              </div>
              <button type="submit" className="mainButton mb-4 p-1">
                <span>Bekräfta</span>
              </button>
              <div className="printForm" onClick={handlePrint}>
                <i className="fa-solid fa-print glow text-light"></i>
                <span> Utskriv formulären</span>
              </div>
            </Col>
            {/* Third column with StatsRecord button (shown only on medium screens and above) */}
            <Col sm={12} xs={12} md={4} lg={4} className="d-none d-md-block">
              <StatsRecord />
            </Col>
          </Row>
        </div>
      </form>
      <Modal size="sm" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Kantin modell</Modal.Title>
        </Modal.Header>
        <Modal.Body>{<Tips />}</Modal.Body>
        <Modal.Footer>Information från Martin&Servera</Modal.Footer>
      </Modal>
    </>
  );
}

export default NewStats;
