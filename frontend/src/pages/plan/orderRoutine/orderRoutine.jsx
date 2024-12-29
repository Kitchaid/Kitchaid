import React, { CreateOrderRoutine } from "../../../hooks/plan/orderRoutineHooks";
import "bootstrap/dist/css/bootstrap.css";
import OrderRoutineRecord from "./orderRoutineRecord";
import { useForm } from "react-hook-form";
function OrderRoutine() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { mutate } = CreateOrderRoutine();
  const onSubmit = (data) => {
    mutate(data);
    reset();
  };



  return (
    <>
      <form
        className="row align-items-center formFrame m-auto d-flex justify-content-center w-50"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h6 className="ms-3 weekday">Leverans dag:</h6>
        {errors.weekday?.type === "required" && (
          <p className="m-auto ms-3 p-2 error" role="alert">
            Välj leverans dag
          </p>
        )}
        <div className="ms-5 mt-2">
          <input className="radio" type="radio" {...register("weekday", { required: true })} value="Måndag" aria-checked={errors.weekday ? "true" : "false"} />
          <span className="weekday"> Måndag &nbsp;&nbsp;</span>
          <input className="radio" type="radio" {...register("weekday", { required: true })} value="Tisdag" aria-checked={errors.weekday ? "true" : "false"} />
          <span className="weekday"> Tisdag &nbsp;&nbsp;</span>
          <input className="radio" type="radio" {...register("weekday", { required: true })} value="Onsdag" aria-checked={errors.weekday ? "true" : "false"} />
          <span className="weekday"> Onsdag &nbsp;&nbsp;</span>
          <input className="radio" type="radio" {...register("weekday", { required: true })} value="Torsdag" aria-checked={errors.weekday ? "true" : "false"} />
          <span className="weekday"> Torsdag &nbsp;&nbsp;</span>
          <input className="radio" type="radio" {...register("weekday", { required: true })} value="Fredag" aria-checked={errors.weekday ? "true" : "false"} />
          <span className="weekday"> Fredag &nbsp;&nbsp;</span>
        </div>
        <input
          className="form-control m-auto mt-4 mb-4"
          placeholder="Varor att beställa"
          {...register("OrderRoutine", { required: true, maxLength: 50 })}
          aria-invalid={errors.OrderRoutine ? "true" : "false"}
        />
        {errors.OrderRoutine?.type === "required" && (
          <p className="m-auto ms-4 p-1 error" role="alert">
            Vad ska vi beställa?
          </p>
        )}
        <div className="input-group mb-4">
          <textarea
            className="form-control mb-1 comments"
            aria-label="With textarea"
            placeholder="Kommentar"
            {...register("comment")}
          ></textarea>
        </div>
        <button className="mainButton p-1 w-50" type="submit">
          <span>Lägg till</span>
        </button>
      </form>
      <OrderRoutineRecord />
    </>
  );
}

export default OrderRoutine;
