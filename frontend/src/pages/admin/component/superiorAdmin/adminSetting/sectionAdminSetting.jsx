import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useForm } from "react-hook-form";
import { CreateAdmin } from "../../../../../hooks/admin/superiorAdmin";

const NewAdmin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { mutate: createAdmin } = CreateAdmin();
    const onSubmit = (data) => {
        if(data.password !== data.password2){ alert("Lösenord är inte samma!")}
        else {createAdmin(data);}
    };

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="user-registe-form">
                    <div className="form-floating mb-5 mt-5">
                        {errors.section && (
                            <p className="ms-1 p-1 error fs-6" role="alert">
                                Fyll i användarnamn
                            </p>
                        )}
                        <input
                            className="form-control"
                            type="text"
                            name="section"
                            placeholder="Användarnamn"
                            defaultValue={""}
                            {...register("username", {
                                required: true,
                            })}
                        />
                        <label htmlFor="floatingInput">Användarnamn</label>
                    </div>
                    <div className="form-floating mb-5 mt-5">
                        {errors.section && (
                            <p className="ms-1 p-1 error fs-6" role="alert">
                                Välj i grupp namn
                            </p>
                        )}
                        <select name="partGroup"
                            className="form-select"
                            {...register("section", {
                                required: true,
                            })}>
                            <option value={''} ></option>
                            <option value={'Område2'}>Område2</option>
                            <option value={'Söderfors'}>Söderfors</option>
                        </select>
                        <label htmlFor="floatingInput">Område</label>
                    </div>
                    <div className="form-floating">
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            required
                            minLength={6}
                            placeholder="Password"
                            defaultValue={""}
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <label htmlFor="floatingPassword">Lösenord</label>
                    </div>
                    <div className="form-floating mt-2">
                        <input
                            className="form-control"
                            type="password"
                            name="password2"
                            required
                            minLength={6}
                            placeholder="Confirm Password"
                            defaultValue={""}
                            {...register("password2", {
                                required: true,
                            })}
                        />
                        <label htmlFor="floatingPassword">Bekräfta lösenord</label>
                    </div>
                    <div className="d-grid mt-5">
                        <button className="stats_card" type="submit">
                            <span>Registrera</span>
                        </button>
                    </div>
                </div>
            </form>
        </React.Fragment>
    );
};

export default NewAdmin;
