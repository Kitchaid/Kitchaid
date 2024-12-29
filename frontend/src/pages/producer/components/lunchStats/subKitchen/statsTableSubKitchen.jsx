/* eslint-disable react/prop-types */
import React, { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { DeleteOneStat, getSideStat, getSideTemplate } from "../../../../../hooks/producerHooks/producerHooks";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getSubKitchenStats } from "../../../../../hooks/producerHooks/producerHooks";
import { toast } from "react-toastify";

function StatsTable(props) {
  const dishName = props.props;
  const [smShow, setSmShow] = useState(false);
  const [guestAmount, setGuestAmount] = useState();
  const [sideIngredientName, setSideIngredientName] = useState("");
  const [purchasedSide, setPurchasedSide] = useState();
  const [usedSideIngredient, setUsedSideIngredient] = useState();
  const [remainInStockSide, setRemainInStockSide] = useState();
  const [unitSide, setUnitSide] = useState("");
  const [foodWaste, setFoodWaste] = useState();
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  //fetch record
  const params = {
    dishName: dishName,
    guestAmount: guestAmount,
    kitchenId: props.kitchenId
  }
  //get specific item id and pass it to update page
  const handelUpdate = (id) => {
    if (id === undefined) { toast('Välj köket först'); return }
    else { navigate(`/statsUpdateReceiver/${id}`, { state: { id: id, props: record } }) }

  };
  //get subKitchen's stats record
  const { data: subStats } = useQuery(
    ["getSubKitchenStats", params], () => getSubKitchenStats(params),
    // { refetchInterval: 1000 }
  );
  const record = subStats?.data[0]
  //get side record
  const paramsSide = { id: record?._id, sideIngredient: sideIngredientName }
  const { data: getSideData } = useQuery(["getSideStat", paramsSide], () => getSideStat(paramsSide));
  const { data: SideTemplate } = useQuery("getSideTemplate", () => getSideTemplate());
  useEffect(() => {
    setPurchasedSide(getSideData?.data[0]?.sides?.purchasedSide)
    setUsedSideIngredient(getSideData?.data[0]?.sides?.usedSideIngredient)
    setRemainInStockSide(getSideData?.data[0]?.sides?.remainInStockSide)
    setUnitSide(getSideData?.data[0]?.sides?.unitSide)
    setFoodWaste(getSideData?.data[0]?.sides?.foodWaste)
    setComment(getSideData?.data[0]?.sides?.comment)
  }, [getSideData])
  const renderSide = () => {
    return <>
      <tr>
        <th scope="row"></th>
        <td>Mottagen</td>
        <td>{purchasedSide}</td>
        <td>{unitSide}</td>
      </tr>
      <tr>
        <th scope="row"></th>
        <td>Uppäten</td>
        <td>{usedSideIngredient === 0.01 ? "" : usedSideIngredient}</td>
        <td>{unitSide}</td>
      </tr>
      <tr>
        <th scope="row"></th>
        <td>Kvar</td>
        <td>{remainInStockSide}</td>
        <td>{unitSide}</td>
      </tr>
      <tr>
        <th scope="row"></th>
        <td>Tallrikssvinn</td>
        <td>{foodWaste}</td>
        <td>Kilo</td>
      </tr>
      <tr>
        <th scope="col"></th>
        <th scope="col">Kommentar</th>
        <td colSpan="3">{comment}</td>
      </tr>
    </>
  }
  //render update button
  const renderUpdateButton = () => {
    if (props.isAdmin) { return <div></div> }
    else {
      return <>
        <Button
          variant="warning"
          className="statsDeleteButton"
          onClick={() => handelUpdate(record?._id)}
        >
          Uppdatera
        </Button>
      </>
    }
  }
  //render guestAmount
  const renderGuest = () => {
    const amountArray = [];
    subStats?.data?.map((dish) => amountArray.push(dish.guestAmount))
    return <>
      <select className="w-100" name="guestAmount" onChange={(e) => { setGuestAmount(e.target.value) }}>
        {amountArray.map((item, index) => (
          <option value={item} key={index}>{item}</option>
        ))}
      </select>
    </>
  }
  //delete one
  const { mutate } = DeleteOneStat();
  //print out record
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef?.current,
    documentTitle: "Lunch statistik -- Kitchaid",
  });
  const getPageMargins = () => {
    return `@page { margin: 25mm 50mm 0 50mm !important; }`;
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          <span>{dishName}</span>
          <div className="printForm" onClick={handlePrint}>
            <i className="fa-solid fa-print glow ms-5"></i>
            <span> Utskriv rekord</span>
          </div>
        </Modal.Title>
      </Modal.Header>
      <div ref={componentRef}>
        <style>{getPageMargins()}</style>
        <Modal.Body>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Rättens namn</th>
                <th scope="col">Ätande matsal</th>
                <th scope="col">Enhet</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row"></th>
                <td><span className="font-size-s">{record?.dishName}</span></td>
                {renderGuest()}
                <td>Pers</td>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Huvudvaror</th>
                <th scope="col" colSpan={3}>Huvudkryddor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="col"></th>
                <th scope="col">{record?.mainIngredient}</th>
                <th scope="col" colSpan={3}>{record?.mainSpices}</th>
              </tr>
              <tr>
                <th scope="row"></th>
                <td>inköpta</td>
                <td>{record?.purchasedMainIngredient}</td>
                <td>{record?.unitMain}</td>
              </tr>
              <tr>
                <th scope="row"></th>
                <td>Användt</td>
                <td>{record?.usedMainIngredient}</td>
                <td>{record?.unitMain}</td>
              </tr>
              <tr>
                <th scope="row"></th>
                <td>Kvar</td>
                <td>{record?.remainInStockMain}</td>
                <td>{record?.unitMain}</td>
              </tr>
              <tr>
                <th scope="col"></th>
                <th scope="col" colSpan={3}>Gryta/Soppa/Sås</th>
              </tr>
              <tr>
                <th scope="row"></th>
                <td>Lagad mängd</td>
                <td>{record?.stewSoup}</td>
                <td>Liter</td>
              </tr>
              <tr>
                <th scope="row"></th>
                <td>Kvar</td>
                <td>{record?.stewSoupLeft}</td>
                <td>Liter</td>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Tillbehör</th>
                <th scope="col">
                  <select
                    className="w-100"
                    name="sideIngredient"
                    onChange={(e) => setSideIngredientName(e.target.value)}
                  >
                    <option selected disabled>Välj tillbehör...</option>
                    {SideTemplate?.data[0]?.side.map((item, index) => {
                      return <>
                        <option
                          defaultValue={item.sideIngredient}
                          value={item.sideIngredient}
                          key={index}
                        >{item.sideIngredient}
                        </option>
                      </>
                    })}
                  </select>
                </th>
              </tr>
            </thead>
            <tbody>
              {renderSide()}
            </tbody>
          </table>
        </Modal.Body>
      </div>
      <Modal.Footer>
        <Button
          variant="danger"
          className="statsDeleteButton"
          onClick={() => { setSmShow(true); }}
        >
          Radera
        </Button>
        {renderUpdateButton()}
      </Modal.Footer>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Är du säker att radera rekord?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            variant="danger"
            className="statsDeleteButton"
            onClick={() => { mutate(record?._id); setSmShow(false) }}
          >
            Radera
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default StatsTable;
