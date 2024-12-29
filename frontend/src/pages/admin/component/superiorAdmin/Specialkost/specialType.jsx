import React, { useState } from "react";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { Modal, Row, Col, Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { getSpecialType, CreateType, UpdateType, UpdateTypeColor, DeleteType } from '../../../../../hooks/admin/superiorAdmin';
const SpecialkostType = () => {
    //specialkost types delete modal
    const [showTypeDelete, setShowTypeDelete] = useState(false);
    const handleCloseTypeDelete = () => setShowTypeDelete(false);
    const handleShowTypeDelete = () => setShowTypeDelete(true);
    const [showTypeColor, setShowTypeColor] = useState(false);
    const handleCloseTypeColor = () => setShowTypeColor(false);
    const handleShowTypeColor = () => setShowTypeColor(true);
    const [typeId, setTypeId] = useState('');
    const [color_type, setColor] = useState('#fff');
    const [prevColor, setPrevColor] = useState('#fff');
    //get special
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const { data: type } = useQuery("getSpecialtype", getSpecialType);
    const { mutate: createType } = CreateType();
    const { mutate: updateType } = UpdateType();
    const { mutate: updateTypeColor } = UpdateTypeColor();
    const { mutate: deleteType } = DeleteType();
    const onSubmit = (data) => {
        let typeListId = type?.data?.Special_type[0]._id
        const color = { color: color_type }
        const submitData = Object.assign(color, data)
        if (!typeListId) { createType(submitData) }
        else {
            updateType({
                typeListId, submitData
            })
        }
        reset();
    };
    const handleColorUpdate = () => {
        const data = { color: color_type }
        let typeListId = type?.data?.Special_type[0]._id
        updateTypeColor({
            typeId, typeListId, data
        })
    }
    //Delete one
    const handleDelete = () => {
        let typeListId = type?.data?.Special_type[0]._id
        deleteType({
            typeListId, typeId
        })

    }
    // tooltip
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            <div>
                Klicka för att byta färg
            </div>
        </Tooltip>
    );

    return (
        <React.Fragment>
            <form
                className="row align-items-center  m-auto mt-5 w-75"
                onSubmit={handleSubmit(onSubmit)}>
                {errors.specialType?.type === "required" && (
                    <p className="m-auto ms-5 error" role="alert">
                        Måste fyll i
                    </p>
                )}
                <Row className='m-auto mb-3'>
                    <Col sm={10} className='m-auto'>
                        <input
                            type="text"
                            placeholder="Allergi typ, Val en färg -->"
                            className="form-control text-center"
                            {...register("specialType", {
                                required: true,
                                maxLength: 30,
                                type: String
                            })}
                            aria-invalid={errors.specialType ? "true" : "false"}
                        />
                    </Col>
                    <Col sm={2} className='m-auto mb-4'>
                        <Form.Label htmlFor="colorInput"></Form.Label>
                        <Form.Control
                            className="w-100"
                            type="color"
                            id="exampleColorInput"
                            defaultValue="#fff"
                            title="Choose your color"
                            onChange={(e) => { setColor(e.target.value) }}
                        />
                    </Col>
                </Row>
                <button
                    className=" m-0 stats_card"
                    type="submit"
                >
                    <span className="d-block m-auto">Bekräfta</span>
                </button>
            </form>
            <div className="w-75 m-auto overflow mt-5">
                <div className="d-block w-100 font-size-lg">
                    {type?.data?.Special_type[0]?.special_type?.sort().map((type, index) => {
                        return <>
                            <Row className='m-auto'>
                                <Col xs={11} sm={11} md={11} lg={11} xl={11}>
                                    <OverlayTrigger
                                        placement="left"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltip}
                                    >
                                        <p
                                            className="stats_card text-center cursor"
                                            style={{ backgroundColor: type.color }}
                                            key={index}
                                            onClick={() => {
                                                handleShowTypeColor();
                                                setTypeId(type?._id);
                                                setPrevColor(type.color)
                                            }}
                                        >{type.s_type}</p>
                                    </OverlayTrigger>
                                </Col>
                                <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                                    <span
                                        type="button"
                                        onClick={() => {
                                            setTypeId(type?._id);
                                            handleShowTypeDelete();
                                        }}
                                    >
                                        <i className="fa-solid fa-circle-xmark glow_red"></i>
                                    </span>
                                </Col>
                            </Row>
                        </>
                    })}
                </div>
            </div>
            <Modal show={showTypeDelete} onHide={handleCloseTypeDelete}>
                <Modal.Header>
                    Radera den typ?
                </Modal.Header>
                <Modal.Body>
                    <Button
                        className="w-100 mb-2"
                        variant="danger"
                        onClick={() => { handleDelete(); handleCloseTypeDelete() }}
                    >Ja</Button>
                    <Button
                        className="w-100"
                        variant="secondary"
                        onClick={handleCloseTypeDelete}
                    >Nej</Button>
                </Modal.Body>
            </Modal>
            <Modal show={showTypeColor} onHide={handleCloseTypeColor} size="sm">
                <Modal.Header>
                    Val av färg för den angivna typen.
                </Modal.Header>
                <Modal.Body>
                    <Form.Label htmlFor="colorInput"></Form.Label>
                    <Form.Control
                        className="w-50 mb-4 m-auto"
                        type="color"
                        id="exampleColorInput"
                        defaultValue={prevColor}
                        title="Choose your color"
                        onChange={(e) => { setColor(e.target.value) }}
                    />
                    <Button
                        className="w-100 mb-2"
                        variant="danger"
                        onClick={() => { handleColorUpdate() }}
                    >Bekräfta</Button>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
};

export default SpecialkostType;
