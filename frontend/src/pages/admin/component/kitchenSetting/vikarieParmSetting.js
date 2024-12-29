import React from 'react';
// import { EditorState, convertToRaw } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import draftToHtml from "draftjs-to-html";
import { UpdateInfoFolder, getInfoFolder, CreateFolder } from '../../../../hooks/admin/admin'
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useQuery } from "react-query";
import { useForm, Controller } from "react-hook-form";
import WYSIWYGEditor from "./WYSIWYGEditor";
import { stripHtml } from "string-strip-html";
import { Row, Col } from "react-bootstrap";
import Spinner from '../../../../Partials/Spinner'

const VikareiParmSetting = ({ id }) => {
  const { data: infoFolderData, isLoading } = useQuery(
    ["getInfoFolder", id],
    () => getInfoFolder(id)
  );
  const {
    register,
    handleSubmit,
    control,
    reset,
  } = useForm();
  const { mutate } = UpdateInfoFolder();
  const { mutate: createFolder } = CreateFolder();

  const onSubmit = (data) => {
    if (infoFolderData?.data.length === 0) {
      createFolder({ id, data });
    } else {
      mutate({ id, data })
    }
    reset();
  };

  const variableName = [
    {
      name: 'routine_breakfast',
      placeholder: infoFolderData?.data[0]?.routine_breakfast,
      desp_type: 'Rutine',
      type: 'Frukost arbets rutin',
      time: 'routine_time_breakfast',
      placeholder_time: infoFolderData?.data[0]?.routine_time_breakfast,
      desp: 'Frukost börja'
    },
    {
      name: 'routine_lunch',
      placeholder: infoFolderData?.data[0]?.routine_lunch,
      desp_type: 'Rutine',
      type: 'Lunch arbets rutin',
      time: 'routine_time_lunch',
      placeholder_time: infoFolderData?.data[0]?.routine_time_lunch,
      desp: 'Lunch börja'
    },
    {
      name: 'routine_snack',
      placeholder: infoFolderData?.data[0]?.routine_snack,
      desp_type: 'Rutine',
      type: 'Mellanmål arbets rutin',
      time: 'routine_time_snack',
      placeholder_time: infoFolderData?.data[0]?.routine_time_snack,
      desp: 'Mellanmål börja'
    },
  ];
  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );

  return <>
    <form
      className="row align-items-center "
      onSubmit={handleSubmit(onSubmit)}
    >
      <Row>
        <Col>
          <span className='m-2 ms-3 mb-3'>Min arbets tid:</span>
        </Col>
        <Col>
          <input
            type="text"
            className="form-control w-75 m-auto mb-3"
            placeholder="07:00 - 15:30"
            defaultValue={infoFolderData?.data[0]?.my_work_time}
            {...register('my_work_time')}
          />
        </Col>
      </Row>
      <hr></hr>
      {variableName?.map((item, index) => {
        return <>
          <h6 className='mb-2 rutine-header m-auto p-3'>{item.type}</h6>
          <hr></hr>
          <Row >
            <Col><h6 className='m-2 ms-3 mb-3'>{item.desp}</h6></Col>
            <Col><label
              className="visually-hidden"
              htmlFor="autoSizingInput"
            ></label>
              <input
                key={index}
                type="text"
                className="form-control w-75 m-auto mb-3"
                defaultValue={item.placeholder_time}
                {...register(item.time)}
              /></Col>
          </Row>
          <h6 className='m-2 ms-3 font-size-xs'>Rutin:</h6>
          <Col className='mb-3'>
            <Controller
              className='mb-2'
              render={({ field }) => <WYSIWYGEditor {...field} />}
              name={item.name}
              control={control}
              defaultValue={item.placeholder}
              rules={{
                validate: {
                  required: (v) =>
                    (v && stripHtml(v).result.length > 0) ||
                    "Description is required",
                  maxLength: (v) =>
                    (v && stripHtml(v).result.length <= 3000) ||
                    "Maximum character limit is 3000",
                },
              }}
            />
          </Col>
        </>
      })}
      <button
        type="submit"
        className="stats_card mt-4"
      >
        Uppdatera
      </button>
    </form>
  </>

}

export default VikareiParmSetting;