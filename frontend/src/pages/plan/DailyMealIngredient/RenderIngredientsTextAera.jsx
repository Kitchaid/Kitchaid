/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {
    getDishById,
} from '../../../hooks/plan/dailyMealIngredients'
import { Row, Col } from "react-bootstrap";
import { useQuery } from "react-query";

const RenderTextArea = (props) => {
    const _id = props.props
    const { data: get_dish } = useQuery(["getDish", _id], () => getDishById(_id));
    let [mainIngredientText, setMainIngredientText] = useState(get_dish?.data[0]?.menu?.mainIngredient);
    let [sideIngredientText, setSideIngredientText] = useState(get_dish?.data[0]?.menu?.sideIngredient);

    const [data, setData] = useState({
        mainIngredient: get_dish?.data[0]?.menu?.mainIngredient,
        sideIngredient: get_dish?.data[0]?.menu?.sideIngredient
    });

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    }
    useEffect(() => {
        setMainIngredientText(get_dish?.data[0]?.menu?.mainIngredient)
        setSideIngredientText(get_dish?.data[0]?.menu?.sideIngredient)
        let submitData = Object.assign(data, { dishName: get_dish?.data[0]?.menu?.dishName })
        props.dataFromChild(submitData);
    }, [props])

    return <>
        <Row>
            <Col className="mb-3 ms-3">
                <span className="small mb-2 d-block">Rättens innehåll</span>
                <p className="font-size-md text-light font-size-xs">Till exempel:</p>
                <p className="font-size-md text-light">{mainIngredientText}</p>
                <p className="font-size-md text-light">{sideIngredientText}</p>
                <h6 className="mt-2 mb-2 text-light font-size-xs">Huvudkomponent</h6>
                <textarea
                    className="form-control"
                    aria-label="With textarea"
                    name="mainIngredient"
                    value={data.mainIngredient}
                    onChange={handleUpdateChange}
                />
                <h6 className="mt-2 mb-2 text-light font-size-xs">Tillbehör</h6>
                <textarea
                    className="form-control"
                    aria-label="With textarea"
                    name="sideIngredient"
                    value={data.sideIngredient}
                    onChange={handleUpdateChange}
                />
            </Col>
        </Row>
    </>
}

export default RenderTextArea