import React, { useState, useEffect, useContext } from "react";
import from "../../../Partials/";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { Row, Col, Button } from "react-bootstrap";
import { contextData } from '../../../ContextApi'
import { getStatById, UpdateStat, getSideStat, getSideTemplate } from '../../../hooks/producerHooks/producerHooks'
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Spinner from "../../../Partials/Spinner";

function UpdateStats() {
  const { userdata } = useContext(contextData)
  const isProducer = userdata.isProducer;
  //get specific stats...
  let location = useLocation()
  let _id = location.state.id
  const defaultData = location.state.props
  delete defaultData?.sides
  const { data, isLoading } = useQuery(["getStatById", _id], () => getStatById(_id));
  //Update stats.....
  const [updateStats, setUpdateStats] = useState();
  const [sideIngredientName, setSideIngredientName] = useState({});
  const [sideIngredientId, setSideIngredientId] = useState();
  const [purchasedSide, setPurchasedSide] = useState();
  const [usedSideIngredient, setUsedSideIngredient] = useState();
  const [remainInStockSide, setRemainInStockSide] = useState();
  const [foodWaste, setFoodWaste] = useState();
  const [comment, setComment] = useState();
  const { mutate } = UpdateStat();
  const navigate = useNavigate();
  const params = { id: _id, sideIngredient: sideIngredientName.sideIngredient }
  const { data: getSideData } = useQuery(["getSideStat", params], () => getSideStat(params));
  const { data: SideTemplate } = useQuery("getSideTemplate", () => getSideTemplate());
  //use react form hook for create update statisk
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset
  } = useForm({
    defaultValues: defaultData
  });

  useEffect(() => {
    setSideIngredientId(getSideData?.data[0]?.sides?._id)
    setPurchasedSide(getSideData?.data[0]?.sides?.purchasedSide)
    setUsedSideIngredient(getSideData?.data[0]?.sides?.usedSideIngredient)
    setRemainInStockSide(getSideData?.data[0]?.sides?.remainInStockSide)
    setFoodWaste(getSideData?.data[0]?.sides?.foodWaste)
    setComment(getSideData?.data[0]?.sides?.comment)
    // reset(defaultData)
  }, [getSideData, data])
  const renderSideData = () => {
    return <>
      <div className=" mx-auto item">
        <label
          className="visually-hidden"
          htmlFor="autoSizingInput"
        >Mottagen</label>
        <input
          type="number"
          min={0}
          step='0.01'
          className="form-control"
          name="purchasedSide"
          placeholder="Ej registrerad"
          defaultValue={purchasedSide}
          onChange={handleChange}
        />
      </div>
      <div className=" mx-auto item">
        <label
          className="visually-hidden"
          htmlFor="autoSizingInput"
        >Uppäten</label>
        <input
          type="number"
          min={0}
          step='0.01'
          className="form-control"
          name="usedSideIngredient"
          placeholder="Ej registrerad"
          defaultValue={usedSideIngredient}
          onChange={handleChange}
        />
      </div>
      <div className=" mx-auto item">
        <label
          className="visually-hidden"
          htmlFor="autoSizingInput"
        >Kvar</label>
        <input
          type="number"
          min={0}
          step='0.01'
          className="form-control"
          name="remainInStockSide"
          placeholder="Kvar t.ex. 5"
          defaultValue={remainInStockSide}
          onChange={handleChange}
        />
      </div>
      <div
        className=" formFrame"
        style={{ marginLeft: "48px" }}
      >
        <input
          className="radio"
          type="radio"
          id="Styck"
          name="unitSide"
          value="Styck"
          onChange={handleChange}
        />
        <label>Styck &nbsp;&nbsp;&nbsp;</label>
        <input
          className="radio"
          type="radio"
          id="FPK"
          name="unitSide"
          value="L-bleck"
          onChange={handleChange}
        />
        <label >L-bleck &nbsp;&nbsp;&nbsp;</label>
        <input
          className="radio"
          type="radio"
          id="Kilo"
          name="unitSide"
          value="kilo"
          onChange={handleChange}
        />
        <label>Kilo &nbsp;&nbsp;&nbsp;</label>
        <input
          className="radio"
          type="radio"
          id="Pase"
          name="unitSide"
          value="liter"
          onChange={handleChange}
        />
        <label>Liter &nbsp;&nbsp;&nbsp;</label>
      </div>
      <div className="input-group  mx-auto formFrame">
        <label
          className="visually-hidden"
          htmlFor="autoSizingInput"
        >Mat svinn</label>
        <input
          type="number"
          step='0.01'
          min={0}
          className="form-control mb-3"
          name="foodWaste"
          placeholder="Tallrikssvinn t.ex. 5"
          defaultValue={foodWaste}
          onChange={handleChange}
        />
        <div className="input-group-text">
          <input
            className="form-check-input d-none"
            type="radio"
            name="foodWastUnit"
            value="Kilo"
            onChange={handleChange}
          />
          <span className="input-group border-0">Kilo</span>
        </div>
      </div>
      <div
        className="input-group  mx-auto item"
        style={{ margin: "10px auto", maxWidth: "350px" }}
      >
        <textarea
          className="form-control"
          aria-label="With textarea"
          name="comment"
          placeholder="Kommentar"
          defaultValue={comment}
          onChange={handleChange}
        ></textarea>
      </div>
    </>
  }
  const handleChange = (e) => {
    let { name, value } = e.target;
    if (e.target.type === 'number') {
      value = parseFloat(value);
    }
    setUpdateStats((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const onSubmit = (data) => {
    // const assignName = Object.assign(sideIngredientName, data);
    // mutate({ _id, sideIngredientId, updateStats })
    const updatedData = {
      ...data,
      guestAmount: parseFloat(data.guestAmount),
      purchasedMainIngredient: parseFloat(data.purchasedMainIngredient),
      usedMainIngredient: parseFloat(data.usedMainIngredient),
      remainInStockMain: parseFloat(data.remainInStockMain)
    };

    // Log the converted data for debugging
    const UpdateStats = Object.assign({}, updateStats || {}, updatedData);

    // Submit the data to the mutate function
    mutate({ _id, sideIngredientId, updateStats: UpdateStats });
  }
  //render update button
  const renderLunchStatButton = () => {
    if (isProducer) {
      return <>
        <Button
          className="mainButton mb-4 p-1"

          onClick={() => navigate("/subKitchen")}
        >
          LunchStatisk
        </Button>
      </>
    }
    else {
      return <>
        <Button
          className="mainButton mb-4 p-1"

          onClick={() => navigate("/statsRecordReceiver")}
        >
          LunchStatisk
        </Button>
      </>
    }
  }
  if (isLoading) {
    return <div>{<Spinner />}</div>;
  }
  return (
    <>
      <form
        className="row align-items-center  mt-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className=" mx-auto item">
          <label
            className="visually-hidden"
            htmlFor="autoSizingInput"
          ></label>
          <input
            type="text"
            className="form-control"
            name="dishName"
            defaultValue={data?.data[0]?.dishName}
            disabled
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
              ><span className="text-dark font-size-s">Antal ätande t.ex. 500</span></label>
            </Col>
            <Col sm={12}>
              <input
                type="number"
                min={0}
                className="form-control"
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
              ><span className="text-dark font-size-s">Mottagen mängd t.ex. 70</span></label>
            </Col>
            <Col sm={12}>
              <input
                type="number"
                min={0}
                step=".01"
                className="form-control"
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
              ><span className="text-dark font-size-s">Uppäten t.ex. 60</span></label>
            </Col>
            <Col sm={12}>
              <input
                type="number"
                min={0}
                step=".01"
                className="form-control"
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
        <div className="mx-auto item">
          <label
            className="visually-hidden"
            htmlFor="autoSizingInput"
          ></label>
          <select
            className="form-control"
            name="sideIngredient"
            onChange={(e) => setSideIngredientName({ sideIngredient: e.target.value })}
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
        {renderSideData()}
        <div className=" text-center mt-2 mb-2 text-light">Smakar bra?</div>
        <div className=" ms-1  mt-2 mb-2">
          <div className="star-rating">
            <Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <Rating
                name="starRating"
                defaultValue={data?.data[0]?.starRating}
                onChange={handleChange}
              />
            </Box>
          </div>
        </div>
        <button
          type="submit"
          className="mainButton mb-4 p-1"
        >
          <span>Uppdatera</span>
        </button>
      </form>
      {renderLunchStatButton()}
    </>
  );
}

export default UpdateStats;
