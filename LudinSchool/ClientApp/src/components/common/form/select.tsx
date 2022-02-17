import { Select as AntSelect, Form } from "antd";
import { INewsCategory } from "../../admin/news/newsCategories/types";
const { Option } = AntSelect;

var classNames = require("classnames");

export interface ISelectProps {
  options: Array<INewsCategory>;
  loading: boolean;
  onChange: (e: any) => any;
  placeholder: string;
  error: string;
  touched: boolean;
  field: string;
  value: number;
  // label: string;
  className: string;
}

const Select = ({
  options,
  loading,
  onChange,
  placeholder,
  error,
  touched,
  field,
  value,
  className,
}: // label,
ISelectProps) => {
  return (
    <Form.Item
      hasFeedback
      validateStatus={classNames(
        { error: error && touched },
        { success: !error && touched },
        { loading: loading }
      )}
      name={field}
      // label={label}
      help={error}
    >
      <AntSelect
        showSearch
        placeholder={placeholder}
        optionFilterProp="children"
        filterOption={(input: any, option: any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        onChange={onChange}
        id={field}
        value={value}
        loading={loading}
        className={className}
        size="large"
      >
        {options.map((e, i) => {
          return (
            <Option key={i} value={e.id}>
              {e.name}
            </Option>
          );
        })}
      </AntSelect>
    </Form.Item>
  );
};

export default Select;
