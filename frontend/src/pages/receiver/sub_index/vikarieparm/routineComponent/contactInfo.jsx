import React from "react";
import { useQuery } from "react-query";
import { getContactinfo, CreateContact, DeleteOneContactInfo } from "../../../../../hooks/receiverHooks/receiverHooks";
import { Accordion, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function ContactInfo() {
    //use react query for create new section
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    // get, create and delete section
    const { data: contactinfo } = useQuery("getContactinfo", getContactinfo,);
    //create
    const { mutate } = CreateContact();
    const onSubmit = (data) => {
        mutate(data);
        reset();
    };
    //Delete one
    const { mutate: DeleteOne } = DeleteOneContactInfo();

    return <>
        <Accordion.Item eventKey="6">
            <Accordion.Header>Kontaktinformation</Accordion.Header>
            <Accordion.Body>
                <table
                    className="table table-striped text-center"
                >
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Enhet</th>
                            <th scope="col">Kontakt nummer</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    {contactinfo?.data.map((contact, index) => {
                        return (
                            <>
                                <tbody key={index} className="text-center">
                                    <tr>
                                        <th scope="row"></th>
                                        <td className="text-light">{contact.unit_name}</td>
                                        <td className="text-light">{contact.telephone_number}</td>
                                        <td>
                                            <span
                                                type="button"
                                                onClick={() => {
                                                    DeleteOne(contact._id);
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
                        className="row align-items-center  m-auto mb-3"
                        onSubmit={handleSubmit(onSubmit)}>
                        {errors.unit_name?.type === "required" && (
                            <p className="m-auto ms-5 error" role="alert">
                                Måste fyll i
                            </p>
                        )}
                        <input
                            type="text"
                            placeholder="Enhet"
                            className="form-control text-center mb-3"
                            {...register("unit_name", {
                                required: true,
                                maxLength: 30,
                                type: String
                            })}
                            aria-invalid={errors.unit_name ? "true" : "false"}
                        />
                        {errors.telephone_number?.type === "required" && (
                            <p className="m-auto ms-5 error" role="alert">
                                Måste fyll i
                            </p>
                        )}
                        <input
                            type="number"
                            placeholder="Kontakt nummer"
                            className="form-control text-center mb-3"
                            {...register("telephone_number", {
                                required: true,
                                maxLength: 30,
                                type: String
                            })}
                            aria-invalid={errors.telephone_number ? "true" : "false"}
                        />
                        <button
                            type="submit"
                            className=" m-0 stats_card"
                        >
                            <span className="d-block m-auto">Bekräfta</span>
                        </button>
                    </form>
                </Container>
            </Accordion.Body>
        </Accordion.Item>
    </>
}