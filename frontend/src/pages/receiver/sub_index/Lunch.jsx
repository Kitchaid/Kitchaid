import React, { useNavigate } from "react-router-dom";
import from "../../../Partials/";
import { getKitchenFunctionContentForClient } from "../../../hooks/security/useUserLogin"
import { useQuery } from "react-query";

const Lunch = () => {
  const navigate = useNavigate();
  const { data: functionContent } = useQuery(
    ["getKitchenFunctionContentForClient",],
    () => getKitchenFunctionContentForClient());
  return (
    <>
      {
        functionContent?.data[0]?.lunchStatistik ?
          <button
            className="mainButton mt-5 mb-4 p-1"
            onClick={() => navigate("/newStatsReceiver")}
          >
            <span>Ny Lunch Statistik</span>
          </button>
          : <></>
      }
      {
        functionContent?.data[0]?.lunchStatistik ?
          <button
            className="mainButton mb-3 p-1"
            onClick={() => navigate("/statsRecordReceiver")}
          >
            <span>Statistik</span>
          </button>
          : <></>
      }
      {
        functionContent?.data[0]?.lunchIngredients ?
          <button
            className="mainButton mb-3 p-1"
            onClick={() => navigate("/DailyMealIngredients")}
          >
            <span style={{ fontSize: "11px" }}>Dagens Lunch innehåll</span>
          </button>
          : <></>
      }
      <button
        className="mainButton mb-3 p-1"
        onClick={() => navigate("/lunchOrders")}
      >
        <span style={{ fontSize: "11px" }}>Lunch orders</span>
      </button>
    </>
  );
};

export default Lunch;
