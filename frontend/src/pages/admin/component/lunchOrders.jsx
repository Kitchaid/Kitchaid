import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Table, Form, Button } from 'react-bootstrap';
import { useCreateLunchOrder, useFetchLunchOrdersAdmin } from '../../../hooks/foodOrders/lunchOrders'
import weekNumberData from '../../../Partials/week'
import Spinner from '../../../Partials/Spinner';
const CreateLunchOrderForm = () => {
    const { control, handleSubmit, setValue } = useForm();
    const createLunchOrder = useCreateLunchOrder();
    const [weekNumber, setWeekNumber] = useState(1);
    const { data: lunchOrders, isLoading } = useFetchLunchOrdersAdmin({ weekNumber });
    const onSubmit = (data) => {
        const orders = [];

        // Prepare orders for each alternative and weekday
        for (let alt = 1; alt <= 2; alt++) {
            for (let day = 1; day <= 5; day++) {
                const key = `alt${alt}_day${day}`;
                if (data[key] > 0) {  // Only add if the amount is greater than 0
                    orders.push({
                        alt: alt,
                        amount: data[key],
                        weekDay: day,
                    });
                }
            }
        }

        orders.forEach((order) => {
            createLunchOrder.mutate({
                orders: {
                    weekOfYear: weekNumber, // Example week number
                    //   dishId: order.alt === 'alt 1' ? 'dish1' : 'dish2', // Replace with actual dish IDs
                    amount: order.amount,
                    weekDay: order.weekDay,
                    alt: order.alt,
                },
            });
        });
    };
    React.useEffect(() => {
        if (lunchOrders) {
            // Prefill the form with fetched data
            lunchOrders.forEach(order => {
                const alt = order.alt === 'alt 1' ? 1 : 2;
                const day = order.weekDay;
                const key = `alt${alt}_day${day}`;
                setValue(key, order.amount);
            });
        }
    }, [lunchOrders, setValue]);

    if (isLoading) {
        return <Spinner animation="border" />;
    }
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <div className=" formFrame">
                <select
                    name="weekOfYear"
                    className="form-select"
                    onChange={(e) => setWeekNumber(e.target.value)}
                >
                    <option value={""}>Välj vecka</option>
                    {weekNumberData.map((week, index) => {
                        return (<>
                            <option key={index} value={week}>
                                {week}
                            </option></>
                        );
                    })}
                </select>
            </div>
            <Table bordered hover>
                <thead className='text-light'>
                    <tr>
                        <th></th>
                        {['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag'].map((day, index) => (
                            <th key={index}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className='text-light'>
                    {[1, 2].map((alt) => (
                        <tr key={alt}>
                            <td>{`Alt ${alt}`}</td>
                            {Array.from({ length: 5 }).map((_, dayIndex) => (
                                <td key={dayIndex}>
                                    <Controller
                                        name={`alt${alt}_day${dayIndex + 1}`} // Unique name for each alt and day combination
                                        control={control}
                                        defaultValue={0}
                                        render={({ field }) => (
                                            <Form.Control
                                                {...field}
                                                type="number"
                                                min={0}
                                                placeholder="Amount"
                                            />
                                        )}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button type="submit" variant="primary">Create Lunch Orders</Button>
        </Form>
    );
};

export default CreateLunchOrderForm;
