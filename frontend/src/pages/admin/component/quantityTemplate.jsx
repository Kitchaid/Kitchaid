import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Modal, Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { CreateQuantityTemplate, getQuantityTemplate, DeleteQuantityTemplate } from '../../../hooks/admin/admin'
import { getMenuForAdmin } from '../../../hooks/menu/menu';
import { getMenuTemplates } from "../../../hooks/admin/superiorAdmin";
import Tips from "../../../Partials/Tips";

const QuantityTemplate = () => {
  const [templateName, setTemplateName] = useState(" ");
  const { data: get_menu } = useQuery(["getMenu", templateName], () => getMenuForAdmin(templateName));
  const { data: menuTemplates } = useQuery("getMenuTemplates", getMenuTemplates);
  const { data: QuantityTemplate } = useQuery(['getQuantityTemplate', templateName], () => getQuantityTemplate(templateName));
  const { mutate } = CreateQuantityTemplate();
  console.log(menuTemplates)
  const { mutate: deleteTemplate } = DeleteQuantityTemplate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    const template = { templateName: templateName }
    const submitData = Object.assign(data, mainContainer, sideContainer, template)
    mutate(submitData)
    reset()
  }
  //main container pop up
  const [showMain, setShowMain] = useState(false);
  const handleCloseMain = () => setShowMain(false);
  const handleShowMain = () => setShowMain(true);
  //side container pop up
  const [showSide, setShowSide] = useState(false);
  const handleCloseSide = () => setShowSide(false);
  const handleShowSide = () => setShowSide(true);
  //delete pop up
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const [mainContainer, setMainContainer] = useState({})
  const [sideContainer, setSideContainer] = useState({})
  const [selection, setSelection] = useState('')
  const [selectionMain, setSelectionMain] = useState(false)
  const [selectionSide, setSelectionSide] = useState(false)
  const [deleteId, setDeleteId] = useState("")
  const containerSelection = (selection) => {
    setSelection(selection)
  }
  useEffect(() => {
    if (selectionMain === true && selectionSide === false) {
      const mainContainer = { mainContainer: selection.src, containerMainName: selection.name }
      setMainContainer(mainContainer)
    }
    if (selectionSide === true && selectionMain === false) {
      const sideContainer = { sideContainer: selection.src, containerSideName: selection.name }
      setSideContainer(sideContainer)
    }
  }, [selectionMain, selectionSide, selection])
  const handleDelete = (id) => {
    deleteTemplate(id)
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" mx-auto formFrame mt-2">
          <select
            onChange={(e) => { setTemplateName(e.target.value) }}
            name="template"
            className="form-select mt-4 mb-4"
          >
            <option value={"63793934371bc9e6500f982d"}>Välj mallen</option>
            {menuTemplates?.data?.templates?.map((item, index) => {
              return <>
                <option
                  key={index}
                  value={item.templateName}
                >{item.templateName}</option>
              </>
            })}
          </select>
        </div>
        <div className=" mx-auto formFrame">
          <label htmlFor="dishName"></label>
          <select
            name="dishName"
            {...register("dishName", {
              required: true,
            })}
            className="form-select"
          >
            <option value={""} disabled selected>Välj maträtten</option>
            {get_menu?.data[0]?.menu?.map((menu, index) => {
              return (
                <option key={index} value={menu.dishName}>
                  {menu.dishName}
                </option>
              );
            })}
          </select>
        </div>
        <hr></hr>
        {errors.mainComponent?.type === "required" && (
          <p className="m-auto ms-5 error" role="alert">
            Huvudvaror?
          </p>
        )}
        <div className=" mx-auto formFrame mt-2">
          <label
            className="visually-hidden"
            htmlFor="autoSizingInput"
          ></label>
          <input
            type="text"
            className="form-control"
            placeholder="Huvudkomponent t.ex. Köttbullar"
            {...register("mainComponent", {
              required: true,
              maxLength: 20,
              type: String || Number,
            })}
            aria-invalid={errors.mainComponent ? "true" : "false"}
          />
        </div>
        {errors.mainQuantity?.type === "required" && (
          <p className="m-auto ms-5 error" role="alert">
            Måste fylla i
          </p>
        )}
        <div className=" mx-auto formFrame">
          <Row>
            <Col sm={12}>
              <label htmlFor="autoSizingInput"
              ><span className="text-light font-size-s">Mängd t.ex. 5</span></label>
            </Col>
            <Col sm={12}>
              <input
                type="number"
                min={0}
                step="0.01"
                className="form-control"
                defaultValue={1}
                {...register("mainQuantity", {
                  required: true,
                  maxLength: 10,
                  type: Number,
                })}
                aria-invalid={errors.mainQuantity ? "true" : "false"}
              />
            </Col>
          </Row>
        </div>
        <div className=" formFrame m-auto text-light">
          <input
            className="radio"
            type="radio"
            id="Styck"
            {...register("unitMain")}
            value="Styck"
          />
          <label htmlFor="Styck">Styck &nbsp;&nbsp;&nbsp;</label>
          <input
            className="radio"
            type="radio"
            id="Liter"
            {...register("unitMain")}
            value="Liter"
          />
          <label htmlFor="Liter">Liter &nbsp;&nbsp;&nbsp;</label>
          <input
            className="radio"
            type="radio"
            id="Kilo"
            {...register("unitMain")}
            value="Kilo"
          />
          <label htmlFor="Kilo">Kilo &nbsp;&nbsp;&nbsp;</label>
        </div>
        <div className=" mx-auto formFrame mt-3">
          <button
            className="stats_card m-auto w-100"
            onClick={() => { handleShowMain(); setSelectionMain(true); setSelectionSide(false) }}
          >
            <span className="text-light">Välj container</span>
          </button>
        </div>
        <hr></hr>
        {errors.sideComponent?.type === "required" && (
          <p className="m-auto ms-5 error" role="alert">
            Tillbehör?
          </p>
        )}
        <div className=" mx-auto formFrame mt-2">
          <label
            className="visually-hidden"
            htmlFor="autoSizingInput"
          ></label>
          <input
            type="text"
            className="form-control"
            placeholder="Tillbehör t.ex. pasta"
            {...register("sideComponent", {
              required: true,
              maxLength: 20,
              type: String || Number,
            })}
            aria-invalid={errors.sideComponent ? "true" : "false"}
          />
        </div>
        {errors.sideQuantity?.type === "required" && (
          <p className="m-auto ms-5 error" role="alert">
            Måste fylla i
          </p>
        )}
        <div className=" mx-auto formFrame">
          <Row>
            <Col sm={12}>
              <label htmlFor="autoSizingInput"
              ><span className="text-light font-size-s">Mängd t.ex. 5</span></label>
            </Col>
            <Col sm={12}>
              <input
                type="number"
                min={0}
                className="form-control"
                defaultValue={1}
                {...register("sideQuantity", {
                  required: true,
                  maxLength: 10,
                  type: Number,
                })}
                aria-invalid={errors.sideQuantity ? "true" : "false"}
              />
            </Col>
          </Row>
        </div>
        <div className=" formFrame m-auto text-light">
          <input
            className="radio"
            type="radio"
            id="Styck"
            {...register("unitSide")}
            value="Styck"
          />
          <label htmlFor="Styck">Styck &nbsp;&nbsp;&nbsp;</label>
          <input
            className="radio"
            type="radio"
            id="Liter"
            {...register("unitSide")}
            value="Liter"
          />
          <label htmlFor="Liter">Liter &nbsp;&nbsp;&nbsp;</label>
          <input
            className="radio"
            type="radio"
            id="Kilo"
            {...register("unitSide")}
            value="Kilo"
          />
          <label htmlFor="Kilo">Kilo &nbsp;&nbsp;&nbsp;</label>
        </div>
        <div className=" mx-auto formFrame mt-3">
          <button
            className="stats_card m-auto w-100"
            onClick={() => { handleShowSide(); setSelectionMain(false); setSelectionSide(true) }}
            media="print"
          >
            <span className="text-light">Välj container</span>
          </button>
        </div>
        <button type="submit" className="mainButton mb-4 p-1">
          <span>Bekräfta</span>
        </button>
      </form>
      <hr></hr>
      <div className='overflow-template'>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col"><span className='font-size-xs text-light'>Rätten</span></th>
              <th scope="col"><span className='font-size-xs text-light'>Huvudkomponent</span></th>
              <th scope="col"><span className='font-size-xs text-light'>Mängd (enhet)</span></th>
              <th scope="col"><span className='font-size-xs text-light'>Container</span></th>
              <th scope="col"><span className='font-size-xs text-light'>Tillbehör</span></th>
              <th scope="col"><span className='font-size-xs text-light'>Mängd (enhet)</span></th>
              <th scope="col"><span className='font-size-xs text-light'>Container</span></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {QuantityTemplate?.data?.sort().map((item, index) => {
              return <>
                <tr key={index}>
                  <th scope="row"></th>
                  <td><span className='font-size-xs text-light'>{item.dishName}</span></td>
                  <td><span className='font-size-xs text-light'>{item.main.mainComponent}</span></td>
                  <td><span className='font-size-xs text-light'>{item.main.mainQuantity} ({item.main.unitMain})</span></td>
                  <td><span className='font-size-xs text-light'>{item.main.containerMainName}</span>
                    <div className="image_thumbnail">
                      <img width="400" src={item.main.mainContainer}></img>
                    </div>
                  </td>
                  <td><span className='font-size-xs text-light'>{item.side.sideComponent}</span></td>
                  <td><span className='font-size-xs text-light'>{item.side.sideQuantity} ({item.side.unitSide})</span></td>
                  <td><span className='font-size-xs text-light'>{item.side.containerSideName}</span>
                    <div className="image_thumbnail">
                      <img width="400" src={item.side.sideContainer}></img>
                    </div>
                  </td>
                  <td><i className="fa-solid fa-trash-can glow" onClick={() => { handleShowDelete(); setDeleteId(item._id) }}></i></td>
                </tr>
              </>
            })}
          </tbody>
        </table>
      </div>
      <Modal size="sm" show={showMain} onHide={handleCloseMain}>
        <Modal.Header closeButton>
          <Modal.Title>Kantin modell</Modal.Title>
        </Modal.Header>
        <Modal.Body>{<Tips containerSelection={containerSelection} />}</Modal.Body>
        <Modal.Footer>Information från Martin&Servera</Modal.Footer>
      </Modal>
      <Modal size="sm" show={showSide} onHide={handleCloseSide}>
        <Modal.Header closeButton>
          <Modal.Title>Kantin modell</Modal.Title>
        </Modal.Header>
        <Modal.Body>{<Tips containerSelection={containerSelection} />}</Modal.Body>
        <Modal.Footer>Information från Martin&Servera</Modal.Footer>
      </Modal>
      <Modal
        size="sm"
        show={showDelete}
        onHide={() => setShowDelete(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Är du säker att radera mallen?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <button
            variant="danger"
            className="statsDeleteButton"
            onClick={() => { handleDelete(deleteId); handleCloseDelete() }}
          >
            Radera
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default QuantityTemplate;
