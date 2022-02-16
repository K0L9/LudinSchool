import { useRef } from "react";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import { Row, Col } from "antd";
import { Editor } from "@tinymce/tinymce-react";

import { config as tinyConfig } from "./tinyConfig";

import CropperWindow from "../../../common/cropper";
import { IImageDTO, INews } from "./types";
import { validationFields } from "./validation";

import Input from "../../../common/form/input";

import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";
import Textarea from "../../../common/form/textarea";

const NewsCreate = () => {
  const editorRef = useRef<any>(null);
  const { loadImage } = useActions();
  const { images } = useTypedSelector((redux) => redux.createNews);
  const initialValues: INews = {
    content: "",
    newsCategoryId: -1,
    smallContent: "",
    title: "",
  };
  const refFormik = useRef<FormikProps<INews>>(null);

  const onImageLoad = async (base64: string) => {
    const body: IImageDTO = { base64 };
    await loadImage(body);
  };

  const handleSetToTiny = (fileName: string) => {
    // editorRef.current.setContent(
    //   editorRef.current.getContent() + "/Images/" + fileName
    // );
    const filePath = "/Images/" + fileName;
    console.log(filePath);
    editorRef.current.execCommand(
      "mceInsertContent",
      false,
      '<img alt="Smiley face" src="' + filePath + '"/>'
    );
  };
  const handleSubmit = () => {};
  return (
    <div className="newsAdd">
      <Row gutter={6}>
        <Col span={5} className="gutter-row">
          <div className="imagesContainer">
            {images.map((element, id) => {
              return (
                <img
                  key={id}
                  src={`/Images/${element.fileName}`}
                  onClick={() => handleSetToTiny(element.fileName)}
                />
              );
            })}
            <CropperWindow onSubmitProduct={onImageLoad} />
          </div>
        </Col>
        <Col span={12} className="gutter-row">
          <Editor
            apiKey="rnv1zli3c4ebl1nb1ffig1imvcmahopklllvbv9br4wythl8"
            onInit={(evt, editor) => (editorRef.current = editor)}
            init={tinyConfig}
          />
        </Col>
        <Col span={7} className="gutter-row">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationFields}
            innerRef={refFormik}
          >
            {(props: FormikProps<INews>) => {
              const { values, errors, touched, handleChange, handleSubmit } =
                props;
              return (
                <Form onSubmit={handleSubmit}>
                  <Input
                    label="Заголовок"
                    error={errors.title as string}
                    placeholder="Заголовок"
                    field="title"
                    value={values.title}
                    touched={touched.title as boolean}
                    onChange={handleChange}
                    className=""
                  />
                  <Textarea
                    label="Заголовок"
                    error={errors.smallContent as string}
                    placeholder="Заголовок"
                    field="smallContent"
                    value={values.smallContent}
                    touched={touched.smallContent as boolean}
                    onChange={handleChange}
                    className=""
                  />

                  <button type="submit">Submt</button>
                </Form>
              );
            }}
          </Formik>
        </Col>
      </Row>
    </div>
  );
};

export default NewsCreate;
