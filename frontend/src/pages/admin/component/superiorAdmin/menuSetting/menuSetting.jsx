import React, { useEffect, useState } from "react";
import { CreateMenu, UpdateMenu, getPublicDishImages, getMenuTemplates, getSpecialType } from "../../../../../hooks/admin/superiorAdmin";
import { getMenuForAdmin, getMenuById } from '../../../../../hooks/menu/menu'
import { getSideTemplate } from "../../../../../hooks/producerHooks/producerHooks";
import { useQuery } from "react-query";
import { useForm, Controller } from "react-hook-form";
import { getAllValueFromSelect } from '../../../../../utility/utility'
import MenuUpdate from './menuUpdate';
import { Accordion, Modal, Row, Col, Card } from "react-bootstrap";
import Spinner from "../../../../../Partials/Spinner";

const MenuSetting = () => {

    //get menu
    const [id, setId] = useState('63793934371bc9e6500f982d');
    const [selectedOption, setSelectedOption] = useState({
        _id: '63793934371bc9e6500f982d'
    });
    const [templateName, setTemplateName] = useState('')
    const { data: menu, error, isLoading } = useQuery(['getMenu', templateName], () => getMenuForAdmin(templateName));
    const { data: menuById } = useQuery(['getMenuById', id], () => getMenuById(id), { enabled: !!id });
    const { data: publicImages } = useQuery('getPublicImages', getPublicDishImages);
    const { data: menuTemplates } = useQuery("getMenuTemplates", getMenuTemplates);
    //sides
    const { data: SideTemplate } = useQuery("getSideTemplate", () => getSideTemplate());
    const [path, setPath] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [userMakeOwnMainDish, setUserMakeOwnMainDish] = useState(false);
    const [userMakeOwnSide, setUserMakeOwnSide] = useState(false);
    const [userMakeOwnSauce, setUserMakeOwnSauce] = useState(false);
    const { mutate: createMenu } = CreateMenu();
    const { mutate: updateMenu } = UpdateMenu();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        watch,
        reset,
    } = useForm();
    const { data: type } = useQuery("getSpecialtype", getSpecialType);
    const [chosenTypes, setChosenTypes] = useState([]);
    //Chose special type
    const toggleSelection = (type) => {
        if (chosenTypes.includes(type)) {
            const updatedChosenTypes = chosenTypes.filter(chosenType => chosenType !== type);
            setChosenTypes(updatedChosenTypes.sort());
        } else {
            setChosenTypes([...chosenTypes, type]);
        }
    };
    const template = watch('template')
    useEffect(() => {
        setTemplateName(template);
        setId(menu?.data[0]?._id);

    }, [template, menu]);

    const handleUserMakeOwnMainDish = () => {
        setUserMakeOwnMainDish(!userMakeOwnMainDish);
    }
    const handleUserMakeOwnSide = () => {
        setUserMakeOwnSide(!userMakeOwnSide);
    }
    const handleUserMakeOwnSauce = () => {
        setUserMakeOwnSauce(!userMakeOwnSauce);
    }
    const onSubmit = (data) => {
        const imagePath = { path: path }
        const submitData = Object.assign(data, {
            allergic: chosenTypes.sort(),
            imagePath: imagePath,
            templateName: data.template,
            templateActived: selectedOption.templateActived,
            makeOwnMainDish: userMakeOwnMainDish,
            makeOwnSide: userMakeOwnSide,
            makeOwnSauce: userMakeOwnSauce,
        });
        if (menu?.data.length === 0) { createMenu(submitData); setId(menu?.data[0]?._id) }
        else if (menu?.data.length !== 0 && data.template !== menuById?.data[0].templateName) { createMenu(submitData) }
        else { updateMenu({ id, submitData }) }
        reset({ dishName: "" });
    };
    if (error) return <div>Nånting gick fel</div>;
    if (isLoading)
        return (
            <div style={{ height: '100vh' }}>
                <Spinner />
            </div>
        );
    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
                className="overflow"
            >
                <div className="mt-5 mb-5 w-75 m-auto">
                    {errors.dishName?.type === "required" && (
                        <p className="ms-1 p-1 error fs-6" role="alert">
                            Fyll i maträttens namnet
                        </p>
                    )}
                    <div className="">
                        <input
                            className="form-control"
                            type="text"
                            name="dishName"
                            placeholder="Fyll i maträttens namnet"
                            {...register("dishName", {
                                required: true,
                            })}
                        />
                        {errors.template?.type === "required" && (
                            <p className="ms-1 p-1 error fs-6" role="alert">
                                Välj mallen
                            </p>
                        )}
                        <div>
                            <select
                                name="template"
                                className="form-select mt-4"
                                {...register("template", {
                                    required: true,
                                })}
                                onBlur={(e) => getAllValueFromSelect(e, menuTemplates?.data?.templates, setSelectedOption)}

                            >
                                <option value={" "} disabled selected="selected">Välj Mallen</option>
                                {menuTemplates?.data?.templates.map((item, index) => {
                                    return <option
                                        key={index}
                                        value={item.templateName}
                                    >{item.templateName}</option>
                                })}
                            </select>
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
                                        defaultValue='Ingredients'
                                        {...register('mainIngredient', {
                                            maxLength: 6000,
                                        })}
                                    />
                                    <div className="ms-2">
                                        <input
                                            className="form-control"
                                            type="number"
                                            step={0.01}
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
                                            <span className="small mb-2 d-block">Utför egen huvudrätt</span>
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
                                            {...register("sideIngredient", { required: true })}
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
                                            step={0.01}
                                            placeholder="Standard mängd per gäst"
                                            {...register("sideIngredientPerGuest")}
                                        />
                                        <div>
                                            <select
                                                {...register("sideIngredientUnit")}
                                                className="form-select mt-4 mb-4"
                                            >
                                                <option value={" "}>Välj enhet</option>
                                                <option value={"Kilo"}>Kilo</option>
                                                <option value={"Liter"}>Liter</option>
                                            </select>
                                        </div>
                                        <div className="input-group">
                                            <input
                                                className="form-control"
                                                type="number"
                                                step={0.001}
                                                placeholder="Standard kall sås mängd per gäst"
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
                                            <span className="small mb-2 d-block">Utför egen tillbehör</span>
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
                                            <span className="small mb-2 d-block">Utför egen kall/varm sås</span>
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
                                        className={chosenTypes.includes(type.s_type) ? "special_type_light button_size cursor" : 'button_size special_type cursor'}
                                        key={index}
                                        onClick={() => toggleSelection(type.s_type)}
                                    >{type.s_type}</span>
                                </>
                            })}
                        </div>
                        <hr></hr>
                    </div>
                    <Row>
                        <Col md={{ span: 12 }} className='mb-3'>
                            <span className="small mb-2 d-block">Välj bild från server</span>
                            <button className="stats_card w-100" onClick={handleShow}><span>Välj bild</span></button>
                        </Col>
                        <Col md={{ span: 12 }}>
                            <span className="small mb-2 d-block">Uppladda egen bild</span>
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
                        </Col>
                    </Row>

                    <button className="stats_card w-100" type="submit">
                        <span>Bekräfta</span>
                    </button>
                </div>
            </form>
            <hr></hr>
            <MenuUpdate menuData={menu?.data[0]?.menu} menuId={menu?.data[0]?._id} />
            <Modal show={show} onHide={handleClose}>
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
                                    <button className="stats_card w-100" onClick={() => { setPath(image.path); handleClose() }}>Välj bilden</button>
                                </Card.Body>
                            </Card>
                        </>
                    })}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default MenuSetting;
