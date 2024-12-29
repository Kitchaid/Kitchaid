import React, { useState, useContext } from "react";
import { getProducer, CreateUser } from "../../../hooks/admin/admin";
import { useQuery } from "react-query";
import "bootstrap/dist/css/bootstrap.css";
import Spinner from "../../../Partials/Spinner";
import { contextData } from '../../../ContextApi'

const NewUser = () => {
    let str2bool = (value) => {
        if (value && typeof value === "string") {
            if (value.toLowerCase() === "true") return true;
            if (value.toLowerCase() === "false") return false;
        }
        return value;
    };
    const { userdata } = useContext(contextData)
    const kommun = userdata.kommun;

    const [user, setUser] = useState({
        kommun: kommun,
        username: "",
        password: "",
        password2: "",
        isProducer: Boolean,
        belongTo_id: "",
    });
    const handleChange = (e) => {
        const { name } = e.target;
        const value = str2bool(e.target.value);
        setUser((preve) => {
            return {
                ...preve,
                [name]: value,
            };
        });
    };
    //get production kitchen's id
    const { data: producerInfo, error, isLoading } = useQuery("getProducer", getProducer);

    //render select menu
    const renderSelect = () => {
        if (user.isProducer === false) {
            return (
                <div>
                    <select
                        onChange={handleChange}
                        name="belongTo_id"
                        className="form-select"
                    >
                        <option value={"507f1f77bcf86cd799439011"}>Tillhör köket</option>
                        {producerInfo?.data.map((kitchen, index) => {
                            return (
                                <option key={index} value={kitchen._id}>
                                    {kitchen.username}
                                </option>
                            );
                        })}
                    </select>
                </div>
            );
        } else {
            return <div></div>;
        }
    };
    const { mutate: createUser } = CreateUser();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.part === "Äldreomsorg" || user.part === "Matlåda") {
            const group = { group: "senior" }
            const submitdata = Object.assign(user, group)
            createUser(submitdata);
        } else if (user.part === "Förskolan" || user.part === "Skolan") {
            const group = { group: "junior" }
            const submitdata = Object.assign(user, group)
            createUser(submitdata);
        }
    };
    if (error) return <div>Nånting gick fel</div>;
    if (isLoading)
        return (
            <div style={{ height: '100vh' }}>
                <Spinner />
            </div>
        );
    return (
        <form>
            <div className="user-registe-form">
                <div
                    className=" mb-4"
                >
                    <input
                        className="radio"
                        type="radio"
                        name="isProducer"
                        value={true}
                        onChange={handleChange}
                    />
                    <label htmlFor="producer" className="ms-2 text-light">Produktionskök </label>
                    <input
                        className="radio ms-5"
                        type="radio"
                        name="isProducer"
                        value={false}
                        onChange={handleChange}
                    />
                    <label htmlFor="receiver" className="ms-2 text-light">Mottagningskök</label>
                </div>
                {renderSelect()}
                <div>
                    <select
                        onChange={handleChange}
                        name="part"
                        className="form-select mt-4"
                    >
                        <option value={" "}>Välj grupp</option>
                        <option value={"Förskolan"}>Förskolan</option>
                        <option value={"Skolan"}>Skolan</option>
                        <option value={"Äldreomsorg"}>Äldreomsorg</option>
                        <option value={"Matlåda"}>Matlåda</option>

                    </select>
                </div>
                <div className="form-floating mb-5 mt-5">
                    <input
                        className="form-control"
                        type="text"
                        name="username"
                        placeholder="Your Username"
                        defaultValue={""}
                        onChange={handleChange}
                    />
                    <label htmlFor="floatingInput">Choose a username</label>
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
                        onChange={handleChange}
                    />
                    <label htmlFor="floatingPassword">Password</label>
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
                        onChange={handleChange}
                    />
                    <label htmlFor="floatingPassword">Confirm Password</label>
                </div>
                <div className="d-grid mt-5">
                    <button className="stats_card" onClick={handleSubmit}>
                        <span>Registrera</span>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default NewUser;
