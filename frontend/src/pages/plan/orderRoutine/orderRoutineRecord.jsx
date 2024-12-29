import React, { useQuery } from 'react-query';
import { getOrderRoutine, DeleteOneOrderRoutine } from "../../../hooks/plan/orderRoutineHooks";
import Spinner from '../../../Partials/Spinner'
import "react-router-dom";
import { group } from "group-items";
import "bootstrap/dist/css/bootstrap.css";

function OrderRoutineRecord() {
  // Using the fetching hook
  const { data, error, isLoading } = useQuery(
    'getOrders',
    getOrderRoutine,
    {
      refetchInterval: 1500
    }
  );

  //delete one
  const { mutate: DeleteOne } = DeleteOneOrderRoutine();
  const handelDeleteOne = (id) => {
    DeleteOne(id);
  }
  // Error and Loading states
  if (error) return <div>Nånting gick fel</div>;
  if (isLoading) return <div><Spinner /></div>;
  //group order by weekday
  const groupByDay = group(data?.data).by("weekday").asArrays();
  const createList = (tasks) => {
    return (
      <>
        <tbody >
          <tr key={tasks._id}>
            <th scope="row"></th>
            <td className='text-light'>{tasks.weekday}</td>
            <td className='text-light'>{tasks.OrderRoutine}</td>
            <td className='text-light'>{tasks.comment}</td>
            <td>
              <span
                type="button"
                onClick={() => handelDeleteOne(tasks._id)}
              >
                <i className="fa-solid fa-trash-can glow text-light"></i>
              </span>
            </td>
          </tr>
        </tbody>
      </>
    );
  };


  return (
    <>
      <div className="todoAndOrderStyle">
        <div style={{ height: "300px" }}>
          <table className="table table-striped">
            <thead>
              <tr className="weekday">
                <th scope="col"></th>
                <th scope="col">Leverans Dag</th>
                <th scope="col">Beställ</th>
                <th scope="col">Kommentar</th>
              </tr>
            </thead>
            {groupByDay.map((items) => {
              return Object.values(items)?.map(createList);
            })}
          </table>
        </div>
      </div>
    </>
  );
}

export default OrderRoutineRecord;
