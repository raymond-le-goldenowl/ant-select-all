import { useCallback, useState } from "react";

import { Button, Form, Select, Input } from "antd";
import { hardCodeRolesAppliedTo } from "./data";

const { Option } = Select;

const SELECT_ALL = "select-all";

export default function App() {
  const [isSelectAll, setIsSelectAll] = useState(false);

  // const [isSelectSetSingle, setIsSelectSetSingle] = useState(false);

  const [form] = Form.useForm();

  const onFinish = ({ selectMultiple }) => {
    console.log({ selectMultiple });
  };

  // case: select all
  // - if valueSelected equale SELECT_ALL const, we set all data for form
  // and enable all checkboxes
  const onSelected = (valueSelected) => {
    if (valueSelected === SELECT_ALL) {
      const newValues = hardCodeRolesAppliedTo.reduce(
        (prev, role) => [...prev, role.value],
        []
      );

      // push object "select-all" into array
      newValues.push({ value: SELECT_ALL, label: SELECT_ALL });

      form.setFieldsValue({ selectMultiple: newValues });
      setIsSelectAll(true);
    }

    // Inital the API was handle this case
    // else {
    //   const selectMultiple = form.getFieldValue("selectMultiple") || [];

    //   selectMultiple.push(valueSelected);

    //   form.setFieldsValue({ selectMultiple });
    // }
  };

  // case: deselect all
  // - if valueSelected not equale SELECT_ALL const, we set empty data
  // and disabled all checkboxes
  const onDesSelected = (valueSelected) => {
    if (valueSelected === SELECT_ALL) {
      form.setFieldsValue({ selectMultiple: [] });
      setIsSelectAll(false);
    }

    // Inital the API was handle this case
    // else {
    //   const selectMultiple = form.getFieldValue("selectMultiple") || [];

    //   const newValues = selectMultiple.filter(
    //     (eachData) => eachData !== valueSelected
    //   );

    //   form.setFieldsValue({ selectMultiple: newValues });
    // }
  };

  /* Render all roles */
  const renderAllRoles = useCallback(() => {
    return hardCodeRolesAppliedTo.map((role) => (
      <Option key={role.value} value={role.value} label={role.label}>
        <span>{role.label}</span>
        <Input
          style={{
            width: "15px",
            height: "15px"
          }}
          type="checkbox"
          checked={isSelectAll ? true : false}
        />
      </Option>
    ));
  }, [isSelectAll]);

  return (
    <div className="antSelectAllForm">
      <Form name="myForm" onFinish={onFinish} form={form}>
        <Form.Item name="selectMultiple" label="Select[multiple]">
          <Select
            mode="multiple"
            onSelect={onSelected}
            onDeselect={onDesSelected}
            onClick={(e) => {
              console.log(e);
            }}
          >
            <Option value={SELECT_ALL} label={"Select All"}></Option>
            {renderAllRoles()}
          </Select>
        </Form.Item>

        <Button htmlType="submit">Submit</Button>
      </Form>
    </div>
  );
}
