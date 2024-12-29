import React, { useState } from "react";
import { useQuery } from "react-query";
import { getRoutine, UpdateFoodRoutine, } from "../../../../../hooks/receiverHooks/receiverHooks";
import { useNavigate } from "react-router-dom";
import { Accordion, Container, Row, Col } from "react-bootstrap";


export default function FoodRoutine() {
  const navigate = useNavigate();
  // get, create and delete routine
  const { data: routine } = useQuery("getRoutine", getRoutine);
  const _id = routine?.data._id;
  //Update routine and section.....
  const [updateRoutine, setUpdateRoutine] = useState({ routine });
  const { mutate: MutateFoodRoutine } = UpdateFoodRoutine();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateRoutine((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    MutateFoodRoutine({ _id, updateRoutine });
    navigate("/Vikarieparm");
  };
  return <>
    <Accordion.Item eventKey="1">
      <Accordion.Header className="routineLayout">
        Frukost
      </Accordion.Header>
      <Accordion.Body>
        <Container>
          <Row className="mt-3">
            <Col className="mb-3">
              <span className="font-size-xs text-light">
                Frukost börjar: timme:minuter
              </span>
            </Col>
            <Col>
              <div>
                <input
                  type="text"
                  className="form-control text-center"
                  name="breakfastTime"
                  value={updateRoutine?.breakfastTime}
                  placeholder={routine?.data.breakfastTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </Col>
          </Row>
          <Row>
            <table className="table table-striped text-center">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Vardag</th>
                  <th scope="col">Servering</th>
                </tr>
              </thead>
              <tbody key={routine?._id}>
                <tr>
                  <th scope="row"></th>
                  <td className="text-start text-light">Måndag</td>
                  <td>
                    <input
                      type="text"
                      className="form-control text-center ms-auto w-100"
                      name="breakfast_monday"
                      value={updateRoutine?.breakfast_monday}
                      placeholder={routine?.data.breakfast_monday}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row"></th>
                  <td className="text-start text-light">Tisdag</td>
                  <td>
                    <input
                      type="text"
                      className="form-control text-center ms-auto w-100"
                      name="breakfast_tuesday"
                      value={updateRoutine?.breakfast_tuesday}
                      placeholder={routine?.data.breakfast_tuesday}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row"></th>
                  <td className="text-start text-light">Onsdag</td>
                  <td>
                    <input
                      type="text"
                      className="form-control text-center ms-auto w-100"
                      name="breakfast_wednesday"
                      value={updateRoutine?.breakfast_wednesday}
                      placeholder={routine?.data.breakfast_wednesday}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row"></th>
                  <td className="text-start text-light">Torsdag</td>
                  <td>
                    <input
                      type="text"
                      className="form-control text-center ms-auto w-100"
                      name="breakfast_thursday"
                      value={updateRoutine?.breakfast_thursday}
                      placeholder={routine?.data.breakfast_thursday}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row"></th>
                  <td className="text-start text-light">Fredag</td>
                  <td>
                    <input
                      type="text"
                      className="form-control text-center ms-auto w-100"
                      name="breakfast_friday"
                      value={updateRoutine?.breakfast_friday}
                      placeholder={routine?.data.breakfast_friday}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Row>
          <button
            variant="primary"
            size="md"
            className="stats_card mb-4 m-auto"
            onClick={handleSubmit}
          >
            <span className="d-block">Bekräfta</span>
          </button>
        </Container>
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="3">
      <Accordion.Header>Mellanmål</Accordion.Header>
      <Accordion.Body>
        <Container>
          <Row className="mt-3">
            <Col className="mb-3 mt-2">
              <span className="font-size-xs text-light">
                Mellanmål börjar: timme:minuter
              </span>
            </Col>
            <Col>
              <div>
                <label
                  className="visually-hidden"
                  htmlFor="autoSizingInput"
                ></label>
                <input
                  type="text"
                  className="form-control text-center"
                  name="snackTime"
                  value={updateRoutine?.snackTime}
                  placeholder={routine?.data.snackTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </Col>
          </Row>
          <Row>
            <table className="table table-striped text-center">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Vardag</th>
                  <th scope="col">Servering</th>
                </tr>
              </thead>
              <tbody key={routine?.data._id}>
                <tr>
                  <th scope="row"></th>
                  <td className="text-start text-light">Måndag</td>
                  <td>
                    <input
                      type="text"
                      className="form-control text-center ms-auto"
                      name="snack_monday"
                      value={updateRoutine?.snack_monday}
                      placeholder={routine?.data.snack_monday}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row"></th>
                  <td className="text-start text-light">Tisdag</td>
                  <td>
                    <input
                      type="text"
                      className="form-control text-center ms-auto"
                      name="snack_tuesday"
                      value={updateRoutine?.snack_tuesday}
                      placeholder={routine?.data.snack_tuesday}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row"></th>
                  <td className="text-start text-light">Onsdag</td>
                  <td>
                    <input
                      type="text"
                      className="form-control text-center ms-auto"
                      name="snack_wednesday"
                      value={updateRoutine?.snack_wednesday}
                      placeholder={routine?.data.snack_wednesday}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row"></th>
                  <td className="text-start text-light">Torsdag</td>
                  <td>
                    <input
                      type="text"
                      className="form-control text-center ms-auto"
                      name="snack_thursday"
                      value={updateRoutine?.snack_thursday}
                      placeholder={routine?.data.snack_thursday}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row"></th>
                  <td className="text-start text-light">Fredag</td>
                  <td>
                    <input
                      type="text"
                      className="form-control text-center ms-auto"
                      name="snack_friday"
                      value={updateRoutine?.snack_friday}
                      placeholder={routine?.data.snack_friday}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Row>
          <button
            variant="primary"
            size="md"
            className="stats_card mb-3 m-auto"
            onClick={handleSubmit}
          >
            <span className="d-block m-auto">Bekräfta</span>
          </button>
        </Container>
      </Accordion.Body>
    </Accordion.Item>
  </>
}