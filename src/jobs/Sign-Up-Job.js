import axios from "axios";
import { LockOutlined, UserOutlined, LinkOutlined } from "@ant-design/icons";
import { Button, Input, InputNumber, Form, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleMapsAutocomplete from "../Employee/GoogleMaps";
import { login, setCurrentJob, setIsRegisterJob } from "../Login/userSlice";
import { useDispatch } from "react-redux";
import { useForm } from "antd/es/form/Form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  email: yup.string().email().required(),
  jobName: yup.string().required(),
  link: yup.string().required(),
  jobAddress: yup.string(),
  passwordJob: yup.string().min(8).required(),
});

function SignUpJob() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userJob, setUserJob] = useState({
    passwordJob: "",
    jobName: "",
    email: "",
    jobAddress: "",
    link: "",
  });

  const [messageApi, contextHolder] = message.useMessage();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const checkPassword = () => {
    messageApi.open({
      type: "error",
      content:
        "Incorrect password. It needs to have 8 characters and at least one English letter",
    });
  };

  const saveUserJob = (name, value) => {
    setUserJob({ ...userJob, jobAddress: address, [name]: value });
  };

  const handleSignUp = async () => {
    await sendPersonalInformationJob(userJob);
  };

  const successAdd = () => {
    messageApi.open({
      type: "success",
      content: "Your details have been successfully added!",
    });
  };

  const sendPersonalInformationJob = async (jobname) => {
    try {
      const response = await axios.post(
        "https://localhost:7208/api/JobDetail/Post",
        jobname
      );
      if (response.status === 200) {
        successAdd();
        dispatch(setCurrentJob(response.data));
        dispatch(setIsRegisterJob(true));
        navigate("/jobMenu");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data) => {
    handleSignUp();
  };

  return (
    <div className="Login">
      <Form className="login-form" onFinish={onSubmit}>
        <h2>Sign Up Company</h2>
        <div>{contextHolder}</div>
        <Form.Item
          name="jobName"
          rules={[{ required: true, message: "Please enter the job name" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Job Name"
            onChange={(e) => saveUserJob("jobName", e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="passwordJob"
          rules={[{ required: true, message: "Please enter the password" }]}
        >
          <Input.Password
            placeholder="Password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            onChange={(e) => saveUserJob("passwordJob", e.target.value)}
          />
        </Form.Item>
        <Form.Item name="confirmPassword" dependencies={["passwordJob"]}>
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPassword !== userJob.passwordJob && (
            <div style={{ color: "red" }}>
              The two passwords that you entered do not match!
            </div>
          )}
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid email",
            },
          ]}
        >
          <Input
            type="email"
            placeholder="Email"
            onChange={(e) => saveUserJob("email", e.target.value)}
          />
        </Form.Item>
        <GoogleMapsAutocomplete address={address} setAddress={setAddress} />
        <Form.Item
          name="link"
          rules={[{ required: true, message: "Please enter the link" }]}
        >
          <Input
            prefix={<LinkOutlined />}
            placeholder="Link of company website"
            onChange={(e) => saveUserJob("link", e.target.value)}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Sign up
        </Button>
      </Form>
    </div>
  );
}
export default SignUpJob;
