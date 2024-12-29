/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { DeleteOneDish, getPublicDishImages, UpdateDish, getMenuTemplates, getSpecialType } from "../../../../../hooks/admin/superiorAdmin";
import { useForm, Controller } from "react-hook-form";
import { getSideTemplate } from "../../../../../hooks/producerHooks/producerHooks";
import { Accordion, Modal, Button, Card, Row, Col } from "react-bootstrap";


function MenuTable(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showImage, setShowImage] = useState(false);
  const handleImageClose = () => setShowImage(false);
  const handleImageShow = () => setShowImage(true);
  const [smShow, setSmShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  const [userMakeOwnMainDish, setUserMakeOwnMainDish] = useState(props?.makeOwnMainDish);
  const [userMakeOwnSide, setUserMakeOwnSide] = useState(props?.makeOwnSide);
  const [userMakeOwnSauce, setUserMakeOwnSauce] = useState(props?.makeOwnSauce);
  const [path, setPath] = useState('')
  let id = props.menuId;
  let dishId = props._id;
  const { data: publicImages } = useQuery('getPublicImages', getPublicDishImages)
  const { data: menuTemplates } = useQuery("getMenuTemplates", getMenuTemplates);
  const { data: SideTemplate } = useQuery("getSideTemplate", () => getSideTemplate());
  const { mutate: deleteOneDish } = DeleteOneDish();
  const handelDelete = () => {
    let isDeleted = true;
    deleteOneDish({ id, dishId, isDeleted });
    setSmShow(false);
    setShow(false)
  }
  //update dish
  const { mutate: updateDish } = UpdateDish();
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue
  } = useForm({ mode: 'onBlur' });
  useEffect(() => {
    if (props) {
      setValue('mainIngredient', props.mainIngredient);
      setValue('sideIngredient', props.sideIngredient);
      setValue('mainIngredientPerGuest', props.mainIngredientPerGuest);
      setValue('sideIngredientPerGuest', props.sideIngredientPerGuest);
      setValue('mainIngredientUnit', props.mainIngredientUnit);
      setValue('sideIngredientUnit', props.sideIngredientUnit);
      setValue('sauseSoupPerGuest', props.sauseSoupPerGuest);
      setValue('makeOwnMainDish', props.makeOwnMainDish);
      setValue('makeOwnSide', props.makeOwnSide);
      setValue('makeOwnSauce', props.makeOwnSauce);
      setValue('allergic', props.allergic);
    }
  }, [props]);
  const handleUserMakeOwnMainDish = () => {
    setUserMakeOwnMainDish(!userMakeOwnMainDish);
  }
  const handleUserMakeOwnSide = () => {
    setUserMakeOwnSide(!userMakeOwnSide);
  }
  const handleUserMakeOwnSauce = () => {
    setUserMakeOwnSauce(!userMakeOwnSauce);
  }
  const { data: type } = useQuery("getSpecialtype", getSpecialType);
  const [chosenTypes, setChosenTypes] = useState(props?.allergic || []);
  //Chose special type
  const toggleSelection = (type) => {
    if (chosenTypes?.includes(type)) {
      const updatedChosenTypes = chosenTypes.filter(chosenType => chosenType !== type);
      setChosenTypes(updatedChosenTypes.sort());
    } else {
      setChosenTypes([...chosenTypes, type]);
    }
  };
  const onSubmit = (data) => {
    if (data.sideIngredientPerGuest) {
      data.sideIngredientPerGuest = Number(data.sideIngredientPerGuest);
    }
    if (data.sauseSoupPerGuest) {
      data.sauseSoupPerGuest = Number(data.sauseSoupPerGuest);
    }
    const imagePath = { path: path }
    const submitData = Object.assign(data, {
      allergic: chosenTypes.sort(),
      imagePath: imagePath,
      makeOwnMainDish: userMakeOwnMainDish,
      makeOwnSide: userMakeOwnSide,
      makeOwnSauce: userMakeOwnSauce,
    }); console.log(submitData);
    updateDish({ id, dishId, submitData })
    reset();
  };
  const PerGuest = (perGuest) => {
    if (perGuest === null || perGuest === undefined) {
      return 0
    } return perGuest;
  }
  //convert htmlContent
  // Create a new DOMParser
  const parser = new DOMParser();

  // Parse the HTML content
  const parsedHtmlMainIngredients = parser.parseFromString(props.mainIngredient, 'text/html');
  const parsedHtmlSideIngredients = parser.parseFromString(props.sideIngredient, 'text/html');

  // Get the plain text content
  const plainTextMainIngredients = parsedHtmlMainIngredients.body.textContent;
  const plainTextSideIngredients = parsedHtmlSideIngredients.body.textContent;
  //get/create image url
  const image = () => {
    if (props?.data && props?.contentType) {
      const image = `data:props/${props?.contentType};base64,${props?.data?.toString('base64')}`;
      return image
    }
    else {
      return `${process.env.REACT_APP_BE}/${props.path}`
    }
  }
  const imageSrc = image();

  return (
    <>
      <button
        className="stats_card w-100 mb-3 fs-6"
        onClick={handleShow}
      >
        {props.dishName}
      </button>
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>
            <span>{props.dishName}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="image">
            <img width="400" src={imageSrc == undefined ? imageSrc : "/imgsAndVideos/Logo.png"}></img>
          </div>
          <span className="fs-6 d-block m-3">Rättens innehåll</span>
          <table className="table table-striped font-size-s">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Huvudkomponent</th>
                <th scope="col">Tillbehör</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row"></th>
                <td>{plainTextMainIngredients}</td>
                <td>{plainTextSideIngredients}</td>
                <td>Kall sås</td>
              </tr>
              <tr>
                <th scope="row"></th>
                <td>{props.mainIngredientPerGuest} <span className="font-size-xs">{props.mainIngredientUnit}/Pers</span></td>
                <td>{props.sideIngredientPerGuest} <span className="font-size-xs">{props.sideIngredientUnit}/Pers</span></td>
                <td>{props.sauseSoupPerGuest} <span className="font-size-xs">Liter/Pers</span></td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            className="statsDeleteButton mt-4"
            onClick={() => { setSmShow(true) }}
          >
            Radera
          </Button>
          <Button
            variant="warning"
            className="statsDeleteButton mt-4"
            onClick={() => { setUpdateShow(true) }}
          >
            Uppdatera
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Är du säker att radera rätten?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            variant="danger"
            className="statsDeleteButton w-100 mt-2"
            onClick={() => handelDelete()}
          >
            Radera
          </Button>
        </Modal.Body>
      </Modal>
      <Modal
        size="lg"
        show={updateShow}
        onHide={() => setUpdateShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className="mt-5 mb-5 w-75 m-auto">
              <div className="">
                <input
                  className="form-control"
                  type="text"
                  name="dishName"
                  defaultValue={props.dishName}
                  {...register("dishName", {
                    required: true,
                  })}
                />
                <div>
                  <select
                    name="termin"
                    className="form-select mt-4"
                    {...register("template", {
                      required: true,
                    })}
                  >
                    <option value={""} disabled>Välja Mallen</option>
                    {menuTemplates?.data?.templates.map((item, index) => {
                      return <option key={index} value={item.templateName}>{item.templateName}</option>
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <span className="small mb-2 mt-2 ms-2 d-block">Mallen till rättens innehåll</span>
              <Accordion defaultActiveKey="0" className="w-100 m-auto">
                <Accordion.Item eventKey="1">
                  <Accordion.Header className="routineLayout">
                    Huvudkomponent
                  </Accordion.Header>
                  <Accordion.Body>
                    <textarea
                      className='mb-4 mt-2 w-100 form-control ms-2'
                      name='mainIngredient'
                      control={control}
                      defaultValue={props.mainIngredient}
                      {...register('mainIngredient', {
                        maxLength: 6000,
                      })}
                    />
                    <div className="ms-2">
                      <input
                        className="form-control"
                        type="number"
                        step={0.01}
                        defaultValue={props.mainIngredientPerGuest}
                        placeholder="Standard mängd per gäst"
                        {...register("mainIngredientPerGuest", {
                          required: true,
                        })}
                      />
                      <div>
                        <select
                          {...register("mainIngredientUnit", {
                            required: true,
                          })}
                          className="form-select mt-4 mb-4"
                          defaultValue={props.mainIngredientUnit}
                        >
                          <option value={" "}>Välj enhet</option>
                          <option value={"Kilo"}>Kilo</option>
                          <option value={"Liter"}>Liter</option>
                          <option value={"Styck"}>Styck</option>
                          <option value={"L-bleck"}>L-bleck</option>
                        </select>
                      </div>
                    </div>
                    <Row className="mb-3 mt-3 ms-4">
                      <Col xs={10}>
                        <span className="small mb-2 d-block text-dark">Utför egen huvudrätt</span>
                      </Col>
                      <Col xs={2}>
                        <input
                          type="checkbox"
                          checked={userMakeOwnMainDish}
                          onChange={handleUserMakeOwnMainDish}
                        /></Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header className="routineLayout">
                    Tillbehör
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="ms-2 mt-4 mb-4">
                      <label
                        className="visually-hidden"
                        htmlFor="autoSizingInput"
                      ></label>
                      <select
                        className="form-control"
                        defaultValue={props.sideIngredien}
                        {...register("sideIngredient")}
                      >
                        <option selected value="">Välj tillbehör...</option>
                        {SideTemplate?.data[0]?.side?.map((item, index) => {
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
                    <div className="ms-2">
                      <input
                        className="form-control"
                        type="number"
                        step={0.001}
                        placeholder="Standard mängd per gäst"
                        defaultValue={PerGuest(props.sideIngredienPerGuest)}
                        {...register("sideIngredientPerGuest")}
                      />
                      <select
                        {...register("sideIngredientUnit")}
                        defaultValue={props.sideIngredienUnit}
                        className="form-select mt-4 mb-4"
                      >
                        <option value={" "}>Välj enhet</option>
                        <option value={"Kilo"}>Kilo</option>
                        <option value={"Liter"}>Liter</option>
                      </select>
                      <div className="input-group">
                        <input
                          className="form-control"
                          type="number"
                          step={0.001}
                          placeholder="Standard kall sås mängd per gäst"
                          defaultValue={PerGuest(props.sauseSoupPerGuest)}
                          {...register("sauseSoupPerGuest")}
                        />
                        <div className="input-group-text">
                          <input
                            className="form-check-input d-none"
                            type="radio"
                            value="Liter"
                            readOnly={true}
                          />
                          <span className="input-group border-0">Liter</span>
                        </div>
                      </div>
                    </div>
                    <Row className="mb-3 mt-3 ms-4">
                      <Col xs={10}>
                        <span className="small mb-2 d-block text-dark">Utför egen tillbehör</span>
                      </Col>
                      <Col xs={2}>
                        <input
                          type="checkbox"
                          checked={userMakeOwnSide}
                          onChange={handleUserMakeOwnSide}
                        /></Col>
                    </Row>
                    <Row className="mb-3 ms-4">
                      <Col xs={10}>
                        <span className="small mb-2 d-block text-dark">Utför egen kall/varm sås</span>
                      </Col>
                      <Col xs={2}>
                        <input
                          type="checkbox"
                          checked={userMakeOwnSauce}
                          onChange={handleUserMakeOwnSauce}
                        /></Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <hr></hr>
              <span className="text-light font-size-s pb-2">Innehåll</span>
              <div className="special-type-group font-size-md">
                {type?.data?.Special_type[0]?.special_type?.map((type, index) => {
                  return <>
                    <span
                      className={chosenTypes?.includes(type.s_type) ? "special_type_light button_size cursor" : 'button_size special_type cursor'}
                      key={index}
                      onClick={() => toggleSelection(type.s_type)}
                    >{type.s_type}</span>
                  </>
                })}
              </div>
              <hr></hr>
            </div>
            <div className="image">
              <img width="400" src={imageSrc == undefined ? imageSrc : "/imgsAndVideos/Logo.png"}></img>
            </div>
            <Col md={{ span: 12 }} className='mb-3'>
              <span className="small mb-2 d-block">Välj bild från server</span>
              <Button className="stats_card w-100" onClick={handleImageShow}><span>Välj bild</span></Button>
            </Col>
            <span>Ladda upp egen bild</span>
            <Controller
              control={control}
              name="dishImage"
              render={({ field: { value, onChange, ...field } }) => {
                return (
                  <input
                    {...field}
                    value={value?.fileName}
                    onChange={(event) => {
                      onChange(event.target.files[0]);
                    }}
                    type="file"
                    id="dishImage"
                    className="mb-3 form-control"
                  />
                );
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <button
              type="submit"
              className="stats_card w-100 mt-4"
              onClick={() => { setUpdateShow(false); setShow(false) }}
            >
              Uppdatera
            </button>
          </Modal.Footer>
        </form>
      </Modal>
      <Modal show={showImage} onHide={handleImageClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Välj bild från server
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {publicImages?.data?.map((image, index) => {
            return <>
              <Card className="mb-3">
                <Card.Img
                  variant="top"
                  src={`${process.env.REACT_APP_BE}/${image.path}`}
                  alt={image.imgName}
                  key={index} />
                <Card.Body>
                  <Card.Text>
                    {image.imgName.split('-')[0]}
                  </Card.Text>
                  <Button className="stats_card w-100" onClick={() => { setPath(image.path); handleImageClose() }}>Välj bilden</Button>
                </Card.Body>
              </Card>
            </>
          })}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MenuTable;
