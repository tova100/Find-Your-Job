import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import GoogleMapsAutocomplete from "./GoogleMaps";
import { setEmployeeDetail, setIsRegister, setIsShowcv } from "./EmployeeSlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const schema = yup.object({
  Email: yup.string().email().required(),
  NameEmployee: yup.string().required(),
  AddressEmployee: yup.string(),
  PasswordEmployee: yup.string().min(8).required(),
  Phone: yup.string().required(),
});
export const SignUp = () => {
  const dispatch = useDispatch();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    AddressEmployee: "",
    PasswordEmployee: "",
    NameEmployee: "",
    Phone: "",
    Email: "",
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const setAddress = (value) => {
    setEmployee({ ...employee, AddressEmployee: value });
  };

  const saveEmployeeDetails = (name, value) => {
    setEmployee({ ...employee, [name]: value });
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Your details have been successfully added!",
    });
  };

  const handleSignUp = async (data) => {
    if (employee.Phone.length < 10) {
      messageApi.error("Please enter a valid phone number (10 digits)");
      return;
    } else {
      signUpEmployee();
    }
  };

  const signUpEmployee = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7208/api/EmployeeDetail/PostEmployee",
        employee
      );
      if (response.status === 200) {
        success();
        debugger;
        const data = response.data;
        dispatch(setEmployeeDetail(response.data));
        dispatch(setIsRegister(true));
        dispatch(setIsShowcv(true));

        navigate("/EmployeeMenu", { state: { data } });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Login">
      <Form className="login-form" onFinish={handleSignUp}>
        <h2>Sign Up</h2>
        <div>{contextHolder}</div>
        <Form.Item
          name="NameEmployee"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            value={employee.NameEmployee}
            onChange={(e) =>
              saveEmployeeDetails("NameEmployee", e.target.value)
            }
          />
        </Form.Item>
        <Form.Item
          name="PasswordEmployee"
          rules={[{ required: true, message: "Please enter the password" }]}
        >
          <Input.Password
            placeholder="Password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            onChange={(e) =>
              saveEmployeeDetails("PasswordEmployee", e.target.value)
            }
          />
        </Form.Item>
        <Form.Item name="confirmPassword" dependencies={["PasswordEmployee"]}>
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPassword !== employee.PasswordEmployee && (
            <div style={{ color: "red" }}>
              The two passwords that you entered do not match!
            </div>
          )}
        </Form.Item>
        <Form.Item
          name="Email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid email",
            },
          ]}
        >
          <Input
            placeholder="Email"
            value={employee.Email}
            onChange={(e) => saveEmployeeDetails("Email", e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="Phone"
          rules={[
            {
              required: true,
              message: "Please enter a valid phone",
            },
          ]}
        >
          <Input
            placeholder="PhoneNumber"
            maxLength={10}
            style={{ width: "100%" }}
            value={employee.Phone}
            onChange={(e) => saveEmployeeDetails("Phone", e.target.value)}
            title="Please enter a valid phone number (10 digits)"
          />
        </Form.Item>
        <GoogleMapsAutocomplete
          address={employee.AddressEmployee}
          setAddress={setAddress}
        />
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
