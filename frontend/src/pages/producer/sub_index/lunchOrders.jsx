import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Table, Form, Row, Col } from 'react-bootstrap';
import { useCreateMultiLunchOrder, useFetchLunchOrdersAdmin, useUpdateLunchOrders, useDeleteLunchOrders } from '../../../hooks/foodOrders/lunchOrders';
import { useQuery } from 'react-query';
import { getSubKitchenId } from '../../../hooks/producerHooks/producerHooks';
import weekNumberData from '../../../Partials/week';
import Spinner from '../../../Partials/Spinner';
import { toast } from 'react-toastify';

const CreateLunchOrderForm = () => {
    const { control, handleSubmit, setValue, reset, getValues } = useForm();
    const createLunchOrder = useCreateMultiLunchOrder();
    const updateLunchOrders = useUpdateLunchOrders();
    const deleteLunchOrders = useDeleteLunchOrders(); // Initialize hook for deleting orders
    const [weekNumber, setWeekNumber] = useState();
    const [group, setGroup] = useState("");
    const [tillbehorValues, setTillbehorValues] = useState({});

    const { data: allUsers, isLoading: isLoadingUsers } = useQuery("allUser", getSubKitchenId);
    const { data: lunchOrders, isLoading: isLoadingOrders } = useFetchLunchOrdersAdmin({ weekNumber });
    const onSubmit = (data) => {
        const orders = [];
        users.forEach((user) => {
            for (let alt = 1; alt <= 3; alt++) {
                for (let day = 1; day <= 5; day++) {
                    const key = `${user._id}_alt${alt}_day${day}`;
                    if (data[key] > 0) {  // Only add if the amount is greater than 0
                        orders.push({
                            userId: user._id,
                            weekOfYear: weekNumber,
                            amount: data[key],
                            weekDay: day,
                            alt: alt,
                        });
                    }
                }
            }
        });
        if (weekNumber === undefined) {
            toast('Välj vecka först!');
            return;
        }

        if (lunchOrders.length > 0) {
            return
        } else {
            createLunchOrder.mutate({ orders });
        }
    };

    useEffect(() => {
        reset(); // Clear form values

        if (lunchOrders) {
            // Prefill the form with fetched data for each user
            lunchOrders?.forEach(userOrder => {
                userOrder.alts.forEach(altOrder => {
                    altOrder.lunchOrders.forEach(lunchOrder => {
                        const key = `${userOrder._id.user}_alt${altOrder.alt}_day${lunchOrder.weekDay}`;
                        setValue(key, lunchOrder.amount); // Set value for the respective alt and weekDay
                    });
                });
            });
        }
    }, [lunchOrders, setValue, reset]);

    if (isLoadingOrders || isLoadingUsers) {
        return <Spinner animation="border" />;
    }

    const users = allUsers?.data.map((user) => ({
        _id: user._id,
        username: user.username,
        group: user.group
    })) || [];
    const handleUpdate = (userId, weekNumber) => {
        if (!lunchOrders.length) {
            toast('Vänligen beställ först!');
            return;
        }

        const updatedOrders = [];
        const newOrders = [];

        // Iterate over alt (1 and 2) and week days (1 to 5) to capture all the updated values
        for (let alt = 1; alt <= 3; alt++) {
            for (let day = 1; day <= 5; day++) {
                const key = `${userId}_alt${alt}_day${day}`;
                const amount = getValues(key);

                if (amount >= 0) { // Only process if the amount is greater than or equal 0
                    // Find the matching order for the specific user and then filter by alt and weekDay
                    const existingUserOrder = lunchOrders.find(order =>
                        String(order._id.user) === String(userId) // Ensure it's for the correct user
                    );

                    if (existingUserOrder) {
                        // Find the matching alt and lunchOrder for that user
                        const existingAltOrder = existingUserOrder.alts?.find(altOrder => altOrder.alt === alt);
                        const existingLunchOrder = existingAltOrder?.lunchOrders?.find(lunchOrder => lunchOrder.weekDay === day);

                        if (existingLunchOrder) {
                            // If an existing lunchOrder is found, we update it
                            updatedOrders.push({
                                _id: existingLunchOrder._id,  // Use the _id to target the specific document
                                weekDay: parseInt(day),
                                alt: parseInt(alt),
                                amount: parseInt(amount)
                            });
                        } else {
                            // If no existing lunchOrder for this alt and weekDay, create a new one
                            newOrders.push({
                                weekDay: parseInt(day),
                                alt: parseInt(alt),
                                amount: parseInt(amount)
                            });
                        }
                    } else {
                        // If no existing order for this user, create a new one
                        newOrders.push({
                            weekDay: parseInt(day),
                            alt: parseInt(alt),
                            amount: parseInt(amount)
                        });
                    }
                }
            }
        }


        if (updatedOrders.length > 0) {
            console.log('Updating existing lunchOrders:', updatedOrders); // Log updated orders
            updateLunchOrders.mutate({ userId, weekNumber, lunchOrders: updatedOrders });
        }

        if (newOrders.length > 0) {
            console.log('Creating new lunchOrders:', newOrders); // Log new orders to create
            createLunchOrder.mutate({
                orders: newOrders.map(order => ({
                    userId,
                    weekOfYear: weekNumber,
                    ...order
                }))
            });
        }

        if (updatedOrders.length === 0 && newOrders.length === 0) {
            console.log('No changes to update or create for this user.');
            toast('Ingen ändring hittades.');
        }
    };

    const handleDelete = (userId, weekNumber) => {
        if (window.confirm('Are you sure you want to delete this user\'s orders?')) {
            deleteLunchOrders.mutate({ userId, weekNumber });
        }
    };

    return (
        <>
            <div className="m-auto formFrame">
                <Row className='d-flex'>
                    <Form.Select
                        className='w-75 m-auto'
                        value={weekNumber}
                        onChange={(e) => setWeekNumber(Number(e.target.value))}>
                        <option value={""}>Välj vecka</option>
                        {weekNumberData.map((week, index) => (
                            <option key={index} value={week}>{week}</option>
                        ))}
                    </Form.Select>
                    <button className='stats_card w-75 m-auto mt-3' onClick={() => setGroup('junior')}>Skolan/Förskolan</button>
                    <button className='stats_card w-75 m-auto mt-3' onClick={() => setGroup('senior')}>Äldreomsory</button>
                </Row>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {users
                    .filter(user => user.group === group) // Only display users based on the selected group
                    .map((user, userIndex) => (
                        <div key={userIndex}>
                            <Row>
                                <Col sm={10}>
                                    <h5 className='font-size-xs text-light'>{user.username}</h5>
                                </Col>
                                <Col sm={2} className="m-auto">
                                    <i
                                        className="fa-solid fa-file-pen glow me-3 text-light"
                                        onClick={() => handleUpdate(user._id, weekNumber)}
                                    ></i>
                                    <span onClick={() => handleDelete(user._id, weekNumber)}>
                                        <i className="fa-solid fa-trash-can glow text-light"></i>
                                    </span>
                                </Col>
                            </Row>
                            <Table hover>
                                <thead className="text-light">
                                    <tr>
                                        <th></th>
                                        {['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag'].map((day, index) => (
                                            <th key={index}>{day}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="text-light">
                                    {[1, 2, 3].map((alt, index, arr) => (
                                        <tr key={alt}>
                                            <td>{index === arr.length - 1 ? 'Tillbehör' : `Alt ${alt}`}</td>
                                            {Array.from({ length: 5 }).map((_, dayIndex) => {
                                                const day = dayIndex + 1;
                                                const alt1Key = `${user._id}_alt1_day${day}`;
                                                const alt2Key = `${user._id}_alt2_day${day}`;
                                                const tillbehorKey = `${user._id}_alt3_day${day}`;

                                                // Handle the calculation of Tillbehör (Alt 1 + Alt 2)
                                                const handleAltChange = () => {
                                                    const alt1Value = Number(getValues(alt1Key) || 0);
                                                    const alt2Value = Number(getValues(alt2Key) || 0);
                                                    const sum = alt1Value + alt2Value;

                                                    // Update the state for "Tillbehör"
                                                    setTillbehorValues((prevState) => ({
                                                        ...prevState,
                                                        [`${user._id}_alt3_day${day}`]: sum,
                                                    }));

                                                    // Set the value for Tillbehör in react-hook-form
                                                    setValue(tillbehorKey, sum);
                                                };

                                                return (
                                                    <td key={dayIndex}>
                                                        {index === arr.length - 1 ? (
                                                            <Controller
                                                                name={tillbehorKey}
                                                                control={control}
                                                                value={tillbehorValues[tillbehorKey] || 0}  // Use value instead of defaultValue
                                                                render={({ field }) => (
                                                                    <Form.Control
                                                                        {...field}
                                                                        type="number"
                                                                        min={0}
                                                                        placeholder="Tillbehör"
                                                                        onBlur={(e) => {
                                                                            field.onChange(e); // Allow editing of Tillbehör
                                                                            setTillbehorValues((prevState) => ({
                                                                                ...prevState,
                                                                                [`${user._id}_alt3_day${day}`]: e.target.value,
                                                                            }));
                                                                        }}
                                                                    />
                                                                )}
                                                            />
                                                        ) : (
                                                            <Controller
                                                                name={`${user._id}_alt${alt}_day${day}`}
                                                                control={control}
                                                                defaultValue={0}
                                                                render={({ field }) => (
                                                                    <Form.Control
                                                                        {...field}
                                                                        type="number"
                                                                        min={0}
                                                                        placeholder="Amount"
                                                                        onChange={(e) => {
                                                                            field.onChange(e);
                                                                            handleAltChange();
                                                                        }}
                                                                    />
                                                                )}
                                                            />
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}

                                </tbody>


                            </Table>
                        </div>
                    ))
                }

                <button type="submit" className="mainButton p-1 text-light" variant="primary">Beställ</button>
            </Form>

        </>
    );
};

export default CreateLunchOrderForm;
