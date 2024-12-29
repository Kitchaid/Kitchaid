import React, { CreateOrder } from "../../../hooks/plan/orderHooks";
import OrderRecord from "./orderRecord";
import { useForm } from "react-hook-form";
function NewOrder() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { mutate } = CreateOrder();
  const onSubmit = (data) => {
    mutate(data);
    reset();
  };


  return (
    <>
        <form
          className="row align-items-center m-auto w-50 formFrame"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            className="form-control m-auto mt-4 mb-4"
            placeholder="Varor att beställa"
            {...register("itemToOrder", { required: true, maxLength: 50 })}
            aria-invalid={errors.itemToOrder ? "true" : "false"}
          />
          {errors.itemToOrder?.type === "required" && (
            <p className="m-auto ms-4 p-1 error" role="alert">
              Vad ska vi beställa?
            </p>
          )}

          <div className="input-group">
            <textarea
              className="mb-4 form-control"
              aria-label="With textarea"
              rows="10" cols="60"
              {...register("comment")}
              placeholder="Kommentar"
            ></textarea>
          </div>
          <button className="mainButton p-1 w-50" type="submit">
            <span>Lägg till</span>
          </button>
        </form>
        <OrderRecord />
    </>
  );
}

export default NewOrder;
