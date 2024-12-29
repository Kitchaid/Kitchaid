import React, { useState, useContext } from "react";
import {
    BarChartsLunchStatsByKitchen,
    TotalFoodWasteAsPieChart,
    AverageFoodWasteAsPieChart,
    AverageFoodWastePerGuestByDay
} from '../../../Partials/BarCharts'
import { getAllUsersForSuperAdmin } from "../../../hooks/admin/superiorAdmin";
import { getAllUsersForAdmin } from "../../../hooks/admin/admin";
// import WeeklyMenuPage from './superiorAdmin/menuSetting/weeklyMenu';
import { useQuery } from "react-query";
import { contextData } from '../../../ContextApi'
import DatePicker from "react-multi-date-picker";
// import ChatGPT from "./chatGPT";
const DataAnalyze = () => {
    const [user, setUser] = useState()
    const [render, setRender] = useState('')
    const [type, setType] = useState('')
    //date picker
    const [startDate, setStartDate] = useState(new Date().toISOString());
    const [endDate, setEndDate] = useState(new Date().toISOString());
    //fetch start and end date
    let dateStart = startDate.toString().slice(0, 10) + 'T00:00:00.000Z'
    let dateEnd = endDate.toString().slice(0, 10) + 'T23:59:59.000Z'
    const { data: allUserForSuperAdmin } = useQuery('getAllUsersForSuperAdmin', getAllUsersForSuperAdmin)
    const { data: allUsersForAdmin } = useQuery('getAllUsersForAdmin', getAllUsersForAdmin)
    const handleChange = (e) => {
        const { value } = e.target;
        setUser(value);
    };
    const { userdata } = useContext(contextData)
    const allUser = () => {
        if (userdata.isSuperiorAdmin === true) { return allUserForSuperAdmin }
        else if (userdata.isSuperiorAdmin === false ) { return allUsersForAdmin }
    }
    const rendComponent = () => {
        if (!allUser() || !user) return null; if (render === 'lunch') {
            if (!user) {
                return
            } else {
                return <>
                    <div className="d-flex mt-5">
                        <BarChartsLunchStatsByKitchen id={user} />
                    </div>
                </>
            }
        } else if (render === 'matsvinn') {
            if (!user) {
                return
            } else {
                return <>
                    <div className="d-flex mt-5 w-75 justify-content-center m-auto">
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
                    </div>
                    <div className="d-flex mt-5 mb-5">
                        <button className="stats_card w-25 ms-5" onClick={() => setType('TotalFoodWaste')}>Svinn</button>
                        <button className="stats_card w-25 ms-5" onClick={() => { setType('AverageFoodWaste') }}>Genomsnitt Svinnfördelning</button>
                        <button className="stats_card w-25 ms-5" onClick={() => { setType('WastePerGuest') }}>Svinn per ätande</button>
                    </div>
                    {renderCharts()}
                </>
            }
        }
    }

    const renderCharts = () => {
        switch (type) {
            case 'TotalFoodWaste':
                return <>
                    <TotalFoodWasteAsPieChart kitchenId={user} dateStart={dateStart} dateEnd={dateEnd} />
                </>
            case 'WastePerGuest':
                return <>
                    <AverageFoodWastePerGuestByDay kitchenId={user} dateStart={dateStart} dateEnd={dateEnd} />
                </>
            case 'AverageFoodWaste':
                return <>
                    <AverageFoodWasteAsPieChart kitchenId={user} dateStart={dateStart} dateEnd={dateEnd} />
                </>
            default: <></>
        }
    }

    return <>
        <div className="login-container w-75 m-auto mt-3">
            <select
                onChange={handleChange}
                className="form-select"
            >
                <option value={"6408a5b93fa56cd835cd1083"}>Välj köket</option>
                {allUser()?.data?.map((kitchen, index) => {
                    return (
                        <option key={index} value={kitchen._id}>
                            {kitchen.username}
                        </option>
                    );
                })}
            </select>
        </div>
        <div className="d-flex justify-content-center mt-3">
            <button className="stats_card w-25" onClick={() => setRender('lunch')}>Lunch statisk</button>
            <button className="stats_card w-25 ms-5" onClick={() => setRender('matsvinn')}>Matsvinn</button>
        </div>
        {rendComponent()}
        <hr></hr>
        {/* <WeeklyMenuPage /> */}
    </>
}
export default DataAnalyze;