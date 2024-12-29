import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import TemplateTable from "./tables"
// import { toast } from "react-toastify";
import { Modal, Table, Row, Col, Accordion } from "react-bootstrap";
import { getMenu } from '../../../../../hooks/menu/menu'
import QuantityCalculator from './quantityCalculator'
import {
    SubKitchenConsumingData,
    SubKitchenTotalConsumingData,
    SubKitchenTotalExcludedData,
    getSubKitchenId,
    getSideTemplate
} from "../../../../../hooks/producerHooks/producerHooks";
import Tips from "../../../../../Partials/Tips";
import LogTable from './logTable'
import { userList, getAllValueFromSelect } from "../../../../../utility/utility"
import weekNumberData from '../../../../../Partials/week'
const Logbooks = () => {
    const [dishName, setDishName] = useState("");
    const [sideIngredientName, setSideIngredientName] = useState({});
    //tips pop up
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //Calculator pop up
    // const [showCalculate, setShowCalculate] = useState(false);
    // const handleCloseCalculate = () => setShowCalculate(false);
    // const handleShowCalculate = () => setShowCalculate(true);
    const [shouldFetchData, setShouldFetchData] = useState(false);
    // get menu
    const { data: get_menu } = useQuery("getMenu", getMenu);
    // get menu
    const { data: get_AllUsers } = useQuery("getAllUsers", getSubKitchenId);
    // get sides template
    const { data: SideTemplate } = useQuery("getSideTemplate", () => getSideTemplate());
    //get seleted menu data
    const [selectedOption, setSelectedOption] = useState({
        _id: '63793934371bc9e6500f982d'
    });
    // data for alt 1
    const params = {
        dishName: dishName,
        sidesName: sideIngredientName.sideIngredient
    }
    //Get consumingData
    const { data: consumingData } = useQuery(
        ["SubKitchenConsumingData", params],
        () => SubKitchenConsumingData(params),
        { enabled: shouldFetchData }
    );
    //Get consumingData
    const { data: consumingTotalData } = useQuery(
        ["SubKitchenTotalConsumingData", params],
        () => SubKitchenTotalConsumingData(params),
        { enabled: shouldFetchData }
    );
    const consumingDataForAllUser = userList(get_AllUsers?.data, consumingData?.data);
    //toggle icon
    const [activeRows, setActiveRows] = useState([]);
    const [activeRowsSide, setActiveRowsSide] = useState([]);
    const [activeRowsSas, setActiveRowsSas] = useState([]);
    // toggle show of total quantity
    const [convertvalue, setConvertValue] = useState(1)

    //get select total amount from backend
    const [sauceSelected, setSauceSelected] = useState([])
    const [mainSelected, setMainSelected] = useState([])
    const [sideSelected, setSideSelected] = useState([])
    const [sauceExclued, setSauceExclued] = useState([])
    const [mainStyckExclued, setMainStyckExclued] = useState([])
    const [mainKiloExclued, setMainKiloExclued] = useState([])
    const [sideExclued, setSideExclued] = useState([])
    const [weekNumber, setWeekNumber] = useState(1);
    const excludeParams = {
        dishName: dishName,
        sidesName: sideIngredientName.sideIngredient,
        subKitchenName: activeRows.concat(activeRowsSide).concat(activeRowsSas),
        mainSelectedValue: mainSelected.map(({ value }) => value),
        sideSelectedValue: sideSelected.map(({ value }) => value),
        sauceSelectedValue: sauceSelected.map(({ value }) => value),
    }
    const { data: consumingTotalExcluded } = useQuery(
        ["consumingTotalExcluded", excludeParams],
        () => SubKitchenTotalExcludedData(excludeParams),
        { enabled: shouldFetchData }
    );

    const [totalSauce, setTotalsauce] = useState(0)
    const [totalGuests, setTotalGuests] = useState(0)
    const [totalMain, setTotalMain] = useState([{}])
    const [totalSide, setTotalSide] = useState(0)
    const [unitSide, setTotalunitSide] = useState('')
    const totalmain = [];
    const totalguests = consumingTotalData?.data?.reduce((acc, current) => {
        return acc + current.totalGuests;
    }, 0);
    const totalsauce = consumingTotalData?.data?.reduce((acc, current) => {
        return acc + current.totalStewSoup;
    }, 0);
    const totalside = consumingTotalData?.data?.reduce((acc, current) => {
        return acc + current.totalSide;
    }, 0);
    let sauce = totalsauce - sauceExclued
    let side = totalside - sideExclued
    const totalMainStyckAmount = consumingTotalExcluded?.data[0]?.mainGroup[0]?._id !== 'Kilo' ? consumingTotalExcluded?.data[0]?.mainGroup[0]?.totalMain : consumingTotalExcluded?.data[0]?.mainGroup[1]?.totalMain;
    const mainExcluedKiloAmount = consumingTotalExcluded?.data[0]?.mainGroup[0]?._id !== 'Styck' ? consumingTotalExcluded?.data[0]?.mainGroup[0]?.totalMain : 0
    const sideExcluedAmount = consumingTotalExcluded?.data[0]?.sideGroup[0]?.totalSide;
    const sauceExcluedAmount = consumingTotalExcluded?.data[0]?.sauceGroup[0]?.totalStewSoup;

    useEffect(() => {
        consumingTotalData?.data.forEach((item) => {
            const id = item._id
            const main = item.totalMain
            const myObjects = {};
            myObjects[id] = main;
            totalmain.push(myObjects)
            setTotalMain(totalmain)
            setTotalunitSide(item.records.result.sides.unitSide)
        });
        setTotalsauce(sauce)
        setTotalGuests(totalguests)
        setTotalSide(side)
        setMainStyckExclued(totalMainStyckAmount)
        setMainKiloExclued(mainExcluedKiloAmount)
        setSideExclued(sideExcluedAmount)
        setSauceExclued(sauceExcluedAmount)
    }, [consumingTotalData,
        activeRows,
        sauce,
        side,
        totalMainStyckAmount,
        mainExcluedKiloAmount,
        sideExcluedAmount,
        sauceExcluedAmount,
        totalguests
    ]);

    //reset select
    const resetSelect = () => {
        setConvertValue(0)
        setActiveRows([]);
        setActiveRowsSide([]);
        setActiveRowsSas([]);
        setMainSelected([]);
        setSideSelected([]);
        setSauceSelected([]);
        setShouldFetchData(true)
    }

    return <>
        <Modal.Body>
            <Row className="mb-3">
                <Col>
                    <div className="mx-auto item">
                        <label htmlFor="weekNumber"></label>
                        <select
                            name="weekNumber"
                            defaultValue="Välja vecka"
                            onChange={(event) => {
                                setWeekNumber(event.target.value);
                            }}
                            className="form-select"
                        >
                            <option value="Välja maträtten">Välja vecka</option>
                            {weekNumberData?.map((week, index) => {
                                return (
                                    <option key={index} value={week}>
                                        <span>Vecka {week}</span>
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="mx-auto item">
                        <label htmlFor="dishName"></label>
                        <select
                            name="dishName"
                            defaultValue="Välja maträtten"
                            onChange={(event) => {
                                setDishName(event.target.value);
                                resetSelect()
                            }}
                            className="form-select"
                            onBlur={(e) => getAllValueFromSelect(e, get_menu?.data[0]?.menu, setSelectedOption)}
                        >
                            <option value="Välja maträtten" disabled>Välja maträtten</option>
                            {get_menu?.data[0]?.menu?.map((menu, index) => {
                                return (
                                    <option key={index} value={menu.dishName}>
                                        {menu.dishName}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="mx-auto item">
                        <select
                            className="form-control"
                            name="sideIngredient"
                            onChange={(e) => setSideIngredientName({ sideIngredient: e.target.value })}
                        >
                            <option selected value="">Välj tillbehör...</option>
                            {SideTemplate?.data[0]?.side.map((item, index) => {
                                return <>
                                    <option
                                        value={item.sideIngredient}
                                        key={index}
                                    >{item.sideIngredient}
                                    </option>
                                </>
                            })}
                        </select>
                    </div>
                </Col>
                <Col className="m-auto p-2 me-3">
                    <textarea
                        className="form-control font-size-xs text-danger"
                        aria-label="With textarea"
                        placeholder="Kommentar"
                        rows="2">
                    </textarea>
                </Col>
            </Row>
            <Accordion className="m-auto p-2">
                <Accordion.Item eventKey={1} className='mb-3'>
                    <Accordion.Header>Grundläggande registerdata</Accordion.Header>
                    <Accordion.Body>
                        <Table
                            bordered hover
                            table table-striped={+true}
                            className="font-size-xs"
                        >
                            <thead className="text-center">
                                <tr>
                                    <th scope="col"><i
                                        className="fa-solid fa-calculator fa-fade fa-sm glow"
                                    // onClick={() => { dishName ? handleShowCalculate() : toast("Välj maträtt först") }}
                                    ></i> <br></br>Leveranstid</th>
                                    <th scope="col">Avdelning</th>
                                    <th scope="col">Ätande</th>
                                    <th scope="col">Huvurätt(Enhet)</th>
                                    <th scope="col">Tillbehör(Enhet)</th>
                                    <th scope="col">Sås(Liter)</th>
                                    <th scope="col">Mängd/ätande(ätande/bleck)
                                        <br></br>(Huvurätt/Tillbehör)
                                    </th>
                                </tr>
                            </thead>
                            {consumingDataForAllUser?.map((item, index) => {
                                if (item?.group === 'senior') { return <></> }
                                else {
                                    let avgMain = item?.data?.totalAverageMainPerGuest ?
                                        item?.data?.totalAverageMainPerGuest.toFixed(3) : 0;
                                    let avgSide = item?.data?.totalAverageSidePerGuest ?
                                        item?.data?.totalAverageSidePerGuest.toFixed(0) : 0;
                                    return (
                                        <>
                                            <LogTable
                                                avgMain={avgMain}
                                                avgSide={avgSide}
                                                item={item}
                                                index={index}
                                                selectedDish={selectedOption}
                                                setMainSelected={setMainSelected}
                                                setSideSelected={setSideSelected}
                                                setSauceSelected={setSauceSelected}
                                                setActiveRows={setActiveRows}
                                                setActiveRowsSide={setActiveRowsSide}
                                                setActiveRowsSas={setActiveRowsSas}
                                                activeRows={activeRows}
                                                activeRowsSide={activeRowsSide}
                                                activeRowsSas={activeRowsSas}
                                                weekNumber={weekNumber}
                                                userInfo={get_AllUsers?.data}
                                            />
                                        </>
                                    );
                                }
                            })}
                            {consumingDataForAllUser?.map((item, index) => {
                                if (item?.group === 'junior') { return <></> }
                                else {
                                    let avgMain = item?.data?.totalAverageMainPerGuest ?
                                        item?.data?.totalAverageMainPerGuest.toFixed(3) : 0;
                                    let avgSide = item?.data?.totalAverageSidePerGuest ?
                                        item?.data?.totalAverageSidePerGuest.toFixed(0) : 0;
                                    return (
                                        <>
                                            <LogTable
                                                avgMain={avgMain}
                                                avgSide={avgSide}
                                                item={item}
                                                index={index}
                                                selectedDish={selectedOption}
                                                setMainSelected={setMainSelected}
                                                setSideSelected={setSideSelected}
                                                setSauceSelected={setSauceSelected}
                                                setActiveRows={setActiveRows}
                                                setActiveRowsSide={setActiveRowsSide}
                                                setActiveRowsSas={setActiveRowsSas}
                                                activeRows={activeRows}
                                                activeRowsSide={activeRowsSide}
                                                activeRowsSas={activeRowsSas}
                                                weekNumber={weekNumber}
                                                userInfo={get_AllUsers?.data}
                                            />
                                        </>
                                    );
                                }
                            })}
                        </Table>
                        <i
                            className="fa-solid fa-bell fa-bounce glow ms-2"
                            onClick={handleShow}>
                            <span className="tips">tips</span>
                        </i>
                        <Table
                            bordered hover
                            table table-striped={+true}
                            className="text-center font-size-s"
                        >
                            <thead>
                                <tr>
                                    <th scope="col">Dölj</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Ätande</th>
                                    <th scope="col">Huvurätt<span className="font-size-xs">(Enhet)</span></th>
                                    <th scope="col">Tillbehör<span className="font-size-xs">(Enhet)</span></th>
                                    <th scope="col">Sås(Liter)</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                <tr>
                                    <th scope="row"></th>
                                    <td></td>
                                    <td>{totalGuests}</td>
                                    <td
                                        className="font-size-s text-center"
                                    >{totalMain.map((item) => {
                                        const value = Object.values(item)
                                        const unit = Object.getOwnPropertyNames(item)
                                        const mainstyckExclued = mainStyckExclued === undefined ? 0 : mainStyckExclued;
                                        const newValue = unit[0] === 'Styck' ? value[0] - mainstyckExclued : 0;
                                        const newValueKilo = unit[0] !== 'Styck' ? value[0] - mainKiloExclued : 0;
                                        const convertValue = () => {
                                            if (unit[0] === 'Styck') {
                                                const handlechange = (e) => {
                                                    setConvertValue(newValue * e.target.value / 1000)
                                                };
                                                return <>
                                                    <div>
                                                        <form>
                                                            <label>{newValue.toFixed(0)}({unit}) x </label>
                                                            <select
                                                                defaultValue={1}
                                                                onChange={(e) => handlechange(e)}
                                                            >
                                                                <option value={1} selected>Vikt</option>
                                                                <option value={40}>40g</option>
                                                                <option value={60}>60g</option>
                                                                <option value={70}>70g</option>
                                                                <option value={80}>80g</option>
                                                                <option value={90}>90g</option>
                                                            </select>
                                                        </form>
                                                        <span> = {convertvalue?.toFixed(1)}(Kilo)</span>
                                                    </div>
                                                </>
                                            } else {
                                                return <> <div>{newValueKilo.toFixed(1)}({unit})</div><hr className="w-50 m-auto mb-2 mt-2"></hr>
                                                </>
                                            }
                                        }
                                        return <>
                                            {convertValue()}
                                        </>
                                    })}
                                    </td>
                                    <td>{totalSide?.toFixed(1)}
                                        <span className="font-size-xs">
                                            ({unitSide})
                                        </span>
                                    </td>
                                    <td>{totalSauce?.toFixed(1)}
                                        <span className="font-size-xs">(Liter)
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <div className='template_bar'>
                            <TemplateTable dishName={dishName} />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Accordion className="m-auto p-2">
                <Accordion.Item eventKey={2} className='mb-3'>
                    <Accordion.Header>Mängd kalkylator</Accordion.Header>
                    <Accordion.Body>
                        <QuantityCalculator
                            props={
                                consumingDataForAllUser ? consumingDataForAllUser : []}
                            dishName={dishName}
                            sidesName={sideIngredientName.sideIngredient}
                            selectedDish={selectedOption}
                            weekNumber={weekNumber}
                            userInfo={get_AllUsers?.data}
                        />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Modal.Body>
        {/* ==== Tips ====*/}
        <Modal size="sm" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Kantin modell</Modal.Title>
            </Modal.Header>
            <Modal.Body>{<Tips />}</Modal.Body>
            <Modal.Footer>Information från Martin&Servera</Modal.Footer>
        </Modal>
    </>
};
export default Logbooks;