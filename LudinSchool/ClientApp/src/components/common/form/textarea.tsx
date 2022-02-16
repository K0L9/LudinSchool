import { Form, Input } from "antd";

var classNames = require("classnames");

export interface ITextareaProps {
  label: string;
  error: string;
  placeholder: string;
  field: string;
  value: string;
  className: string;
  touched: boolean;
  onChange: (e: any) => any;
}

const Textarea = ({
  label,
  error,
  placeholder,
  field,
  value,
  className,
  touched,
  onChange,
}: ITextareaProps) => {
  return (
    <Form.Item
      label={label}
      hasFeedback
      validateStatus={classNames(
        { error: touched && error },
        { success: touched && !error }
      )}
      help={error}
    >
      <Input.TextArea
        placeholder={placeholder}
        onChange={onChange}
        name={field}
        value={value}
        id={field}
        className={className}
        showCount
        maxLength={250}
      />
    </Form.Item>
  );
};

export default Textarea;
