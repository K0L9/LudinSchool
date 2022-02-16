import { useRef } from "react";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import { Row, Col } from "antd";
import { Editor } from "@tinymce/tinymce-react";

import { config as tinyConfig } from "./tinyConfig";

import CropperWindow from "../../../common/cropper";
import { IImageDTO } from "./types";

const NewsCreate = () => {
  const editorRef = useRef<any>(null);
  const { loadImage } = useActions();
  const { images } = useTypedSelector((redux) => redux.createNews);

  const onImageLoad = async (base64: string) => {
    const body: IImageDTO = { base64 };
    await loadImage(body);
  };

  console.log("images: ", images);

  return (
    <div className="newsAdd">
      <Row gutter={6}>
        <Col span={5} className="gutter-row">
          <div className="imagesContainer">
            {images.map((element, id) => {
              return <img key={id} src={`/Images/${element.fileName}`} />;
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
        <Col span={7} className="gutter-row"></Col>
      </Row>
    </div>
  );
};

export default NewsCreate;
