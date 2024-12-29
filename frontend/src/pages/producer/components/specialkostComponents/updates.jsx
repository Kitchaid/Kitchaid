
import { Modal, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import {
    getSpecialkost,
    UpdateSpecial,
} from "../../../../hooks/producerHooks/producerHooks";
import { getSpecialType } from '../../../../hooks/admin/superiorAdmin';

export default function UpdateClient(itemId) {
    const [initChosenType, setInitChosenType] = useState([]);
    const { data: type } = useQuery("getSpecialtype", getSpecialType);
    const [chosenTypesUpdate, setChosenTypesUpdate] = useState(initChosenType);
    const _id = itemId.itemId;
    const { data: oneSpecialkost } = useQuery(["getSpecial", _id], () => getSpecialkost(_id));
    const [userStatus, setUserStatus] = useState(true);
    console.log(oneSpecialkost?.data?.isActived)
    const {
        register,
        handleSubmit,
        reset,
        setValue
    } = useForm({ mode: 'onBlur' });
    useEffect(() => {
        if (oneSpecialkost?.data) {
            setValue('person_name', oneSpecialkost?.data?.person_name);
            setValue('section', oneSpecialkost?.data?.section);
            setValue('portion', oneSpecialkost?.data?.portion);
            setValue('comment', oneSpecialkost?.data?.comment);
        }
        const initChosenTypeFn = () => {
            if (oneSpecialkost?.data?.allergic) {
                setInitChosenType(oneSpecialkost?.data?.allergic)
            } else return [];
        }
        initChosenTypeFn();
    }, [oneSpecialkost?.data]);

    const { mutate: updateOneItem } = UpdateSpecial();
    const concatType = initChosenType?.concat(chosenTypesUpdate)
    const onSubmit = (data) => {
        Object.assign(data, {
            allergic: concatType.sort(),
            isActived: userStatus
        })
        updateOneItem({ _id, data })
        reset();
    };
    //toggle special type
    const toggleSelectionUpdate = (type) => {
        if (chosenTypesUpdate?.includes(type)) {
            const updatedChosenTypes = chosenTypesUpdate.filter(
                chosenTypeUpdate => chosenTypeUpdate !== type
            );
            setChosenTypesUpdate(updatedChosenTypes.sort());
        } else {
            setChosenTypesUpdate([...chosenTypesUpdate, type]);
        }
    };
    //user status
    const handleUserStatus = () => {
        setUserStatus(!userStatus)
    }
    /* ======================= DELETE ==================== */
    //delete special type
    const deleteSelectionUpdate = (type) => {
        if (initChosenType?.includes(type)) {
            const updatedChosenTypes = initChosenType.filter(
                chosenTypeUpdate => chosenTypeUpdate !== type
            );
            setInitChosenType(updatedChosenTypes.sort());
        } else {
            setInitChosenType([...initChosenType, type]);
        }
    };
    return <>
        <Modal.Body>
            <span>Allergi mot:</span>
            <div className="special-type-group font-size-s">
                {type?.data?.Special_type[0]?.special_type?.sort().map((type, index) => {
                    return <>
                        <span
                            className={chosenTypesUpdate?.includes(type.s_type) ?
                                "special_type button_size cursor" :
                                'button_size special_type_light cursor'}
                            key={index}
                            onClick={() => toggleSelectionUpdate(type.s_type)}
                        >{type.s_type}</span>
                    </>
                })}
            </div>
            <hr></hr>
            <form className="row align-items-center mb-3  m-auto mb-3 w-75"
                onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4 mb-2">
                    <p>Gäst allergi mot:</p>
                    {oneSpecialkost?.data?.allergic?.map((item, index) => {
                        return <>
                            <span
                                className={initChosenType?.includes(item) ?
                                    "special_type button_size cursor d-inline-block" :
                                    'button_size special_type_light d-inline-block cursor'}
                                key={index}
                                onClick={() => deleteSelectionUpdate(item)}
                            >{item}</span>
                        </>
                    })}
                    {chosenTypesUpdate?.map((item, index) => {
                        return <>
                            <span
                                className="special_type button_size cursor d-inline-block"
                                key={index}
                            >{item}</span>
                        </>
                    })}
                </div>
                <hr></hr>
                <input
                    type="text"
                    placeholder="Gästsförenamn"
                    className="form-control text-center mb-3"
                    defaultValue={oneSpecialkost?.data?.person_name}
                    {...register("person_name", {
                        maxLength: 30,
                        type: String,
                    })}
                />
                <input
                    type="text"
                    placeholder="Tillhör avdelning"
                    className="form-control text-center mb-3"
                    defaultValue={oneSpecialkost?.data?.section}
                    {...register("section", {
                        maxLength: 30,
                        type: String,
                    })}
                />
                <div className="input-group">
                    <input
                        type="number"
                        min={0}
                        className="form-control mb-3"
                        placeholder="Gästantal t.ex 3"
                        {...register("portion", {
                            type: Number,
                            required: true
                        })}
                    />
                    <div className="input-group-text">
                        <input
                            className="form-check-input d-none"
                            type="radio"
                            value="Liter"
                            readOnly={true}
                        />
                        <span className="input-group border-0">Portion</span>
                    </div>
                </div>
                <input
                    type="text"
                    placeholder="Kommentar"
                    defaultValue={oneSpecialkost?.data?.comment}
                    className="form-control text-center mb-3"
                    {...register("comment", {
                        maxLength: 70,
                        type: String
                    })}
                />
                <Row className="mb-3">
                    <Col xs={10}><span>Aktiverad</span></Col>
                    <Col xs={2}>
                        <input
                            type="checkbox"
                            checked={userStatus}
                            onChange={handleUserStatus}
                        />
                    </Col>
                </Row>
                <button className="cursor stats_card" type="submit">
                    <span>Uppdatera</span>
                </button>
            </form>
        </Modal.Body>
    </>
}