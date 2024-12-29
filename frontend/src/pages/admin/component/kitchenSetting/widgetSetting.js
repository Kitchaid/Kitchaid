import React, { useState, useEffect } from "react";
import { Col, Row } from 'react-bootstrap'
import { useQuery } from "react-query";
import { getKitchenFunctionContentForAdmin } from '../../../../hooks/admin/admin'

const WidgetSetting = ({ widgetdata, id }) => {
    const { data: contentSetting } = useQuery(
        ['getKitchenFunctionContentForAdmin', id],
        () => getKitchenFunctionContentForAdmin(id))
    const [switchValues, setSwitchValues] = useState();
    useEffect(() => {
        const data = contentSetting?.data ? contentSetting?.data : [];
        setSwitchValues(
            Object.keys(data).map(key => ({
                key: key,
                value: data[key]
            })))
    }, [contentSetting])
    const handleCheckboxChange = (index) => {
        const updatedData = switchValues.map((item, i) => {
            if (i === index) {
                return { ...item, value: !item.value };
            }
            return item;
        });
        setSwitchValues(updatedData)
    };

    widgetdata(switchValues)

    return (
        <>
            {switchValues?.map((item, index) => {
                const widgetName = () => {
                    if (item.key === 'lunchStatistik') { return "Lunch Statistik" }
                    if (item.key === 'lunchIngredients') { return "Rätts innehåll" }
                    if (item.key === 'weekPlan') { return "Veckoplan" }
                    if (item.key === 'whiteBoard') { return "White board" }
                    if (item.key === 'orderRoutine') { return "Beställnings rutin" }
                    if (item.key === 'kitchenRoutine') { return "Köks rutin" }
                    if (item.key === 'foodWaste') { return "Mat svinn" }
                    if (item.key === 'vikParm') { return "Vikarie Pärm" }
                    if (item.key === 'lunchStatistikReceiver') { return "Mottagningsköks Statistik" }
                    if (item.key === 'special_production') { return "Special kost" }
                }
                if (
                    item.key === 'monday' ||
                    item.key === 'tuesday' ||
                    item.key === 'wednesday' ||
                    item.key === 'thursday' ||
                    item.key === 'friday' ||
                    item.key === 'saturday' ||
                    item.key === 'sunday' ||
                    item.key === 'createAt'

                ) { return <div className='d-none' key={index}></div> }
                return <>
                    <Row className="mb-3">
                        <Col xs={10}><span>{widgetName()}</span></Col>
                        <Col xs={2}><input
                            type="checkbox"
                            key={index}
                            name={widgetName()}
                            checked={item.value}
                            onChange={() => handleCheckboxChange(index)}
                        /></Col>
                    </Row>
                    <hr></hr>
                </>
            })}
            <Row className="bg-light p-2">
                <span>Arbets dag på enheten</span>
            </Row>
            <hr></hr>
            {switchValues?.map((item, index) => {
                if (
                    item.key !== 'monday' &
                    item.key !== 'tuesday' &
                    item.key !== 'wednesday' &
                    item.key !== 'thursday' &
                    item.key !== 'friday' &
                    item.key !== 'saturday' &
                    item.key !== 'sunday'

                ) { return <div className='d-none' key={index}></div> }
                const widgetName = () => {
                    if (item.key === 'monday') { return "Måndag" }
                    if (item.key === 'tuesday') { return "Tisdag" }
                    if (item.key === 'wednesday') { return "Onsdag" }
                    if (item.key === 'thursday') { return "Torsdag" }
                    if (item.key === 'friday') { return "Fredag" }
                    if (item.key === 'saturday') { return "Lördag" }
                    if (item.key === 'sunday') { return "Söndag" }
                }

                return <>
                    <Row className="mb-3">
                        <Col xs={10}><span>{widgetName()}</span></Col>
                        <Col xs={2}><input
                            type="checkbox"
                            key={index}
                            name={widgetName()}
                            checked={item.value}
                            onChange={() => handleCheckboxChange(index)}
                        /></Col>
                    </Row>
                    <hr></hr>
                </>
            })}
        </>
    )
};

export default WidgetSetting;