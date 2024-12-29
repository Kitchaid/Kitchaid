import React, { useEffect, useState } from "react";
import { CreatePlan } from "../../../hooks/plan/workPlanHooks";
import ToDoListRecord from "./ToDoListRecord";
import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import weekNumberData from '../../../Partials/week'

function WorkPlan() {
  const [weekNumber, setWeekNumber] = useState(1)
  const [weekday, setWeekday] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    control,
    reset,
  } = useForm({ defaultValues: { task: "", comment: "", priorityRating: 1 } });
  const { mutate } = CreatePlan();
  const onSubmit = (data) => {
    mutate(data);
    reset({ task: "", comment: "", priorityRating: 1 })
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ task: "", comment: "", priorityRating: 1 });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      <form
        className="row align-items-center formFrame m-auto d-flex justify-content-center w-50"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="">
          {errors.weekday?.type === "required" && (
            <p className="m-auto ms-3 p-2 error" role="alert">
              Välj vardag
            </p>
          )}
          {errors.week && (
            <p className="ms-1 p-1 error fs-6" role="alert">
              Välj vecka
            </p>
          )}
          <div className="p-4">
            <select
              name="week"
              {...register("week", {
                required: true,
              })}
              className="form-select"
              onChange={(e) => setWeekNumber(e.target.value)}
            >
              <option value={""}>Välj vecka</option>
              {weekNumberData.map((week, index) => {
                return (<>
                  <option key={index} value={week}>
                    {week}
                  </option></>
                );
              })}
            </select>
          </div>
        </div>
        <div className="mt-3" style={{ marginLeft: "10px" }}>
          <input
            className="radio"
            type="radio"
            {...register("weekday", { required: true })}
            value={1}
            onClick={(e) => setWeekday(e.target.value)}
            aria-checked={errors.weekday ? "true" : "false"}
          />
          <span className="weekday"> Måndag &nbsp;&nbsp;</span>
          <input
            className="radio"
            type="radio"
            {...register("weekday", { required: true })}
            value={2}
            onClick={(e) => setWeekday(e.target.value)}
            aria-checked={errors.weekday ? "true" : "false"}
          />
          <span className="weekday"> Tisdag &nbsp;&nbsp;</span>
          <input
            className="radio"
            type="radio"
            {...register("weekday", { required: true })}
            value={3}
            onClick={(e) => setWeekday(e.target.value)}
            aria-checked={errors.weekday ? "true" : "false"}
          />
          <span className="weekday"> Onsdag &nbsp;&nbsp;</span>
          <input
            className="radio"
            type="radio"
            {...register("weekday", { required: true })}
            value={4}
            onClick={(e) => setWeekday(e.target.value)}
            aria-checked={errors.weekday ? "true" : "false"}
          />
          <span className="weekday"> Torsdag &nbsp;&nbsp;</span>
          <input
            className="radio"
            type="radio"
            {...register("weekday", { required: true })}
            value={5}
            onClick={(e) => setWeekday(e.target.value)}
            aria-checked={errors.weekday ? "true" : "false"}
          />
          <span className="weekday"> Fredag &nbsp;&nbsp;</span>
        </div>
        <input
          className="form-control m-4"
          placeholder="Att göra"
          {...register("task", { required: true, maxLength: 50 })}
          aria-invalid={errors.task ? "true" : "false"}
        />
        <div className="d-flex mb-2">
          <div className=" text-center m-3 weekday">Prioritet:1-5</div>
          <div className=" ms-1  mt-3 mb-2">
            <div className="star-rating ms-5">
              <Controller
                control={control}
                name="priorityRating"
                render={({ field: { onChange, value } }) => (
                  <Box
                    sx={{
                      "& > legend": { mt: 2 },
                    }}
                  >
                    <Rating
                      onChange={onChange}
                      value={value}
                      defaultValue={1}
                      size="small" />
                  </Box>
                )}
              />
            </div>
          </div>
        </div>
        {errors.task?.type === "required" && (
          <p className="m-auto ms-4 p-1 error" role="alert">
            Vad ska vi göra?
          </p>
        )}
        <div className="input-group m-2">
          <textarea
            className="form-control mb-3 comments"
            aria-label="With textarea"
            placeholder="Kommentar"
            {...register("comment")}
          ></textarea>
        </div>
        <button className="mainButton p-1 w-50" type="submit">
          <span>Lägg till</span>
        </button>
      </form>
      <ToDoListRecord weekNumber={weekNumber} weekday={weekday} />
    </>
  );
}

export default WorkPlan;
