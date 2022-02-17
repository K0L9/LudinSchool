import { useEffect, useRef, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import { BiPaste } from "react-icons/bi";
import { AiOutlineArrowDown } from "react-icons/ai";
import { AiOutlineArrowUp } from "react-icons/ai";

import { Row, Col } from "antd";
import { Editor } from "@tinymce/tinymce-react";

import { config as tinyConfig } from "./tinyConfig";

import CropperWindow from "../../../common/cropper";
import { IImageDTO, INews } from "./types";
import { validationFields } from "./validation";

import Input from "../../../common/form/input";

import { Button } from "antd";

import { Link } from "react-router-dom";

import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";
import Textarea from "../../../common/form/textarea";
import Select from "../../../common/form/select";

const NewsCreate = () => {
  const editorRef = useRef<any>(null);
  const { loadImage, fetchNewsCategories, imageDown, imageUp } = useActions();
  const { images } = useTypedSelector((redux) => redux.createNews);
  const { newsCategories } = useTypedSelector((redux) => redux.newsCategories);
  const initialValues: INews = {
    content: "",
    newsCategoryId: -1,
    smallContent: "",
    title: "",
  };
  const refFormik = useRef<FormikProps<INews>>(null);

  const [newsCategoryLoading, setCategLoading] = useState<boolean>(false);

  useEffect(() => {
    getNewsCategories();
  }, []);

  const getNewsCategories = async () => {
    setCategLoading(true);
    await fetchNewsCategories();
    setCategLoading(false);
  };

  const onImageLoad = async (base64: string) => {
    const body: IImageDTO = { base64 };
    await loadImage(body);
  };

  const handleSetImageToTiny = (fileName: string) => {
    const filePath = "/Images/" + fileName;
    editorRef.current.execCommand(
      "mceInsertContent",
      false,
      `<img alt="" src="${filePath}"/>`
    );
  };
  const handleImageUp = (id: number) => {
    imageUp(id);
  };
  const handleImageDown = (id: number) => {
    imageDown(id);
  };
  const handleSubmit = () => {
    console.log(refFormik.current?.values);
  };

  return (
    <div className="newsAdd">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationFields}
        innerRef={refFormik}
      >
        {(props: FormikProps<INews>) => {
          const { values, errors, touched, handleChange, handleSubmit } = props;
          return (
            <Form onSubmit={handleSubmit}>
              <Row gutter={6}>
                <Col span={5} className="gutter-row">
                  <div className="imagesContainer">
                    {images.map((element, id) => {
                      return (
                        <div className="divImage" key={id}>
                          <img key={id} src={`/Images/${element.fileName}`} />
                          <div className="middle">
                            <BiPaste
                              className="icon"
                              onClick={() =>
                                handleSetImageToTiny(element.fileName)
                              }
                            />
                            <AiOutlineArrowUp
                              className="icon"
                              onClick={() => handleImageUp(id)}
                            />
                            <AiOutlineArrowDown
                              className="icon"
                              onClick={() => handleImageDown(id)}
                            />
                          </div>
                        </div>
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
                    id="content"
                    value={values.content}
                    textareaName="content"
                    onEditorChange={(e) =>
                      refFormik.current?.setFieldValue("content", e)
                    }
                  />
                </Col>
                <Col span={7} className="gutter-row">
                  <Input
                    error={errors.title as string}
                    placeholder="Заголовок"
                    field="title"
                    value={values.title}
                    touched={touched.title as boolean}
                    onChange={handleChange}
                    className="antSelection"
                  />
                  <Textarea
                    error={errors.smallContent as string}
                    placeholder="Короткий зміст"
                    field="smallContent"
                    value={values.smallContent}
                    touched={touched.smallContent as boolean}
                    onChange={handleChange}
                    className="antSelection"
                  />
                  <Select
                    error={errors.newsCategoryId as string}
                    field="newsCategoryId"
                    value={values.newsCategoryId as number}
                    onChange={(x) => {
                      refFormik.current?.setFieldValue("newsCategoryId", x);
                    }}
                    loading={newsCategoryLoading}
                    options={newsCategories}
                    touched={touched.newsCategoryId as boolean}
                    placeholder="Оберіть категорію новини"
                    className="antSelection"
                  />
                  <div className="buttonGroup">
                    <Button htmlType="submit" type="default">
                      Підтвердити
                    </Button>
                    <Button htmlType="button" type="default">
                      <Link to={"/"}>Скасувати</Link>
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default NewsCreate;
