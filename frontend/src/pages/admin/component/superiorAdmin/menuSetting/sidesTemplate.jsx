import React, { useEffect, useState } from "react";
import { CreateSideTemplate, UpdateSideTemplate, getSideTemplate, DeleteOneSide } from "../../../../../hooks/admin/superiorAdmin";
// import { getMenuForAdmin, getMenuById } from '../../../../../hooks/menu/menu'
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
// import MenuUpdate from './menuUpdate';
import { Modal, Row, Col, Button } from "react-bootstrap";
import Spinner from "../../../../../Partials/Spinner";

const SidesTemplate = () => {
    const [showSideDelete, setShowSideDelete] = useState(false);
    const handleCloseSideDelete = () => setShowSideDelete(false);
    const handleShowSideDelete = () => setShowSideDelete(true);
    //get sides
    const [group, setGroup] = useState('');
    const { data: getSides, isLoading, error } = useQuery(
        ['getSideTemplate', group], () => getSideTemplate(group)
    );
    const [id, setId] = useState('63793934371bc9e6500f982d');
    const [sideId, setSideId] = useState('63793934371bc9e6500f982d');

    const { mutate: createSides } = CreateSideTemplate();
    const { mutate: updateSides } = UpdateSideTemplate();
    const { mutate: deleteSides } = DeleteOneSide();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const groupValue = watch('group')
    useEffect(() => {
        setId(getSides?.data[0]?._id)
        setGroup(groupValue)
    }, [getSides, groupValue])

    const onSubmit = (data) => {
        if (getSides?.data?.length === 0) { createSides(data); return }
        else if (getSides?.data?.length !== 0 && getSides?.data[0]?.group !== data.group) {
            createSides(data)
        }
        else if (getSides?.data?.length !== 0) {
            setId(getSides?.data[0]._id);
            updateSides({ id, data })
        }
    };
    const [isDeleted, setIsDeleted] = useState(false)
    const handleSideDelete = () => {
        deleteSides({ id, sideId, isDeleted })
    }
    if (error) return <div>Nånting gick fel</div>;
    if (isLoading)
        return (
            <div style={{ height: '100vh' }}>
                <Spinner />
            </div>
        );
    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
                className="overflow"
            >
                <div className="mt-5 mb-5 w-75 m-auto">
                    {errors.sideIngredient && (
                        <p className="ms-1 p-1 error fs-6" role="alert">
                            Fyll i tillbehörs namnet
                        </p>
                    )}
                    <div className="">
                        <input
                            className="form-control"
                            type="text"
                            name="sideIngredient"
                            placeholder="Fyll i tillbehörs namnet"
                            {...register("sideIngredient", {
                                required: true,
                            })}
                        />
                        <div>
                            <select
                                {...register("group", {
                                    required: true,
                                })}
                                name="group"
                                className="form-select mt-4 mb-4"
                            >
                                <option value={" "}>Välj grupp</option>
                                <option value={"junior"}>Skolan,Förskolan</option>
                                <option value={"senior"}>Äldreomsorg/Matlåda</option>
                            </select>
                        </div>
                    </div>
                    {errors.sideIngredient && (
                        <p className="ms-1 p-1 error fs-6" role="alert">
                            Fyll i tillbehörs namnet
                        </p>
                    )}
                    <div className="">
                        <input
                            className="form-control"
                            type="number"
                            step={0.01}
                            placeholder="Standard  mängd per gäst"
                            {...register("defaultPerGuest", {
                                required: true,
                            })}
                        />
                        <div>
                            <select
                                {...register("unit", {
                                    required: true,
                                })}
                                className="form-select mt-4 mb-4"
                            >
                                <option value={" "}>Välj enhet</option>
                                <option value={"Kilo"}>Kilo</option>
                                <option value={"Liter"}>Liter</option>
                            </select>
                        </div>
                    </div>
                    <button className="stats_card w-50 m-auto" type="submit">
                        <span>Bekräfta</span>
                    </button>
                </div>
            </form>
            <hr></hr>
            <div className="overflow">
                {getSides?.data[0]?.side?.map((item, index) => {
                    return <>
                        <Row className="m-auto">
                            <Col xs={7}>
                                <button className="stats_card w-100 mb-3" key={index}>
                                    {item.sideIngredient}
                                </button>
                            </Col>
                            <Col xs={4}>
                                <button className="stats_card w-100 mb-3" key={index}>
                                    {item.defaultPerGuest}({item.unit})/pers
                                </button>
                            </Col>
                            <Col xs={1}>
                                <span
                                    type="button"
                                    onClick={() => {
                                        setSideId(item?._id);
                                        handleShowSideDelete();
                                    }}
                                >
                                    <i className="fa-solid fa-circle-xmark glow_red"></i>
                                </span>
                            </Col>
                        </Row>
                    </>
                })}
            </div>
            <Modal show={showSideDelete} onHide={handleCloseSideDelete}>
                <Modal.Header>
                    Radera den typ?
                </Modal.Header>
                <Modal.Body>
                    <Button
                        className="w-100 mb-2"
                        variant="danger"
                        onClick={() => {
                            setIsDeleted(true);
                            handleSideDelete();
                            handleCloseSideDelete()
                        }}
                    >Ja</Button>
                    <Button
                        className="w-100"
                        variant="secondary"
                        onClick={handleCloseSideDelete}
                    >Nej</Button>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default SidesTemplate;
