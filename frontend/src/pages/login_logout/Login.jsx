import React, { useContext, useState, useEffect } from "react";
import Hero from "../../Partials/Hero"
import Footer from "../../Partials/Footer";
import kommun from "../../Partials/Kommun";
import Spinner from "../../Partials/Spinner";
import { contextData } from "../../ContextApi";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useUserLogin, useUserTrace } from '../../hooks/security/useUserLogin';
import Intro from "../../Partials/Introduction";
import { toast } from "react-toastify";
const Login = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const { data, mutate, isSuccess, isError, isLoading } = useUserLogin();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (dataOnSubmit) => {
    mutate(dataOnSubmit)
  };
  const { setUserData } = useContext(contextData);
  const { mutate: postUserTrace } = useUserTrace()
  useEffect(() => {
    if (isSuccess) {
      toast(data.msg)
      localStorage.setItem("Access_token", data?.Access_token);
      setUserData(data.user_info);
      postUserTrace();
      navigate('/secure')
    } else if (isError) {
      toast("Användare finns inte eller fel lösenord")
    } else return;
  }, [isSuccess, isError]);
  if (isLoading) {
    return <div>{<Spinner />}</div>;
  }

  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='m-auto'>
            <Hero />
          </div>
          <div className="login-container">
            <div>
              {errors.kommun && (
                <p className="ms-1 p-1 error fs-6" role="alert">
                  Välj kommun
                </p>
              )}
              <div className="">
                <label htmlFor="kommun"></label>
                <select
                  name="kommun"
                  {...register("kommun", {
                    required: true,
                  })}
                  className="form-select"
                >
                  <option value={""}>Välj kommun</option>
                  {kommun?.map((kommun, index) => {
                    return (
                      <option key={index} value={kommun.name.toLowerCase()}>
                        {kommun.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-floating mb-5 mt-5">
                <input
                  className="form-control"
                  type="text"
                  {...register("username")}
                />
                <label htmlFor="floatingInput">Användarnamn</label>
              </div>
              <div className="form-floating">
                <input
                  className="form-control"
                  type="password"
                  {...register("password")}
                />
                <label htmlFor="floatingPassword">Lösenord</label>
              </div>
            </div>
            <div className="mt-5">
              <button className="stats_card m-auto" type="submit">
                <span className="font-size-sm">Login</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="mt-3 text-center">
        {/* <strong
          className="document text-light font-size-xs"
          onClick={handleShow}
        >
          Introduktion
        </strong> */}
        <Modal
          size="md"
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Intro />
        </Modal>
      </div>
      <Footer />
    </>
  );
};

export default Login;
