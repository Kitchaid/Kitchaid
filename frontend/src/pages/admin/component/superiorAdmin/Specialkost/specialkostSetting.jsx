import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import "bootstrap/dist/css/bootstrap.css";
import { useForm } from "react-hook-form";
import { Modal, Row, Col } from "react-bootstrap";
import { getSpecialType } from '../../../../../hooks/admin/superiorAdmin';
import SpecialType from './specialType'
import {
    CreateSpecial,
    UpdateSpecial,
    getSpecialkost,
    getAllUsers,
    fetchSpecialkost,
    DeleteOneSpecial
} from "../../../../../hooks/producerHooks/producerHooks";
import { getAllValueFromSelect } from '../../../../../utility/utility'
const Specialkost = () => {
    const [itemId, setItemId] = useState('');
    const [chosenTypes, setChosenTypes] = useState([]);
    const { data: allUsers } = useQuery("getAllUsers", getAllUsers);
    //specialkost types update modal
    const [showTypeUpdate, setShowTypeUpdate] = useState(false);
    const handleCloseTypeUpdate = () => setShowTypeUpdate(false);
    const handleShowTypeUpdate = () => setShowTypeUpdate(true);
    //specialkost update modal
    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);
    const [selectedOption, setSelectedOption] = useState({ _id: "" });
    //get special
    const _id = itemId;
    const { data: oneSpecialkost } = useQuery(["getSpecial", _id], () => getSpecialkost(_id));
    const [userStatus, setUserStatus] = useState(oneSpecialkost?.data?.isActived);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();
    const { data: type } = useQuery("getSpecialtype", getSpecialType);
    const { mutate: createSpec } = CreateSpecial();
    const onSubmit = (data) => {
        Object.assign(data, {
            allergic: chosenTypes.sort(),
            group: selectedOption.group,
            username: selectedOption.username,
            belongTo_id: selectedOption.belongTo_id,
            part: selectedOption.part,
            id: selectedOption._id,
            isActived: true,
        })
        createSpec(data)
    };
    // update types
    const [initChosenType, setInitChosenType] = useState([])
    const [chosenTypesUpdate, setChosenTypesUpdate] = useState(initChosenType);
    useEffect(() => {
        if (oneSpecialkost?.data) {
            setValue('person_name', oneSpecialkost?.data?.person_name);
            setValue('section', oneSpecialkost?.data?.section);
            setValue('portion', oneSpecialkost?.data?.portion);
            setValue('comment', oneSpecialkost?.data?.comment);
            setUserStatus(oneSpecialkost?.data?.isActived)
        }
        const initChosenTypeFn = () => {
            if (oneSpecialkost?.data?.allergic) {
                setInitChosenType(oneSpecialkost?.data?.allergic)
            } else return [];
        }
        initChosenTypeFn();
    }, [oneSpecialkost?.data])
    const { mutate: updateOneItem } = UpdateSpecial();
    const concatType = initChosenType?.concat(chosenTypesUpdate);
    //user status
    const handleUserStatus = () => {
        setUserStatus(!userStatus)
    }
    const onSubmitUpdate = (data) => {
        Object.assign(data, {
            allergic: concatType.sort(),
            isActived: userStatus
        })
        updateOneItem({ _id, data })
    };
    // get, create and delete special
    const id = selectedOption._id
    const { data: special } = useQuery(["getSpecial", id], () => fetchSpecialkost(id),
    );

    // get list after alphabet oprder
    let Special = special?.data?.sort((a, b) => a.username.localeCompare(b.username));

    //Delete one
    const { mutate: deleteOneItem } = DeleteOneSpecial();

    //Chose special type
    const toggleSelection = (type) => {
        if (chosenTypes.includes(type)) {
            const updatedChosenTypes = chosenTypes.filter(chosenType => chosenType !== type);
            setChosenTypes(updatedChosenTypes.sort());
        } else {
            setChosenTypes([...chosenTypes, type]);
        }
    };
    //update special type
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
    return (
        <React.Fragment>
            <form
                className="row align-items-center mb-3  m-auto mb-3 mt-5 w-75"
            >
                {errors.person_name?.type === "required" && (
                    <p className="m-auto ms-5 error" role="alert">
                        Måste fyll i
                    </p>
                )}
                <input
                    type="text"
                    placeholder="Gästs förnamn (Ingen efternamn)"
                    className="form-control text-center mb-3"
                    {...register("person_name", {
                        required: true,
                        maxLength: 30,
                        type: String
                    })}
                    aria-invalid={errors.person_name ? "true" : "false"}
                />
                <Row className="mb-2">
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} className="text-light">
                        <span className="font-size-md">Allergi mot:</span>
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                        <div className="text-light cursor" onClick={handleShowTypeUpdate}>
                            <span className="font-size-xs me-2">Typ inställning</span>
                            <i className="fa-solid fa-list-check"></i>
                        </div>
                    </Col>
                </Row>
                <div className="special-type-group font-size-md">
                    {type?.data?.Special_type[0]?.special_type?.map((type, index) => {
                        return <>
                            <span
                                className={chosenTypes.includes(type.s_type) ? "special_type_light button_size cursor" : 'button_size special_type cursor'}
                                key={index}
                                onClick={() => toggleSelection(type.s_type)}
                            >{type.s_type}</span>
                        </>
                    })}
                </div>
                {errors.section?.type === "required" && (
                    <p className="m-auto ms-5 error" role="alert">
                        Måste fyll i
                    </p>
                )}
                <select
                    className="form-select mb-3 mt-3"
                    // onChange={handleChange}
                    onBlur={(e) => getAllValueFromSelect(e, allUsers?.data, setSelectedOption)}
                >
                    <option value='' disabled>Välj tillhör avdelning</option>
                    {allUsers?.data?.map((user, index) => {
                        return (<option key={index} value={user.username}>{user.username}</option>)
                    })
                    }
                </select>
                <input
                    type="text"
                    placeholder="Sektion"
                    className="form-control text-center mb-3"
                    {...register("section", {
                        maxLength: 30,
                        type: String
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
                    className="form-control text-center mb-3"
                    {...register("comment", {
                        maxLength: 30,
                        type: String
                    })}
                />
                <button
                    className=" m-0 stats_card"
                    onClick={handleSubmit(onSubmit)}
                >
                    <span className="d-block m-auto">Bekräfta</span>
                </button>
            </form>
            <hr></hr>
            <div className="w-100 m-auto overflow-spec text-light">
                <table
                    className="table table-striped text-center mb-3 font-size-xs text-light"
                >
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Namnet</th>
                            <th scope="col">Allergi mot</th>
                            <th scope="col">Tillhör</th>
                            <th scope="col">Portion</th>
                            <th scope="col">kommentar</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    {Special?.map((special, index) => {
                        return (
                            <>
                                <tbody key={index} className="text-center mb-3 text-light">
                                    <tr >
                                        <th scope="row"></th>
                                        <td key={index} className="text-light">{special.person_name}</td>
                                        <td className="text-light">{special?.allergic?.map((item, index) => {
                                            return <><span key={index}>{item}, </span></>
                                        })}</td>
                                        <td className="text-light"><span className="font-weight-md text-light">{special.username}</span><br></br>{special.section}</td>
                                        <td className="text-light">{special.portion}</td>
                                        <td className="text-light">{special.comment}</td>
                                        <td>
                                            <span
                                                type="button"
                                                onClick={() => { handleShowUpdate(); setItemId(special._id) }}
                                            >
                                                <i className="fa-solid fa-file-pen glow text-light"></i>
                                            </span>
                                        </td>
                                        <td>
                                            <span
                                                type="button"
                                                onClick={() => {
                                                    deleteOneItem(special._id);
                                                }}
                                            >
                                                <i className="fa-solid fa-trash-can glow text-light"></i>
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </>
                        );
                    })}
                </table>
            </div>
            {/* update one*/}
            <Modal show={showUpdate} onHide={handleCloseUpdate}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Uppdatera specialkost
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>Allergi mot:</span>
                    <div className="special-type-group font-size-s">
                        {type?.data?.Special_type[0]?.special_type?.sort().map((type, index) => {
                            return <>
                                <span
                                    className={chosenTypes.includes(type.s_type) ? "special_type_light button_size cursor" : 'button_size special_type cursor'}
                                    key={index}
                                    onClick={() => toggleSelectionUpdate(type.s_type)}
                                >{type.s_type}</span>
                            </>
                        })}
                    </div>
                    <hr></hr>
                    <form className="row align-items-center mb-3  m-auto mb-3 w-75"
                    >
                        <div className="mt-4">
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
                            className="form-control text-center mb-3"
                            {...register("comment", {
                                maxLength: 30,
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
                                /></Col>
                        </Row>
                        <button className="cursor stats_card" onClick={handleSubmit(onSubmitUpdate)}>
                            <span className="text-center" >Uppdatera</span>
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
            {/* update type*/}
            <Modal show={showTypeUpdate} onHide={handleCloseTypeUpdate} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Specialkost typ inställning
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SpecialType />
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
};

export default Specialkost;
