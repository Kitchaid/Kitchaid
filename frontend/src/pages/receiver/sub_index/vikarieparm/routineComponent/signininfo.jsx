import React from "react";
import { useQuery } from "react-query";
import { getSignininfo, CreateSignIn, DeleteOneSignIn } from "../../../../../hooks/receiverHooks/receiverHooks";
import { Accordion, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function Signininfo() {
    //use react query for create new section
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    // get, create and delete section
    const { data: signininfo } = useQuery("getSignininfo", getSignininfo,);
    //create
    const { mutate } = CreateSignIn();
    const onSubmit = (data) => {
        mutate(data);
        reset();
    };
    //Delete one
    const { mutate: DeleteOneSignin } = DeleteOneSignIn();
    return <>
        <Accordion.Item eventKey="5">
            <Accordion.Header>Inloggningsuppgifter</Accordion.Header>
            <Accordion.Body>
                <table
                    className="table table-striped text-center"
                >
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Enhet</th>
                            <th scope="col">Användarnamn</th>
                            <th scope="col">Lösenord</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    {signininfo?.data.map((signininfo, index) => {
                        return (
                            <>
                                <tbody key={index} className="text-center">
                                    <tr>
                                        <th scope="row"></th>
                                        <td className="text-start text-light">{signininfo.unit_name}</td>
                                        <td className="text-start text-light">{signininfo.username}</td>
                                        <td className="text-start text-light">{signininfo.password}</td>
                                        <td>
                                            <span
                                                type="button"
                                                onClick={() => {
                                                    DeleteOneSignin(signininfo._id);
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
                    <div>
                        <p className="m-auto text-center text-light">
                            OBS! INTE känslig uppgifter{" "}
                        </p>
                        <p className="m-auto text-center text-light mb-3">(typ Martin&Servera)</p>
                    </div>
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
                        {errors.username?.type === "required" && (
                            <p className="m-auto ms-5 error" role="alert">
                                Måste fyll i
                            </p>
                        )}
                        <input
                            type="text"
                            placeholder="Användarnamn"
                            className="form-control text-center mb-3"
                            {...register("username", {
                                required: true,
                                maxLength: 30,
                                type: String
                            })}
                            aria-invalid={errors.username ? "true" : "false"}
                        />
                        {errors.password?.type === "required" && (
                            <p className="m-auto ms-5 error" role="alert">
                                Måste fyll i
                            </p>
                        )}
                        <input
                            type="text"
                            placeholder="Lösenord"
                            className="form-control text-center mb-3"
                            {...register("password", {
                                required: true,
                                maxLength: 30,
                                type: String
                            })}
                            aria-invalid={errors.password ? "true" : "false"}
                        />
                        <button
                            type='submit'
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