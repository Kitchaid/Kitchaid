import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Line,
} from "recharts";
import { getStats } from "../hooks/producerHooks/producerHooks";
import { getFoodWasteRecord } from "../hooks/foodWaste/foodWaste";
import { Col, Row } from "react-bootstrap";
import {
  getFoodWasteRecordByKitchen,
  getLunchStatsRecordByKitchen,
  getTotalFoodWasteRecordByKitchen,
  getAverageFoodWasteByKitchen,
  getAverageFoodWastePerGuest,
  getAverageFoodWastePerGuestByDay
} from "../hooks/admin/admin";
import { useQuery } from "react-query";
import Spinner from "../Partials/Spinner";

export function BarChartsLunchStats() {
  const { data: stats } = useQuery("getStats", getStats);
  const data = stats?.data.map((item, index) => {
    return {
      length: index,
      dishName: item.dishName,
      Användt_huvudvaror: item.usedMainIngredient,
      Gryta_Soppa_mängd: item.stewSoup,
      Användt_tillbehor: item.usedSideIngredient,
      Tallrikssvinn: item.foodWaste,
      unit: "Kilo",
    };
  });
  return (
    <>
      <div className="ms-auto chart">
        <BarChart
          layout="vertical"
          width={350}
          height={70 * data?.length}
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tick={false} orientation="top" />
          <YAxis dataKey="dishName" type="category" scale="band" />
          <Tooltip />
          <Bar dataKey="Tallrikssvinn" fill="#ff4800" />
          <Bar dataKey="Användt_huvudvaror" stackId="a" fill="#8884d8" />
          <Bar dataKey="Gryta_Soppa_mängd" stackId="a" fill="#006e28" />
          <Bar dataKey="Användt_tillbehor" stackId="a" fill="#007e88" />
        </BarChart>
      </div>
    </>
  );
}


export function BarChartsSvinn() {
  const { data: record } = useQuery("getFoodWasteRecord", getFoodWasteRecord);
  const data = record?.data.map((item, index) => {
    return {
      length: index,
      Datum: item.date,
      Kökssvinn: item.kitchenWaste,
      Serveringssvinn: item.serviceWaste,
      Tallrikssvinn: item.dishWaste,
      Specialkostssvinn: item.specialWaste,
      unit: "Kilo",
    };
  });
  return (
    <>
      <div className="ms-auto chart">
        <BarChart
          layout="vertical"
          width={350}
          height={70 * data?.length}
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tick={false} orientation="top" />
          <YAxis dataKey="Datum" type="category" scale="band" />
          <Tooltip />
          <Bar dataKey="Kökssvinn" fill="#ff4800" />
          <Bar dataKey="Serveringssvinn" stackId="a" fill="#8884d8" />
          <Bar dataKey="Tallrikssvinn" stackId="a" fill="#006e28" />
          <Bar dataKey="Specialkostssvinn" stackId="a" fill="#007e88" />
        </BarChart>
      </div>
    </>
  );
}

//Barcharts for data analyze for admin

export function BarChartsLunchStatsByKitchen(kitchenId) {
  const { data: statsByKitchen, error, isLoading } = useQuery(["getLunchStatsRecordByKitchen", kitchenId], () => getLunchStatsRecordByKitchen(kitchenId));
  // Error and Loading states
  if (error) return <div>Nånting gick fel</div>;
  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  const data = statsByKitchen?.data?.map((item, index) => {
    return {
      length: index,
      dishName: item.dishName,
      Användt_huvudvaror: item.usedMainIngredient,
      Gryta_Soppa_mängd: item.stewSoup,
      Användt_tillbehor: item.usedSideIngredient,
      Tallrikssvinn: item.foodWaste,
      unitMain: item.unitMain,
      unitSide: item.unitSide,
    };
  });

  return (
    <>
      <div className="m-auto w-75 overflow-scroll">

        <BarChart
          width={70 * data?.length}
          height={500}
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 20,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dishName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Tallrikssvinn" stackId="d" fill="#ff4800" />
          <Bar dataKey="Användt_huvudvaror" stackId="a" fill="#8884d8" />
          <Bar dataKey="Gryta_Soppa_mängd" stackId="b" fill="#006e28" />
          <Bar dataKey="Användt_tillbehor" stackId="c" fill="#007e88" />
        </BarChart>
      </div>
    </>
  );
}

export function BarChartsFoodWasteByKitchen(props) {
  let kitchenId = props.kitchenId
  let dateStart = props.dateStart
  let dateEnd = props.dateEnd
  const { data: recordByKitchen, error, isLoading } = useQuery(
    ["getFoodWasteRecordByKitchen", kitchenId, dateStart, dateEnd],
    () => getFoodWasteRecordByKitchen(kitchenId, dateStart, dateEnd)
  );
  // Error and Loading states
  if (error) return <div>Nånting gick fel</div>;
  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  const data = recordByKitchen?.data.map((item, index) => {
    let date = item.date.slice(0, 10)
    return {
      length: index,
      Datum: date,
      Kökssvinn: item.kitchenWaste,
      Serveringssvinn: item.serviceWaste,
      Tallrikssvinn: item.dishWaste,
      Specialkostssvinn: item.specialWaste,
      unit: "Kilo",
    };
  });
  return (
    <>
      <div className="m-auto w-75 overflow-scroll">
        <BarChart
          width={70 * data?.length}
          height={500}
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 20,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Datum" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Kökssvinn" fill="#ff4800" />
          <Bar dataKey="Serveringssvinn" stackId="a" fill="#8884d8" />
          <Bar dataKey="Tallrikssvinn" stackId="a" fill="#006e28" />
          <Bar dataKey="Specialkostssvinn" stackId="a" fill="#007e88" />
        </BarChart>
      </div>
    </>
  );
}
export function AverageFoodWastePerGuestByDay(props) {
  let kitchenId = props.kitchenId
  let dateStart = props.dateStart
  let dateEnd = props.dateEnd
  const { data: recordByKitchen, error, isLoading } = useQuery(
    ["getAverageFoodWastePerGuestByDay", kitchenId, dateStart, dateEnd],
    () => getAverageFoodWastePerGuestByDay(kitchenId, dateStart, dateEnd)
  );
  // Error and Loading states
  if (error) return <div>Nånting gick fel</div>;
  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  const data = recordByKitchen?.data?.map((item, index) => {
    let date = item.date.slice(0, 10)
    let averageByDay = Math.round(item.averageByDay * 1000)
    return {
      length: index,
      Datum: date,
      "Svinn per ätande": averageByDay,
      "Rätts namn": item.dishName
    };
  });
  return (
    <>
      <div className="m-auto w-75 overflow-scroll">
        <ComposedChart
          width={70 * data?.length}
          height={500}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Datum" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Svinn per ätande" fill="#0088FE" />
          <Bar dataKey="Rätts namn" fill="#0088FE" />
          <Line type="monotone" dataKey="Svinn per ätande" stroke="#ff7300" />
        </ComposedChart>
      </div>
    </>
  );
}


const COLORS = ['#0088FE', '#00C49F', '#8228ff', '#FE8052'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function TotalFoodWasteAsPieChart(props) {
  let kitchenId = props.kitchenId
  let dateStart = props.dateStart
  let dateEnd = props.dateEnd
  const { data: total } = useQuery(["getTotalFoodWasteRecordByKitchen", kitchenId, dateStart, dateEnd],
    () => getTotalFoodWasteRecordByKitchen(kitchenId, dateStart, dateEnd))
  const totalwaste = [
    { name: 'Totalt specialkostsvinn', value: (total?.data[0]?.totalSpecialWaste) },
    { name: 'Totalt talrikssvinn', value: (total?.data[0]?.totalDishWaste) },
    { name: 'Totalt köketssvinn', value: (total?.data[0]?.totalKitchenWaste) },
    { name: 'Totalt serveringssvinn', value: (total?.data[0]?.totalServiceWaste) },
  ]

  return (<>
    <Row>
      <Col>
        <p className="small d-inline-block">Specialkostsvinn: {total?.data[0]?.totalSpecialWaste} kg</p>
        <div className="pieChartColor1 d-inline-block ms-2"></div>
      </Col>
      <Col>
        <p className="small d-inline-block">Talrikssvinn: {total?.data[0]?.totalDishWaste} kg</p>
        <div className="pieChartColor2 d-inline-block ms-2"></div>
      </Col>
      <Col>
        <p className="small d-inline-block">Köketssvinn: {total?.data[0]?.totalKitchenWaste} kg</p>
        <div className="pieChartColor3 d-inline-block ms-2"></div>
      </Col>
      <Col>
        <p className="small d-inline-block">Serveringssvinn: {total?.data[0]?.totalServiceWaste} kg</p>
        <div className="pieChartColor4 d-inline-block ms-2"></div>
      </Col>
    </Row>
    <PieChart width={600} height={400} className="m-auto">
      <Pie
        data={totalwaste}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={150}
        fill="#8884d8"
        dataKey="value"
      >
        {totalwaste.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  </>
  );
}
export function AverageFoodWasteAsPieChart(props) {
  let kitchenId = props.kitchenId
  let dateStart = props.dateStart
  let dateEnd = props.dateEnd
  const { data: Average } = useQuery(["getAverageFoodWasteByKitchen", kitchenId, dateStart, dateEnd],
    () => getAverageFoodWasteByKitchen(kitchenId, dateStart, dateEnd))
  if (!Average) return undefined;
  const AverageWaste = [
    { name: 'specialkostsvinn', value: (Average?.data[0]?.avgSpecialWaste) },
    { name: 'talrikssvinn', value: (Average?.data[0]?.avgDishWaste) },
    { name: 'köketssvinn', value: (Average?.data[0]?.avgKitchenWaste) },
    { name: 'serveringssvinn', value: (Average?.data[0]?.avgServiceWaste) },
  ]

  return (<>
    <Row>
      <Col>
        <p className="small d-inline-block">Specialkostsvinn: {Math.round(Average?.data[0]?.avgSpecialWaste * 10) / 10} kg</p>
        <div className="pieChartColor1 d-inline-block ms-2"></div>
      </Col>
      <Col>
        <p className="small d-inline-block">Talrikssvinn: {Math.round(Average?.data[0]?.avgDishWaste * 10) / 10} kg</p>
        <div className="pieChartColor2 d-inline-block ms-2"></div>
      </Col>
      <Col>
        <p className="small d-inline-block">Köketssvinn: {Math.round(Average?.data[0]?.avgKitchenWaste * 10) / 10} kg</p>
        <div className="pieChartColor3 d-inline-block ms-2"></div>
      </Col>
      <Col>
        <p className="small d-inline-block">Serveringssvinn: {Math.round(Average?.data[0]?.avgServiceWaste * 10) / 10} kg</p>
        <div className="pieChartColor4 d-inline-block ms-2"></div>
      </Col>
    </Row>
    <PieChart width={600} height={400} className="m-auto">
      <Pie
        data={AverageWaste}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={150}
        fill="#8884d8"
        dataKey="value"
      >
        {AverageWaste.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  </>
  );
}
export function AverageFoodWastePerGuestAsPieChart(props) {
  let kitchenId = props.kitchenId
  let dateStart = props.dateStart
  let dateEnd = props.dateEnd
  const { data: Average } = useQuery(["getAverageFoodWastePerGuest", kitchenId, dateStart, dateEnd],
    () => getAverageFoodWastePerGuest(kitchenId, dateStart, dateEnd))
  if (!Average) return undefined;
  const AverageWaste = [
    { name: 'specialkostsvinn', value: (Average?.data[0]?.avgSpecialWaste) },
    { name: 'talrikssvinn', value: (Average?.data[0]?.avgDishWaste) },
    { name: 'köketssvinn', value: (Average?.data[0]?.avgKitchenWaste) },
    { name: 'serveringssvinn', value: (Average?.data[0]?.avgServiceWaste) },
  ]

  return (<>
    <Row>
      <Col>
        <p className="small d-inline-block">Specialkostsvinn: {Math.round(Average?.data[0]?.avgSpecialWaste * 10) / 10} kg</p>
        <div className="pieChartColor1 d-inline-block ms-2"></div>
      </Col>
      <Col>
        <p className="small d-inline-block">Talrikssvinn: {Math.round(Average?.data[0]?.avgDishWaste * 10) / 10} kg</p>
        <div className="pieChartColor2 d-inline-block ms-2"></div>
      </Col>
      <Col>
        <p className="small d-inline-block">Köketssvinn: {Math.round(Average?.data[0]?.avgKitchenWaste * 10) / 10} kg</p>
        <div className="pieChartColor3 d-inline-block ms-2"></div>
      </Col>
      <Col>
        <p className="small d-inline-block">Serveringssvinn: {Math.round(Average?.data[0]?.avgServiceWaste * 10) / 10} kg</p>
        <div className="pieChartColor4 d-inline-block ms-2"></div>
      </Col>
    </Row>
    <Row>
      <p className="small">Genomsnitt gäster mängd {Math.round(Average?.data[0]?.avgGuests)}</p>
    </Row>
    <PieChart width={600} height={600} className="m-auto">
      <Pie
        data={AverageWaste}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={180}
        fill="#8884d8"
        dataKey="value"
      >
        {AverageWaste.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  </>
  );
}