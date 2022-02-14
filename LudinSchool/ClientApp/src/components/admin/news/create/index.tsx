import { useRef } from "react";

import { Row, Col } from "antd";
import { Editor } from "@tinymce/tinymce-react";

import { config as tinyConfig } from "./tinyConfig";

const NewsCreate = () => {
  const editorRef = useRef<any>(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <div className="newsAdd">
      <Row gutter={6}>
        <Col span={5} className="gutter-row">
          <img src="/Images/7b9f41477da5f240b24bd67216dd7.jpg" alt="" />
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
