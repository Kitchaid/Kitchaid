import React, { useState, useEffect, Fragment } from "react";
import {
    getMealIngredientsByDateProducer,
    CreateMealIngredients,
    UpdateMealIngredient,
    DeleteOneMealIngredients
} from '../../../hooks/plan/dailyMealIngredients'
import DatePicker from "react-multi-date-picker";
import { Modal, Container, Row, Col, InputGroup, Form } from "react-bootstrap";
import { useQuery } from "react-query";
import { useForm, Controller } from "react-hook-form";
import { getMenu } from '../../../hooks/menu/menu'
import RenderTextArea from "./RenderIngredientsTextAera";
import DishImage from "./dishImage";
import Spinner from '../../../Partials/Spinner'

function DailyMealIngredientsProducer() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [date, setDate] = useState(Date);
    const [dishId, setDishId] = useState('6511ccb4455a013fce91c407');
    //fetch data from child component
    const [mainAndSide, setMainAndSide] = useState({});
    const dataFromChild = (mainAndSide) => {
        setMainAndSide(mainAndSide)
    }

    // get menu
    const { data: get_menu, isLoading: menu } = useQuery("getMenu", getMenu);
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
        watch,
    } = useForm();
    const { mutate: CreateMeal } = CreateMealIngredients();
    const { mutate: updateMeal } = UpdateMealIngredient();
    const { mutate: deleteMeal } = DeleteOneMealIngredients();

    //get dish id after select
    const dish_Id = watch("dish")
    useEffect(() => {
        const getDishId = () => {
            if (dish_Id === undefined) {
                setDishId('6511ccb4455a013fce91c407');
            } else {
                setDishId(dish_Id);
            }
        }
        getDishId()
    }, [dish_Id]);
    //get sample dish ingredients
    const { data: ingredients } = useQuery(['getMealIngredientsByDateProducer', date],
        () => getMealIngredientsByDateProducer(date))
    const onSubmit = (data) => {
        let _id = { _id: ingredients?.data?._id }
        const date = data.dateUnFormat.format('YYYY-MM-DD')
        setDate(date)
        if (ingredients?.data?._id === undefined) {
            let submitData = Object.assign(data, { dish_id: data.dish, date: date }, mainAndSide);

            CreateMeal(submitData);
            reset()
        } else {
            let submitData = Object.assign(data, _id, { dish_id: data.dish }, mainAndSide);

            updateMeal(submitData);
            reset()
        }
    };

    if (menu) {
        return <div>{<Spinner />}</div>;
    }
    //Delete one dish ingredients
    const handleDelete = (_id) => {
        let id = { _id: ingredients?.data?._id }
        deleteMeal({ _id, id })
    }
    return (
        <>
            <Container>
                <form onSubmit={handleSubmit(onSubmit)} className='formFrame'>
                    {errors.date && (
                        <p className="error">Välj datum!</p>
                    )}
                    <Controller
                        control={control}
                        name='dateUnFormat'
                        rules={{ required: true }}
                        render={({
                            field: { onChange, name, value },
                            formState: { errors },
                        }) => (
                            <div className="datePicker">
                                <h6>Välj datum</h6>
                                <DatePicker
                                    value={value || ""}
                                    onChange={(date) => {
                                        onChange(date?.isValid ? date : "");
                                        setDate(date.format('YYYY-MM-DD'))
                                    }}

                                />
                                {errors && errors[name] && errors[name].type === "required" && (
                                    <p className="error">Välj datum!</p>
                                )}
                            </div>
                        )}
                    />
                    <Container>
                        <Row className="mt-4 mb-4 m-auto">
                            <Col>
                                {errors.dishName && (
                                    <p className="error">Rättens namn!</p>
                                )}
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="inputGroup-sizing-default">
                                        <span className="font-size-xs">Alternative</span>
                                    </InputGroup.Text>
                                    <Form.Control
                                        aria-label="Default"
                                        aria-describedby="inputGroup-sizing-default"
                                        placeholder="1,2,3 eller Vegitarisk"
                                        {...register('alt', {
                                            required: true
                                        })}
                                    />
                                </InputGroup>
                                <div className="mx-auto">
                                    <select
                                        name="dish"
                                        className="form-select"
                                        {...register('dish', {
                                            required: true
                                        })}

                                    >
                                        <option value={"6511ccb4455a013fce91c407"} disabled selected>Välja maträtten</option>
                                        {get_menu?.data[0]?.menu?.map((menu, index) => {
                                            return (
                                                <option key={index} value={menu._id}>
                                                    {menu.dishName}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </Col>
                        </Row>
                        <RenderTextArea props={dishId} dataFromChild={dataFromChild} />
                    </Container>
                    <button
                        type="submit"
                        className="mainButton  p-1"
                    // onClick={handleUpdateSubmit}
                    ><span>Bekräfta</span></button>
                </form>
                <button
                    type="button"
                    className="mainButton p-1 mt-5"
                    onClick={handleShow}
                >
                    <span>Lunch innehåll</span>
                </button>
                <Modal show={show} onHide={handleClose} fullscreen='xxl-down'>
                    <Modal.Header closeButton>
                        <Modal.Title>Lunch innehåll</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {ingredients?.data?.kost.map((alt, index) => {
                            return <>
                                <Container>
                                    <Row className="mt-5" key={index}>
                                        <Col xs={12} sm={12} md={8} lg={8}>
                                            <Row>
                                                <Col lg={11} md={10} xs={10}>
                                                    <h5>Alternative {alt.alt}:</h5>
                                                </Col>
                                                <Col lg={1} md={2} xs={2}>
                                                    <i className="fa-solid fa-trash-can fa-fade glow" onClick={() => handleDelete(alt._id)}></i>
                                                </Col>

                                            </Row>
                                            <Row className="mt-2">
                                                <h5 className="ingredient-title text-light p-1 ps-3">{alt.dishName}</h5>
                                            </Row>
                                            <Row xs={12} sm={12} md={8} lg={8} className="mt-3">
                                                <span>Huvudkomponent</span>
                                                <p className="font-size-md ingredient-body">{alt.mainIngredient}</p>
                                                <span>Tillbehör</span>
                                                <p className="font-size-md ingredient-body">{alt.sideIngredient}</p>
                                            </Row>
                                        </Col>
                                        <Col xs={12} sm={12} md={4} lg={4}>
                                            <DishImage props={alt} />
                                        </Col>
                                    </Row>
                                </Container>
                            </>
                        })}
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
}

export default DailyMealIngredientsProducer;
