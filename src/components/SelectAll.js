import { Select } from "antd";

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const SelectAll = () => {
  return (
    <Select
      mode="multiple"
      allowClear
      style={{ width: "100%" }}
      placeholder="Please select"
      defaultValue={["a10", "c12"]}
      onChange={handleChange}
    >
      {children}
    </Select>
  );
};

export default SelectAll;
