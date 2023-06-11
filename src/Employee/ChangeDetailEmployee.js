import {
  LockOutlined,
  UserOutlined,
  EditOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Input,
  Select,
  AutoComplete,
  Cascader,
  InputNumber,
  Row,
  Form,
  Option,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import GoogleMapsAutocomplete from "./GoogleMaps";
export const EditFromEmployee = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [editMode, setEditMode] = useState(false);
  const [editModePassword, seteditModePassword] = useState(false);
  const [editPassword, setPassword] = useState(false);
  const employee = useSelector((state) => state.employee.currentEmployee);
  const [Employee, setEmployee] = useState({
    AddressEmployee: "",
    PasswordEmployee: "",
    NameEmployee: "",
    Phone: "",
    Email: "",
  });
  useEffect(() => {
    if (employee) {
      setEmployee({
        PasswordEmployee: employee.passwordEmployee,
        NameEmployee: employee.nameEmployee,
        Email: employee.email,
        AddressEmployee: employee.addressEmployee,
        Phone: employee.phone,
      });
    }
  }, []);
  const handleEdit = () => {
    setEditMode(true);
  };
  const handleEditPassword = () => {
    seteditModePassword(true);
    setPassword(true);
  };
  const handleSave = () => {
    setEditMode(false);
    seteditModePassword(false);
    if (Employee.Phone.length < 10) {
      messageApi.error("Please enter a valid phone number (10 digits)");
      return;
    }
    if (editPassword) {
      UpdateByIdWithOutPassword(employee.id);
    }
    // const regex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{7,7}[a-zA-Z0-9]{1}$/;
    // if (!regex.test(Employee.Password)) {
    //   // Password is invalid
    //   checkPassword();
    // }
    else {
      UpdateByIdWithPassword(employee.id);
    }
  };
  const saveEmployeeDetails = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...Employee, [name]: value });
    console.log(Employee);
  };
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Your details have been successfully updated!",
    });
  };
  const errorMessege = () => {
    messageApi.open({
      type: "error",
      content: "This is an error message",
    });
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(Employee);
  };
  const checkPasswordName = () => {
    messageApi.open({
      type: "error",
      content: "This Password and Name alrady exsist",
    });
  };
  const checkPassword = () => {
    messageApi.open({
      type: "error",
      content:
        "Incorrect password needs 8 characters and at least an English letter",
    });
  };
  const UpdateByIdWithPassword = async (EmployeeId) => {
    console.log(Employee);
    debugger;
    try {
      const response = await axios.put(
        `https://localhost:7208/api/EmployeeDetail/Put${EmployeeId}`,
        Employee
      );
      console.log(response.data);
    } catch (error) {
      errorMessege();
    }
  };
  const UpdateByIdWithOutPassword = async (EmployeeId) => {
    try {
      const response = await axios.put(
        `https://localhost:7208/api/EmployeeDetail/PutWithOutPassword${EmployeeId}`,
        Employee
      );
      console.log(response.data);
    } catch (error) {
      errorMessege();
    }
  };
  const phonePattern = "^d{10}$";
  return (
    <div className="Login">
      <form className="login-form" onSubmit={handleSignUp}>
        <h2>Updating your personal details</h2>
        <div>{contextHolder}</div>
        <div>
          <Input
            name="NameEmployee"
            required
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            value={Employee.NameEmployee}
            onChange={saveEmployeeDetails}
            disabled={!editMode}
          />
        </div>
        <div>
          <Input.Password
            name="PasswordEmployee"
            required
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="PasswordEmployee"
            value={Employee.PasswordEmployee}
            onChange={saveEmployeeDetails}
            disabled={!editModePassword}
          />
        </div>
        <div>
          <Input.Password
            name="confirmPassword"
            required="true"
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={!editModePassword}
          />
          {confirmPassword !== Employee.PasswordEmployee && (
            <div style={{ color: "red" }}>
              The two passwords that you entered do not match!
            </div>
          )}
        </div>
        <div>
          <Input
            name="Email"
            type="email"
            required="true"
            placeholder="Email"
            value={Employee.Email}
            onChange={saveEmployeeDetails}
            disabled={!editMode}
          />
        </div>
        <div required="true" message="Please input your phone number!">
          <Input
            name="Phone"
            placeholder="PhonNumber"
            style={{ width: "100%" }}
            value={Employee.Phone}
            onChange={saveEmployeeDetails}
            // pattern={phonePattern}
            title="Please enter a valid phone number (10 digits)"
            disabled={!editMode}
          />
        </div>
        <GoogleMapsAutocomplete />
        <div name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </div>
        <div>
          <Button icon={<EditOutlined />} onClick={handleEdit}>
            Edit
          </Button>
          <Button icon={<SaveOutlined />} onClick={handleSave}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditFromEmployee;
