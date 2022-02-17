import { useEffect, useRef, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import { Row, Col } from "antd";
import { Editor } from "@tinymce/tinymce-react";

import { config as tinyConfig } from "./tinyConfig";

import CropperWindow from "../../../common/cropper";
import { IImage, IImageDTO, INews, IImagesNewsDTO } from "./types";
import { validationFields } from "./validation";

import AddImagesContainer from "../../../common/addImagesContainer";

import Input from "../../../common/form/input";

import { Button } from "antd";

import { Link } from "react-router-dom";
import { CreateNewsService } from "./service";

import { toast } from "react-toastify";
import Loader from "../../../common/loader";

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
import { AxiosError } from "axios";

const NewsCreate = () => {
  const service: CreateNewsService = new CreateNewsService();
  const editorRef = useRef<any>(null);
  const { fetchNewsCategories } = useActions();
  const { newsCategories } = useTypedSelector((redux) => redux.newsCategories);
  // const [images, setImages] = useState<Array<IImage>>([]);
  let images: Array<IImage> = [];
  const initialValues: INews = {
    content: "",
    newsCategoryId: -1,
    smallContent: "",
    title: "",
  };
  const refFormik = useRef<FormikProps<INews>>(null);

  const [newsCategoryLoading, setCategLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getNewsCategories();
  }, []);

  const getNewsCategories = async () => {
    setCategLoading(true);
    await fetchNewsCategories();
    setCategLoading(false);
  };

  const handleSetImageToTiny = (fileName: string) => {
    const filePath = "/Images/" + fileName;
    editorRef.current.execCommand(
      "mceInsertContent",
      false,
      `<img alt="" src="${filePath}"/>`
    );
  };

  const loadImages = (childImages: Array<IImage>) => {
    images = childImages;
  };

  const handleSubmit = () => {
    setLoading(true);
    const values = refFormik.current?.values;
    try {
      service
        .loadNews(values as INews)
        .then((id) => {
          let imagesNews: IImagesNewsDTO = {
            newsId: id,
            fileNames: images.map((x) => x.fileName),
          };
          service.connectImagesNews(imagesNews).catch((error) => {
            const errorMessage =
              (error as string) !== null && (error as string) !== undefined
                ? (error as string)
                : "Виникли помилки. Перевірте дані, спробуйте ще раз та зверніться до адміна";
            toast.error(errorMessage as string);
          });
          toast.success("Товар успішно доданий");
        })
        .catch((error) => {
          const errorMessage =
            (error as string) !== null && (error as string) !== undefined
              ? (error as string)
              : "Виникли помилки. Перевірте дані, спробуйте ще раз та зверніться до адміна";
          toast.error(errorMessage as string);
        });
      setLoading(false);
    } catch (error) {
      toast.error(error as string);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="newsAdd">
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
                <Row gutter={6}>
                  <Col span={5} className="gutter-row">
                    <AddImagesContainer
                      defaultImages={images}
                      setImageToTiny={handleSetImageToTiny}
                      loadImagesToParent={loadImages}
                    />
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
    </>
  );
};

export default NewsCreate;
