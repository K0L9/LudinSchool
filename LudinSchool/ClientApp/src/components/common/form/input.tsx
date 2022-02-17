import { Input as AntInput, Form } from "antd";

var classNames = require("classnames");

export interface IInputProps {
  // label: string;
  error: string;
  placeholder: string;
  field: string;
  value: string;
  className: string;
  touched: boolean;
  onChange: (e: any) => any;
}

const Input = ({
  error,
  placeholder,
  field,
  value,
  className,
  touched,
  onChange,
}: IInputProps) => {
  let type = "";
  if (touched) {
    if (error) type = "error";
    else type = "success";
  }
  return (
    <Form.Item
      hasFeedback
      validateStatus={classNames(
        { error: touched && error },
        { success: touched && !error }
      )}
      help={error}
    >
      <AntInput
        placeholder={placeholder}
        name={field}
        id={field}
        value={value}
        onChange={onChange}
        className={className}
        size="large"
      />
    </Form.Item>
  );
};
export default Input;
