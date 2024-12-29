import React, { useState } from "react";
import { CreateSpecial, DeleteOneSpecial } from '../../../../../hooks/producerHooks/producerHooks'
import { getSpecial } from '../../../../../hooks/receiverHooks/receiverHooks'
import { Accordion, Container } from "react-bootstrap";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { getSpecialType } from '../../../../../hooks/admin/superiorAdmin'

export default function SpecialFood() {
    //use react query for create new special
    const [chosenTypes, setChosenTypes] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    // get, create and delete special
    const { data: special } = useQuery("getSpecial", getSpecial, { refetchInterval: 2000 });
    const { data: type } = useQuery("getSpecialtype", getSpecialType);
    //create
    const { mutate } = CreateSpecial();
    const onSubmit = (data) => {
        Object.assign(data, {
            allergic: chosenTypes.sort(),
        })
        mutate(data);
        reset();
    };
    //Chose special type
    const toggleSelection = (type) => {
        if (chosenTypes.includes(type)) {
            const updatedChosenTypes = chosenTypes.filter(chosenType => chosenType !== type);
            setChosenTypes(updatedChosenTypes.sort());
        } else {
            setChosenTypes([...chosenTypes, type]);
        }
    };
    //Delete one
    const { mutate: deleteOneItem } = DeleteOneSpecial();

    return <>
        <Accordion.Item eventKey="4">
            <Accordion.Header>Special kost</Accordion.Header>
            <Accordion.Body>
                <table
                    className="table table-striped text-start mb-3 font-size-xs"
                >
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Namnet</th>
                            <th scope="col">Allergi mot</th>
                            <th scope="col">Tillhör</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    {special?.data.map((special, index) => {

                        return (
                            <>
                                <tbody key={index} className="text-start mb-3">
                                    <tr>
                                        <th scope="row"></th>
                                        <td key={index} className="text-light">{special.person_name}</td>
                                        <td>{special?.allergic?.map((item, index) => {
                                            const matchingType = type?.data?.Special_type[0]?.special_type.find(typeObj => typeObj.s_type === item);
                                            const typeColor = matchingType ? matchingType.color : '';
                                            return <>
                                                <span style={{ backgroundColor: typeColor }} key={index}>
                                                    &nbsp;{item}&nbsp;
                                                </span>
                                            </>
                                        })}
                                        </td>
                                        <td className="text-start text-light">{special.section}</td>
                                        <td>
                                            <span
                                                className="text-start text-light"
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
                <Container>
                    <form
                        className="row align-items-center mb-3  m-auto mb-3"
                        onSubmit={handleSubmit(onSubmit)}>
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
                        <span className="text-start text-light">Allergi mot:</span>
                        <div className="special-type-group font-size-s">
                            {type?.data?.Special_type[0]?.special_type?.sort().map((type, index) => {
                                return <>
                                    <span
                                        className={chosenTypes.includes(type.s_type) ? "special_type_light button_size cursor" : 'button_size special_type cursor'}
                                        key={index}
                                        onClick={() => toggleSelection(type.s_type)}
                                    >{type.s_type}</span>
                                </>
                            })}
                        </div>
                        <input
                            type="text"
                            placeholder="Tillhör avdelning"
                            className="form-control text-center mb-3 mt-3"
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
                            type="submit"
                        >
                            <span className="d-block m-auto">Bekräfta</span>
                        </button>
                    </form>
                </Container>
            </Accordion.Body>
        </Accordion.Item>
    </>
}