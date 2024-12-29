import React from "react";
import { CreateWorkRoutine } from "../../../../hooks/plan/workRoutineHooks";
import WorkRoutineRecord from "./workRoutineRecord";
import { useForm } from "react-hook-form";
function WorkRoutine() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { mutate } = CreateWorkRoutine();
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
        {errors.weekday?.type === "required" && (
          <p className="m-auto ms-3 p-2 error" role="alert">
            Välj dag
          </p>
        )}
        <div className="ms-5">
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
          className="form-control m-auto mt-4 mb-4 w-75"
          placeholder="Att göra"
          {...register("WorkRoutine", { required: true, maxLength: 150 })}
          aria-invalid={errors.WorkRoutine ? "true" : "false"}
        />
        {errors.OrderRoutine?.type === "required" && (
          <p className="m-auto ms-4 p-1 error" role="alert">
            Vad ska vi göra?
          </p>
        )}
        <div className="input-group">
          <textarea
            className="form-control mb-1 comments mb-5 comments"
            aria-label="With textarea"
            placeholder="Kommentar"
            {...register("comment")}
          ></textarea>
        </div>
        <button className="mainButton p-1 w-25" type="submit">
          <span>Lägg till</span>
        </button>
      </form>
      <WorkRoutineRecord />
    </>
  );
}

export default WorkRoutine;
