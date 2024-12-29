import React from "react";
import { useQuery } from 'react-query';
import { getWorkRoutine, DeleteOneWorkRoutine } from "../../../../hooks/plan/workRoutineHooks";
import Spinner from '../../../../Partials/Spinner'
import "react-router-dom";
import { group } from "group-items";
import "bootstrap/dist/css/bootstrap.css";

function WorkRoutineRecord() {
  // Using the fetching hook
  const { data, error, isLoading } = useQuery(
    'getWorkRoutine',
    getWorkRoutine,
    {
      refetchInterval: 1000
    }
  );

  //delete one
  const { mutate: DeleteOne } = DeleteOneWorkRoutine();
  const handelDeleteOne = (id) => {
    DeleteOne(id);
  }
  // Error and Loading states
  if (error) return <div>Nånting gick fel</div>;
  if (isLoading) return <div><Spinner /></div>;
  //group Work by weekday
  const groupByDay = group(data?.data).by("weekday").asArrays();
  const createList = (tasks) => {
    return (
      <>
        <tbody >
          <tr key={tasks._id} >
            <th scope="row"></th>
            <td className="text-start text-light">{tasks.weekday}</td>
            <td className="text-start text-light">{tasks.WorkRoutine}</td>
            <td className="text-start text-light">{tasks.comment}</td>
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
        <div>
          <table className="table table-striped">
            <thead>
              <tr className="weekday">
                <th scope="col"></th>
                <th scope="col">Dag</th>
                <th scope="col">Att göra</th>
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

export default WorkRoutineRecord;
