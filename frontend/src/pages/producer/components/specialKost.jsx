import React, { useState, useRef, useEffect } from "react";
import {
    fetchSpecialkostByFilter,
    fetchDefaultTypeByFilter,
} from "../../../hooks/producerHooks/producerHooks";
import { AllergicTypes, AllergicTypesUpdate, AllergicTypesUpdateSenior } from './specialkostComponents/allergicTypes'
import { Table } from "./specialkostComponents/table";
import { Modal, Button, Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { useReactToPrint } from "react-to-print";
import Spinner from "../../../Partials/Spinner";

export default function SpecialFood() {
    /* ======================= MODAL ====================*/
    //specialkost modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //specialkost senior modal
    const [showSenior, setShowSenior] = useState(false);
    const handleCloseSenior = () => setShowSenior(false);
    const handleShowSenior = () => setShowSenior(true);
    //specialkost user default filter junior & senior
    const [showDefaultFilter, setShowDefaultFilter] = useState(false);
    const handleCloseDefaultFilter = () => setShowDefaultFilter(false);
    const handleShowDefaultFilter = () => setShowDefaultFilter(true);
    //specialkost user default filter junior & senior
    const [showDefaultFilterSenior, setShowDefaultFilterSenior] = useState(false);
    const handleCloseDefaultFilterSenior = () => setShowDefaultFilterSenior(false);
    const handleShowDefaultFilterSenior = () => setShowDefaultFilterSenior(true);
    const [allergicTypes, setAllergicTypes] = useState([])

    /* ======================= FETCH DATA ==================== */
    const { data: defaultFilter, isLoading } = useQuery("defaultTypeByFilter", fetchDefaultTypeByFilter);
    const initFilter = defaultFilter?.data?.Special_Filter;
    const [chosenTypesFilterJunior, setChosenTypesFilterJunior] = useState([]);
    const [chosenTypesFilterSenior, setChosenTypesFilterSenior] = useState([]);
    const initFilterTypeJunior = initFilter ? initFilter[0]?.special_filter_junior : [];
    const initFilterTypeSenior = initFilter ? initFilter[0]?.special_filter_senior : [];
    useEffect(() => {
        setChosenTypesFilterJunior(initFilterTypeJunior);
        setChosenTypesFilterSenior(initFilterTypeSenior);
    }, [initFilterTypeJunior, initFilterTypeSenior])

    // set group & part
    const [group, setGroup] = useState('');
    const [part, setPart] = useState('');
    // get special
    //get allergic types from selected dishes
    const AllergicTypesFromDishes = (allergic) => {
        setAllergicTypes(allergic)
    }
    // Helper function to combine arrays, flatten, and remove duplicates
    const combineAndRemoveDuplicates = (arr1, arr2) => {
        // Concatenate the two arrays and flatten them
        const combinedArray = [...arr1, ...arr2].flat();

        // Remove duplicates using Set
        const uniqueArray = [...new Set(combinedArray)];

        return uniqueArray;
    };
    // Function to define the filter object
    const filter = () => {
        if (show === true) {
            return chosenTypesFilterJunior;
        }
        if (showSenior === true) {
            return chosenTypesFilterSenior;
        }
        return [];
    };

    // Combine allergicArray with the chosenTypesFilterJunior or chosenTypesFilterSenior
    // const chosenTypesFilter = filter();  // Either chosenTypesFilterJunior or chosenTypesFilterSenior
    const combinedAllergicArray = combineAndRemoveDuplicates(allergicTypes, filter());  // Concatenate and clean up

    // Include allergicArray in the filter
    const filterArray = {
        group: group,
        filter: combinedAllergicArray,  // Use the combined and deduplicated array here
        part: part
    };

    // Fetch data using the filter with the updated allergicArray
    const { data: special } = useQuery(
        ["getSpecial", filterArray],
        () => fetchSpecialkostByFilter(filterArray)
    );

    function Special() {
        return special?.data?.filter(user => user.isActived === true)
            .sort((a, b) => a.username.localeCompare(b.username));
    }
    /* ======================= Components ====================*/
    const renderTypes = (chosenType) => { setChosenTypesFilterJunior(chosenType) }
    const renderTypesSenior = (chosenType) => { setChosenTypesFilterSenior(chosenType) }

    /* ======================= PRINT ====================*/
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef?.current,
        documentTitle: "Lunch statistik -- Kitchaid",
    });
    const getPageMargins = () => {
        return `@page { margin: 0mm 10mm 0 20mm !important; }`;
    };
    if (isLoading) {
        return <div>{<Spinner />}</div>;
    }
    return (
        <>
            <button
                className="stats_card mt-5 mb-5"
                onClick={() => { setGroup('junior'); handleShow() }}
            >
                <span className="small">Specialkost Skolan/Förskolan</span>
            </button>
            <button
                className="stats_card mt-5 mb-5"
                onClick={() => { setGroup("senior"); handleShowSenior() }}
            >
                <span className="small">Specialkost Äldreomsorg/Matlåda</span>
            </button>
            {/*show specialkost skolan*/}
            <Modal show={show} onHide={handleClose} fullscreen={true}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Row>
                            <Col xs={8}>
                                Dagens specialkost list
                            </Col>
                            <Col xs={4} className='d-flex'>
                                <Button
                                    className="stats_card "
                                    onClick={() => { setPart('Skolan') }}
                                >
                                    <span className="small">Skolan</span>
                                </Button>
                                <Button
                                    className="stats_card ms-2"
                                    onClick={() => { setPart("Förskolan") }}
                                >
                                    <span className="small">Förskolan</span>
                                </Button>
                                <Button
                                    className="stats_card ms-2"
                                    onClick={() => { setPart('') }}
                                >
                                    <span className="small">Skolan/Förskolan</span>
                                </Button>
                            </Col>
                        </Row>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mb-3">
                        <Col xs={10}><span>Allergi mot:</span></Col>
                        <Col xs={2}>
                            <span className="font-size-xs">Standardfilter</span>
                            <i className="fa-solid fa-arrow-down-short-wide fa-fade glow ms-2 cursor"
                                onClick={handleShowDefaultFilter}
                            ></i>
                        </Col>
                    </Row>
                    <div className="special-type-group font-size-s">
                        <AllergicTypes renderTypes={renderTypes} defaultTypes={initFilterTypeJunior} allergicTypes={allergicTypes} />
                    </div>
                    <div ref={componentRef}>
                        <style>{getPageMargins()}</style>
                        <Table Special={Special()} filterArray={filterArray} AllergicTypesFromDishes={AllergicTypesFromDishes} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div onClick={handlePrint}>
                        <i className="fa-solid fa-print glow"></i>
                        <span className="cursor"> Utskriv list</span>
                    </div>
                </Modal.Footer>
            </Modal>
            {/*show specialkost senior*/}
            <Modal show={showSenior} onHide={handleCloseSenior} fullscreen={true}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Row>
                            <Col xs={8}>
                                Dagens specialkost list
                            </Col>
                            <Col xs={4} className='d-flex'>
                                <Button
                                    className="stats_card "
                                    onClick={() => { setPart('Äldreomsorg') }}
                                >
                                    <span className="small">Äldreomsorg</span>
                                </Button>
                                <Button
                                    className="stats_card ms-2"
                                    onClick={() => { setPart("Matlåda") }}
                                >
                                    <span className="small">Matlåda</span>
                                </Button>
                            </Col>
                        </Row>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mb-3">
                        <Col xs={10}><span>Allergi mot:</span></Col>
                        <Col xs={2}>
                            <span className="font-size-xs">Standardfilter</span>
                            <i className="fa-solid fa-arrow-down-short-wide fa-fade glow ms-2 cursor"
                                onClick={handleShowDefaultFilterSenior}
                            ></i>
                        </Col>
                    </Row>
                    <div className="special-type-group font-size-s">
                        <AllergicTypes renderTypes={renderTypesSenior} defaultTypes={initFilterTypeSenior} allergicTypes={allergicTypes} />
                    </div>
                    <div ref={componentRef}>
                        <style>{getPageMargins()}</style>
                        <Table Special={Special} filterArray={filterArray} AllergicTypesFromDishes={AllergicTypesFromDishes} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div onClick={handlePrint}>
                        <i className="fa-solid fa-print glow"></i>
                        <span className="cursor"> Utskriv list</span>
                    </div>
                </Modal.Footer>
                {/* update one*/}
            </Modal>
            {/*Specialkost user default filter junior setting */}
            <Modal show={showDefaultFilter} onHide={handleCloseDefaultFilter}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Standardfilter
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>Allergi mot:</span>
                    <AllergicTypesUpdate defaultTypes={{ initFilterTypeJunior, initFilterTypeSenior }} />
                </Modal.Body>
            </Modal>
            {/*Specialkost user default filter senior setting */}
            <Modal show={showDefaultFilterSenior} onHide={handleCloseDefaultFilterSenior}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Standardfilter
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>Allergi mot:</span>
                    <AllergicTypesUpdateSenior defaultTypes={{ initFilterTypeJunior, initFilterTypeSenior }} />
                </Modal.Body>
            </Modal>
        </>
    );
}