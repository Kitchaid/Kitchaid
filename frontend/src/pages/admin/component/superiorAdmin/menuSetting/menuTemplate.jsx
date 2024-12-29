import React, { useState, useEffect } from "react";
import {
    CreateMenuTemplate,
    UpdateMenuTemplate,
    getMenuTemplates,
    getMenuTemplate,
} from "../../../../../hooks/admin/superiorAdmin";
// import { getMenuForAdmin } from '../../../../../hooks/menu/menu'
// import WeeklyMenuDnD from './DnDWeeklyMenu'
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { Row, Col } from "react-bootstrap";
import Spinner from "../../../../../Partials/Spinner";

const MenuSetting = () => {
    //get menu
    const [templateId, setTemplateId] = useState('63793934371bc9e6500f982d');
    // const [id, setId] = useState('63793934371bc9e6500f982d');
    const { data: menuTemplates, error, isLoading } = useQuery("getMenuTemplates", getMenuTemplates);
    const { data: menuTemplate } = useQuery(["getMenuTemplate", templateId], () => getMenuTemplate(templateId), { enabled: !!templateId });
    const { mutate: createMenuTemplate } = CreateMenuTemplate();
    const { mutate: updateMenuTemplate } = UpdateMenuTemplate();
    const [templateName, setTemplateName] = useState({
        _id: '63793934371bc9e6500f982d'
    });
    // const { data: menu } = useQuery(['getMenu', templateName], () => getMenuForAdmin(templateName));

    const handleChange = (e) => {
        e.preventDefault()
        const templateName = e.target.value;
        if (!templateName) { return <></> }
        const selectedIndex = e.target.selectedIndex;
        const selectedOptionData = menuTemplates?.data?.templates[selectedIndex - 1];
        setTemplateId(selectedOptionData._id);
        setTemplateName(templateName);
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const onSubmit = (data) => {
        createMenuTemplate(data);
        reset();
    };
    const onSubmitUpdate = () => {
        const data = { templateActived: isChecked, templateName: templateName }
        updateMenuTemplate({ data, templateId });
    };

    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const backendValue = menuTemplate?.data?.template?.templateActived;
        // Initialize the checkbox state based on the backend value
        setIsChecked(backendValue);
    }, [menuTemplate?.data?.template]);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
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
            <form>
                <div className="mt-5 mb-1 w-75 m-auto">
                    {errors.templateName && (
                        <p className="ms-1 p-1 error fs-6" role="alert">
                            Fyll i mallens namnet
                        </p>
                    )}
                    <div className="">
                        <input
                            className="form-control"
                            type="text"
                            name="templateName"
                            placeholder="Menymallen t.ex. VT2024 "
                            {...register("templateName", {
                                required: true,
                            })}
                        />
                        <Row>
                            <Col xs={8}>
                                <div>
                                    <select
                                        {...register("group", {
                                            required: true,
                                        })}
                                        name="group"
                                        className="form-select mt-4 mb-4"
                                    >
                                        <option value={" "}>Välj grupp</option>
                                        <option value={"junior"}>Skolan,Förskolan</option>
                                        <option value={"senior"}>Äldreomsorg/Matlåda</option>
                                    </select>
                                </div>
                            </Col>
                            <Col xs={4} className="m-auto">
                                <input
                                    className="radio m-4"
                                    type="checkbox"
                                    name="templateActived"
                                    {...register("templateActived")}
                                />
                                <label htmlFor="senior" className="ms-2 small">Aktivera</label>
                            </Col>
                        </Row>
                    </div>
                    <button
                        className="stats_card w-100 mb-4"
                        onClick={handleSubmit(onSubmit)}
                    >
                        <span>Bekräfta</span>
                    </button>
                </div>
            </form>
            <hr></hr>
            <form>
                <div className="mt-1 mb-1 w-75 m-auto">
                    <div className="">
                        <Row>
                            <Col xs={8}>
                                <div>
                                    <select
                                        onChange={handleChange}
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
                            </Col>
                            <Col xs={4} className="m-auto">
                                <input
                                    className="radio m-4"
                                    type="checkbox"
                                    name="templateActived"
                                    defaultValue={false}
                                    checked={isChecked}
                                    onChange={(e) => handleCheckboxChange(e)}
                                />
                                <label htmlFor="senior" className="ms-2 small">Aktivera</label>
                            </Col>
                        </Row>
                    </div>
                    <button
                        className="stats_card w-100 mb-4"
                        onClick={() => onSubmitUpdate()}
                    >
                        <span>Uppdatera</span>
                    </button>
                </div>
            </form>
            <hr></hr>
            {/* <WeeklyMenuDnD /> */}
            {/* <Row>
                <Col>
                    <div className="searchResult w-75 m-auto">
                        <div style={{ height: "300px" }}>
                            <ul>
                                <li>{menu?.data[0]?.menu?.map((item, index) => {
                                    return <>
                                        <Row>
                                            <Col xs={10}>
                                                <Button
                                                    key={index}
                                                    className="stats_card w-100 mb-3"
                                                >
                                                    <span className="font-size-xs">{item.dishName}</span>
                                                </Button>
                                            </Col>
                                            <Col xs={2}>
                                                <Button className="stats_card w-100 mb-3">
                                                    <i className="fa-solid fa-check fa-sm"
                                                        onClick={() => setId(item._id)}
                                                    ></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </>
                                })}
                                </li>
                            </ul>
                        </div>
                    </div>
                </Col>
            </Row> */}
        </>
    );
};

export default MenuSetting;
