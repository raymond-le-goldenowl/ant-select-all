import { useCallback } from "react";

import { Button, Form, Select } from "antd";
import { hardCodeRolesAppliedTo } from "./data";

const { Option } = Select;

const SELECT_ALL = "select-all";
import "./styles.css";

export default function App() {
  const [form] = Form.useForm();

  const onFinish = ({ selectMultiple }) => {
    console.log({ selectMultiple });
  };

  // case: select all
  // - if valueSelected equale SELECT_ALL const, we set all data for form
  // and enable all checkboxes
  const onSelected = (valueSelected, option) => {
    if (valueSelected === SELECT_ALL) {
      const newValues = hardCodeRolesAppliedTo.reduce(
        (prev, role) => [...prev, role.value],
        []
      );

      // push object "SELECT_ALL" into array
      newValues.push(SELECT_ALL);

      form.setFieldsValue({ selectMultiple: newValues });
    }
  };

  // case: deselect all
  // - if valueSelected not equale SELECT_ALL const, we set empty data
  // and disabled all checkboxes
  const onDesSelected = (valueSelected) => {
    if (valueSelected === SELECT_ALL) {
      form.setFieldsValue({ selectMultiple: [] });
    }
  };

  /* Render all roles */
  const renderAllRoles = useCallback(() => {
    return [
      <Option
        value={SELECT_ALL}
        label={"Select All"}
        className="select-role"
      />,
      ...hardCodeRolesAppliedTo.map((role) => (
        <Option
          key={role.value}
          value={role.value}
          label={role.label}
          className="select-role"
        />
      )),
    ];
  }, []);

  return (
    <div className="antSelectAllForm">
      <Form name="myForm" onFinish={onFinish} form={form}>
        <Form.Item name="selectMultiple" label="Select[multiple]">
          <Select
            mode="multiple"
            onSelect={onSelected}
            onDeselect={onDesSelected}>
            {renderAllRoles()}
          </Select>
        </Form.Item>

        <Button htmlType="submit">Submit</Button>
      </Form>
    </div>
  );
}
