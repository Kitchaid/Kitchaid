/* eslint-disable react/prop-types */
import React from "react";
import { getQuantityTemplateByName } from '../../../../../hooks/plan/workPlanHooks'
import { useQuery } from "react-query";


const TemplateTable = (props) => {
    const dishName = props.dishName
    const { data: QuantityTemplate } = useQuery(
        ['getQuantityTemplate', dishName], () => getQuantityTemplateByName(dishName)
    );
    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Mängd mallen</th>
                        <th scope="col">Huvudkomponent</th>
                        <th scope="col">Mängd (enhet)</th>
                        <th scope="col">Container</th>
                        <th scope="col">Tillbehör</th>
                        <th scope="col">Mängd (enhet)</th>
                        <th scope="col">Container</th>
                    </tr>
                </thead>
                <tbody>
                    {QuantityTemplate?.data?.map((item, index) => {
                        return <>
                            <tr key={index+item.dishName}>
                                <th scope="row"></th>
                                <td>{item.dishName}</td>
                                <td>{item.main.mainComponent}</td>
                                <td>{item.main.mainQuantity} ({item.main.unitMain})</td>
                                <td>{item.main.containerMainName}
                                    <div className="image_thumbnail">
                                        <img width="400" src={item.main.mainContainer} alt="container"></img>
                                    </div>
                                </td>
                                <td>{item.side.sideComponent}</td>
                                <td>{item.side.sideQuantity} ({item.side.unitSide})</td>
                                <td>{item.side.containerSideName}
                                    <div className="image_thumbnail">
                                        <img width="400" src={item.side.sideContainer} alt="container"></img>
                                    </div>
                                </td>
                            </tr>
                        </>
                    })}
                </tbody>
            </table>
        </div>
    );
};
export default TemplateTable;