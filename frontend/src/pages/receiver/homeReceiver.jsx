import React, { useState, useEffect } from "react";
import { axiosClient } from "../../hooks/axiosInstance";
import { useNavigate } from "react-router-dom";
import from "../../Partials/"
import { getKitchenFunctionContentForClient } from "../../hooks/security/useUserLogin"
import { useQuery } from "react-query";

const Home = () => {
  const navigate = useNavigate();
  //get all routine
  const [routine, setRoutine] = useState([]);
  useEffect(() => {
    axiosClient
      .get('user/food_routine/')
      .then((data) => {
        setRoutine(data?.data);
      })
      .catch((err) => console.log(err));
  }, []);
  if (routine === null) {
    axiosClient
      .post(
        'user/food_routine',
        { breakfastTime: "07:00" },
      )
      .then((res) => {
        setRoutine(res.data.routine);
      });
  }
  const { data: functionContent } = useQuery(
    ["getKitchenFunctionContentForClient",],
    () => getKitchenFunctionContentForClient());
  return (
    <>
      <button
        className="mainButton p-1 mt-5"
        onClick={() => navigate("/LunchReceiver")}
      >
        <span>Måltid</span>
      </button>
      {functionContent?.data[0]?.vikParm
        ? <button
          className="mainButton p-1"
          onClick={() => navigate("/Vikarieparm")}
        >
          <span>Vikarie pärm</span>
        </button>
        : <></>}

      <button
        className="mainButton p-1"
        onClick={() => navigate("/Plan")}
      >
        <span>Planering</span>
      </button>
      <button
        className="mainButton mb-5 p-1"
        onClick={() => navigate("/Control")}
      >
        <span>Kontroll</span>
      </button>
    </>
  );
};

export default Home;
