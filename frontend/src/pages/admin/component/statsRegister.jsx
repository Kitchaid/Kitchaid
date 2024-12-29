import React, { useRef, useState } from "react";
import { CreateStat, getSideTemplate } from "../../../hooks/producerHooks/producerHooks";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useForm, Controller } from "react-hook-form";
import { useQuery } from "react-query";
import { getMenu } from '../../../hooks/menu/menu'
import { Row, Col } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import { getAllUsersForAdmin } from "../../../hooks/admin/admin";
import StatsRecord from "./statsRecord";
function NewStats() {
  // get menu
  const { data: get_menu } = useQuery("getMenu", getMenu);
  //get all users
  const { data: allUser } = useQuery('getAllUsers', getAllUsersForAdmin)
  // get side template
  const { data: SideTemplate } = useQuery("getSideTemplate", () => getSideTemplate());

  //use react form hook  for create new stats
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const { mutate } = CreateStat();
  const onSubmit = (data) => {
    const kitchenId = { kitchenId: user }
    const submitData = Object.assign(data, kitchenId)
    mutate(submitData);
  };
  const [user, setUser] = useState()

  const handleChange = (e) => {
    const { value } = e.target;
    setUser(value);
  };
  //print out form
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef?.current,
    documentTitle: "Lunch statistik - mottagningskök - KITCHAID",
  });
  const getPageMargins = () => {
    return `@page { margin: 10mm 40mm 0 40mm !important; }
             @media print {input::placeholder {color: transparent, box-shadow: none}!important; }`;
  };
  return (<>
    <Row>
      <Col>
        <form
          className="row align-items-center mt-4 text-light"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div ref={componentRef}>
            <style>{getPageMargins()}</style>
            <div className=" m-auto formFrame mb-4">
              <select
                className="form-select"
                onChange={(e) => handleChange(e)}
              >
                <option value={"6408a5b93fa56cd835cd1083"}>Välj köket</option>
                {allUser?.data?.map((kitchen, index) => {
                  return (
                    <option key={index} value={kitchen._id}>
                      {kitchen.username}
                    </option>
                  );
                })}
              </select>
            </div>
            {errors.dishName && (
              <p className="ms-1 p-1 error fs-6" role="alert">
                Välj maträtten
              </p>
            )}
            <div className="sm mx-auto formFrame">
              <label htmlFor="dishName"></label>
              <select
                name="dishName"
                {...register("dishName", {
                  required: true,
                })}
                className="form-select"
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
            {errors.guestAmount?.type === "required" && (
              <p className="m-auto ms-5 error" role="alert">
                Hur många gäster?
              </p>
            )}
            <div className="mx-auto formFrame">
              <Row>
                <Col sm={12}>
                  <label htmlFor="autoSizingInput"
                  ><span className="font-size-s">Antal ätande t.ex. 500</span></label>
                </Col>
                <Col sm={12}>
                  <input
                    type="number"
                    min={0}
                    className="form-control"
                    defaultValue={1}
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
                Huvudkomponent?
              </p>
            )}
            <div className="mx-auto formFrame">
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
                  ><span className="font-size-s">Mottagen mängd t.ex. 70</span></label>
                </Col>
                <Col sm={12}>
                  <input
                    type="number"
                    min={0}
                    step=".01"
                    className="form-control"
                    defaultValue={0}
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
            <div className="mx-auto formFrame d-block">
              <Row>
                <Col sm={12}>
                  <label htmlFor="autoSizingInput"
                  ><span className="font-size-s">Uppäten t.ex. 60</span></label>
                </Col>
                <Col sm={12}>
                  <input
                    type="number"
                    min={0}
                    step=".01"
                    className="form-control"
                    defaultValue={0}
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
            <div className="mx-auto formFrame mt-4">
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
            <div className=" formFrame mx-auto">
              <input
                type="radio"
                className="radio"
                value="Styck"
                {...register("unitMain", { required: true })}
                aria-checked={errors.unitMain ? "true" : "false"}
              />
              <label htmlFor="Styck">Styck &nbsp;&nbsp;&nbsp;</label>
              <input
                type="radio"
                className="radio"
                value="L-bleck"
                {...register("unitMain", { required: true })}
                aria-checked={errors.unitMain ? "true" : "false"}
              />
              <label htmlFor="FPK">L-bleck &nbsp;&nbsp;&nbsp;</label>
              <input
                type="radio"
                className="radio"
                value="Kilo"
                {...register("unitMain", { required: true })}
                aria-checked={errors.unitMain ? "true" : "false"}
              />
              <label htmlFor="Kilo">Kilo &nbsp;&nbsp;&nbsp;</label>
              <input
                type="radio"
                className="radio"
                value="Liter"
                {...register("unitMain", { required: true })}
                aria-checked={errors.unitMain ? "true" : "false"}
              />
              <label htmlFor="Pase">Liter &nbsp;&nbsp;&nbsp;</label>
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
            <div className=" mx-auto formFrame mt-4">
              <label
                className="visually-hidden"
                htmlFor="autoSizingInput"
              ></label>
              <select
                className="form-control"
                name="sideIngredient"
                {...register("sideIngredient", { required: true })}
              >
                <option selected value="">Välj tillbehör...</option>
                {SideTemplate?.data[0]?.side.map((item, index) => {
                  return <>
                    <option
                      value={item.sideIngredient}
                      key={index}
                    >{item.sideIngredient}
                    </option>
                  </>
                })}
              </select>
            </div>
            <div className="mx-auto formFrame">
              <Row>
                <Col sm={12}>
                  <label htmlFor="autoSizingInput"
                  ><span className="font-size-s">Mottagen tillbehör(ris,pasta..) mängd t.ex. 5</span></label>
                </Col>
                <Col sm={12}>
                  <input
                    type="number"
                    min={0}
                    step=".01"
                    className="form-control"
                    defaultValue={0}
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
                  <label htmlFor="autoSizingInput"
                  ><span className="font-size-s">Uppäten tillbehör t.ex. 4</span></label>
                </Col>
                <Col sm={12}>
                  <input
                    type="number"
                    min={0}
                    step=".01"
                    className="form-control"
                    defaultValue={0}
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
              <label
                className="visually-hidden"
                htmlFor="autoSizingInput"
              ></label>
              <input
                type="number"
                min={0}
                step=".01"
                className="form-control"
                placeholder="Kvar t.ex. 5"
                {...register("remainInStockSide", {
                  maxLength: 20,
                })}
                aria-invalid={errors.remainInStockSide ? "true" : "false"}
              />
            </div>
            <div className=" formFrame mx-auto">
              <input
                type="radio"
                className="radio"
                id="Styck"
                {...register("unitSide")}
                value="Styck"
              />
              <label htmlFor="Styck">Styck &nbsp;&nbsp;&nbsp;</label>
              <input
                type="radio"
                className="radio"
                id="FPK"
                {...register("unitSide")}
                value="L-bleck"
              />
              <label htmlFor="FPK">L-bleck &nbsp;&nbsp;&nbsp;</label>
              <input
                type="radio"
                className="radio"
                id="Kilo"
                {...register("unitSide")}
                value="Kilo"
              />
              <label htmlFor="Kilo">Kilo &nbsp;&nbsp;&nbsp;</label>
              <input type="radio"
                className="radio" {...register("unitSide")} value="Liter" />
              <label htmlFor="Pase">Liter &nbsp;&nbsp;&nbsp;</label>
            </div>
            <div className="d-flex">
              <div className=" text-center mt-2 mb-2">Smakar bra?</div>
              <div className=" ms-1  mt-2 mb-2">
                <div className="star-rating ms-5">
                  <Controller
                    control={control}
                    name="starRating"
                    render={({ field: { onChange, value } }) => (
                      <Box
                        sx={{
                          "& > legend": { mt: 2 },
                        }}
                      >
                        <Rating onChange={onChange} selected={value} />
                      </Box>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="input-group mx-auto formFrame">
              <input
                type="number"
                min={0}
                step=".01"
                className="form-control mb-3"
                placeholder="Tallrikssvinn t.ex. 5"
                {...register("foodWaste", { type: String || Number })}
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
              className="input-group mx-auto formFrame"
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
              ></textarea>
            </div>
          </div>
          <button type="submit" className="mainButton mb-4 p-1">
            <span>Bekräfta</span>
          </button>
          <div className="printForm printer-icon" onClick={handlePrint}>
            <i className="fa-solid fa-print glow me-1"></i>
            <span>Utskriv</span>
          </div>
        </form>
      </Col>
      <Col>
        <StatsRecord props={user} />
      </Col>
    </Row>

  </>
  );
}

export default NewStats;
