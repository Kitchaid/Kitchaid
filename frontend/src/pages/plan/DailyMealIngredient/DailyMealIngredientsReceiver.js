import React, { useState } from "react";
import { getMealIngredientsByDateReceiver } from '../../../hooks/plan/dailyMealIngredients'
import DatePicker from "react-multi-date-picker";
import { Modal, Container, Row, Col } from "react-bootstrap";
import { useQuery } from "react-query";
import DishImage from "./dishImage";

function DailyMealIngredientsReceiver() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [date, setDate] = useState(Date)
    const { data: ingredients } = useQuery(['getMealIngredientsByDateReceiver', date],
        () => getMealIngredientsByDateReceiver(date))
    // Create a new DOMParser
    const parser = new DOMParser();
    return (
        <>
            <div>
                <div className="datePicker mt-5 mb-5">
                    <h6>Välj datum</h6>
                    <DatePicker
                        onChange={
                            (date) => {
                                const d = new Date(date).toISOString().slice(0, 10);
                                setDate(d)
                            }
                        } />
                </div>
                <button
                    type="button"
                    className="mainButton p-1"
                    onClick={handleShow}
                >
                    <span>Lunch innehåll</span>
                </button>
                <Modal show={show} onHide={handleClose} fullscreen='xxl-down'>
                    <Modal.Header closeButton>
                        <Modal.Title>Lunch innehåll</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {ingredients?.data?.kost.map((alt) => {
                            // Parse the HTML content
                            const parsedHtmlMainIngredients = parser.parseFromString(alt.mainIngredient, 'text/html').body.textContent;
                            const parsedHtmlSideIngredients = parser.parseFromString(alt.sideIngredient, 'text/html').body.textContent;
                            return <>
                                <Container>
                                    <Row className="mt-5" key={alt.dishName}>
                                        <Col xs={12} sm={12} md={8} lg={8}>
                                            <Row>
                                                <h5>Alternative {alt.alt}:</h5>
                                            </Row>
                                            <Row className="mt-2">
                                                <h5 className="ingredient-title text-light p-1 ps-3">{alt.dishName}</h5>
                                            </Row>
                                            <Row xs={12} sm={12} md={8} lg={8} className="mt-3">
                                                <span>Huvudkomponent</span>
                                                <p className="font-size-md ingredient-body">{parsedHtmlMainIngredients}</p>
                                                <span>Tillbehör</span>
                                                <p className="font-size-md ingredient-body">{parsedHtmlSideIngredients}</p>
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
            </div>
        </>
    );
}

export default DailyMealIngredientsReceiver;
