import React, { useState } from "react";
import { CreateFoodWasteRecord } from "../../../hooks/foodWaste/foodWaste";
import DatePicker from "react-multi-date-picker";
import { useForm, Controller } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import { BarChartsSvinn } from "../../../Partials/BarCharts";

function FoodWaste() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control
    } = useForm();
    const { mutate } = CreateFoodWasteRecord();
    const onSubmit = (data) => {
        mutate(data);
        reset();
    };
    const value_name = [
        { index: '2', value: 'guestAmount', placeholder: 'Antal ätande i matsal t.ex. 500' },
        { index: '3', value: 'kitchenWaste', placeholder: 'Kökssvinn' },
        { index: '4', value: 'serviceWaste', placeholder: 'Serveringssvinn' },
        { index: '5', value: 'dishWaste', placeholder: 'Tallrikssvinn' },
        { index: '6', value: 'specialWaste', placeholder: 'Specialkostssvinn' },
    ]

    return (
        <>
            <>
                <form
                    className="row align-items-center w-75 m-auto"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Controller
                        control={control}
                        name="date"
                        rules={{ required: true }} //optional
                        render={({
                            field: { onChange, name, },
                            formState: { errors }, //optional, but necessary if you want to show an error message
                        }) => (
                            <>
                                {errors && errors[name] && errors[name].type === "required" && (
                                    //if you want to show an error message
                                    <p className="error">Välj datum !</p>
                                )}
                                <div className="datePicker">
                                    <h6>Välj datum</h6>
                                    <DatePicker
                                        value={new Date()}
                                        onChange={(date) => {
                                            onChange(date?.isValid ? date : "");
                                        }}
                                    />
                                </div>
                            </>
                        )}
                    />
                    <div className=" mx-auto item" >
                        <input
                            key={1}
                            type="text"
                            className="form-control mb-3 mt-3"
                            placeholder='Rättens namn t.ex Köttbullar med pasta'
                            {...register('dishName', {
                                required: true,
                                maxLength: 50,
                                type: String,
                            })}
                        />
                        {value_name.map((value, index) => {
                            return <>
                                <div className="input-group">
                                    <input
                                        key={index}
                                        type="number"
                                        step={0.01}
                                        className="form-control mb-3"
                                        placeholder={value.placeholder}
                                        {...register(value.value, {
                                            required: true,
                                            maxLength: 10,
                                            type: Number,
                                        })}
                                    />
                                    <div className="input-group-text">
                                        <input
                                            className="form-check-input d-none"
                                            type="radio"
                                            value="kilo"
                                            readOnly={true}
                                            {...register("unit")}
                                        />
                                        <span className="input-group border-0">Kilo</span>
                                    </div>
                                </div>
                            </>
                        })}
                    </div>
                    <div
                        className="input-group mx-auto"
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
                    <button type="submit" className="mainButton mb-4 mt-5 p-1 w-25">
                        <span>Bekräfta</span>
                    </button>
                </form>
                <button
                    type="button"
                    className="mainButton mb-4 p-1 w-25"
                    onClick={handleShow}
                >
                    <span>Loggböcker</span>
                </button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Loggböcker</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <BarChartsSvinn />
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </>
        </>
    );
}

export default FoodWaste;
