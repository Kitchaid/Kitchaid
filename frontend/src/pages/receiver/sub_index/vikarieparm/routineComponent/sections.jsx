import React from "react";
import { useQuery } from "react-query";
import { getSection, CreateSection, DeleteOneSection } from "../../../../../hooks/receiverHooks/receiverHooks";
import { Accordion, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function Sections() {
    //use react query for create new section
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    // get, create and delete section
    const { data: section } = useQuery("getSection", getSection);
    //create
    const { mutate } = CreateSection();
    const onSubmit = (data) => {
        mutate(data);
        reset();
    };

    //Delete one
    const { mutate: deleteOneItem } = DeleteOneSection();
    return <>
        <Accordion.Item eventKey="2">
            <Accordion.Header>Avdelning</Accordion.Header>
            <Accordion.Body>
                <Container>
                    <Row>
                        <table className="table table-striped text-center">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Namnet</th>
                                    <th scope="col">Antal bord</th>
                                </tr>
                            </thead>
                            {section?.data.map((section, index) => {
                                return (
                                    <>
                                        <tbody key={index} className="text-center">
                                            <tr>
                                                <th scope="row"></th>
                                                <td>{section.section_name}</td>
                                                <td>{section.numberOfTable}</td>
                                                <td>
                                                    <span
                                                        type="button"
                                                        onClick={() => { deleteOneItem(section._id) }}
                                                    >
                                                        <i className="fa-solid fa-trash-can glow"></i>
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </>
                                );
                            })}
                        </table>
                    </Row>
                    <Row>
                        <form
                            className="row align-items-center  m-auto mb-3"
                            onSubmit={handleSubmit(onSubmit)}>
                            {errors.section_name?.type === "required" && (
                                <p className="m-auto ms-5 error" role="alert">
                                    Avdelnings namn?
                                </p>
                            )}
                            <label className="text-start text-light">Namnet</label>
                            <input
                                type="text"
                                className="form-control text-center m-2"
                                name="section_name"
                                {...register("section_name", {
                                    required: true,
                                    maxLength: 30,
                                    type: String
                                })}
                                aria-invalid={errors.section_name ? "true" : "false"}
                            />
                            {errors.numberOfTable?.type === "required" && (
                                <p className="m-auto ms-5 error" role="alert">
                                    Hur många bord? nummer
                                </p>
                            )}
                            <label className="text-start text-light">Antal bord</label>
                            <input
                                type="number"
                                min={0}
                                className="form-control text-center m-2"
                                name="numberOfTable"
                                {...register("numberOfTable", {
                                    required: true,
                                    maxLength: 10,
                                    type: Number,
                                    min: 0,
                                })}
                                aria-invalid={errors.numberOfTable ? "true" : "false"}
                            />

                            <h6 className="font-size-s mt-3 text-light">Avdelningar behöver</h6>
                            <hr className="text-light"></hr>
                            <Row className="mb-3 text-light">
                                <Col xs={10}>Frukost</Col>
                                <Col xs={2}>
                                    <input
                                        type="checkbox"
                                        name='breakfast'
                                        {...register("breakfast", {
                                            type: Boolean,
                                        })}
                                    />
                                </Col>
                            </Row>
                            <hr className="text-light"></hr>
                            <Row className="mb-3 text-light">
                                <Col xs={10}>Lunch</Col>
                                <Col xs={2}>
                                    <input
                                        type="checkbox"
                                        name='lunch'
                                        {...register("lunch", {
                                            type: Boolean,
                                        })}
                                    />
                                </Col>
                            </Row>
                            <hr className="text-light"></hr>
                            <Row className="mb-3 text-light">
                                <Col xs={10}>Mellanmål</Col>
                                <Col xs={2}>
                                    <input
                                        type="checkbox"
                                        name='snack'
                                        {...register("snack", {
                                            type: Boolean,
                                        })}
                                    />
                                </Col>
                            </Row>
                            <hr className="text-light"></hr>
                            <button
                                className=" mb-0 stats_card"
                                type="submit"
                            >
                                <span className="d-block m-auto">Bekräfta</span>
                            </button>
                        </form>
                    </Row>
                </Container>
            </Accordion.Body>
        </Accordion.Item>
    </>
}