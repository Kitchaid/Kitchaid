import React, { useState } from "react";
import { getAllUsersForAdmin, getUserTraceData } from "../../../hooks/admin/admin";
import { useQuery } from "react-query";
import Table from 'react-bootstrap/Table';
// import DatePicker from "react-multi-date-picker";

const LoginTrace = () => {
    const [user, setUser] = useState('64d67b26f4439d4358caa421')
    const traceId = user;
    //date picker
    // const [startDate, setStartDate] = useState(new Date().toISOString());
    // const [endDate, setEndDate] = useState(new Date().toISOString());
    //fetch start and end date
    // let dateStart = startDate.toString().slice(0, 10) + 'T00:00:00.000Z'
    // let dateEnd = endDate.toString().slice(0, 10) + 'T23:59:59.000Z'

    const { data: allUser } = useQuery('getAllUsers', getAllUsersForAdmin);
    const { data: loginTraceData } = useQuery(['getUserTraceData', traceId], () => getUserTraceData(traceId));

    const handleChange = (e) => {
        const { value } = e.target;
        setUser(value);
    };
    const rendComponent = () => {
        if (!user) {
            return
        } else {
            return <>
                {/* <div className="d-flex mt-5 w-75 justify-content-center m-auto">
                        <div className="me-5">
                            <span className="me-2">från </span>
                            <DatePicker
                                value={startDate}
                                onChange={
                                    (date) => {
                                        const d = new Date(date).toISOString();
                                        setStartDate(d)
                                    }
                                } />
                        </div>
                        <div>
                            <span className="me-2">till </span>
                            <DatePicker
                                value={endDate}
                                onChange={
                                    (date) => {
                                        const d = new Date(date).toISOString();
                                        setEndDate(d)
                                    }
                                } />
                        </div>
                    </div> */}
                <div className="overflow">
                    <h6>{loginTraceData?.data[0]?.username}</h6>
                    <h6>{loginTraceData?.data[0]?.kommun}</h6>
                    <Table striped bordered hover className="overflow">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Login tid</th>
                                <th>Login IP</th>
                            </tr>
                        </thead>
                        {loginTraceData?.data.map((data, index) => {
                            return <>
                                <tbody>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{data.createdAt.slice(0, 16)}</td>
                                        <td>{data.loginIp}</td>
                                    </tr>
                                </tbody>
                            </>
                        })}
                    </Table>
                </div>
                <div className="d-flex mt-5">
                    {/* <BarChartsFoodWasteByKitchen kitchenId={user} /> */}
                </div>
            </>
        }
    }

    return <>
        <div className="login-container mt-5">
            <select
                onChange={handleChange}
                className="form-select mb-5"
            >
                <option value={"6408a5b93fa56cd835cd1083"}>Välj köket</option>
                {allUser?.data?.map((kitchen, index) => {
                    return (
                        <option key={index} value={kitchen._id}>
                            {kitchen.username}
                        </option>
                    );
                })}
            </select>
        </div>
        {rendComponent()}
    </>
}
export default LoginTrace;