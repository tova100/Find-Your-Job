import React, { useState } from "react";
import * as BiIcons from "react-icons/bi";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "antd/es/modal/Modal";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, setCurrentJob, setIsRegisterJob } from "./userSlice";
import {
  loginEmployee,
  setIsRegister,
  setIsShowcv,
} from "../Employee/EmployeeSlice";

function SignIn() {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [showModal, setShowModal] = useState(false);
  const [recruitment, setRecruitment] = useState(null);
  const [jobSearch, setJobSearch] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation();
  const isJobSearch = location.state?.isJobSearch;
  const check = () => {
    if (isJobSearch) {
      setShowModal(false);
      navigate("/SignUpEmployee");
    } else {
      setShowModal(false);
      navigate("/SignUpJob");
    }
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: " wrong username or password!!!!!",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const employee = {
      username: userName,
      password: password,
    };

    console.log(userName);
    console.log(password);
    try {
      if (isJobSearch) {
        const dataCV = await SignInJobSearch(employee);
        if (dataCV.payload !== "") {
          // setJobSearch(dataCV);
          setShowModal(false);
          dispatch(setIsRegister(false));
          navigate("/EmployeeMenu", { state: { dataCV } });
        } else {
          if (dataCV.payload == "") error();
        }
      } else {
        const data = await SignInRecruitment(employee);
        if (data.payload !== "") {
          setRecruitment(data);
          setShowModal(false);
          dispatch(setCurrentJob(data.payload));
          dispatch(setIsRegisterJob(false));
          navigate("/jobMenu");
        } else {
          error();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleCancel() {
    setShowModal(false);
  }
  const SignInJobSearch = async (employee) => {
    let res = await dispatch(loginEmployee(employee));
    return res;
  };
  const SignInRecruitment = async (employee) => {
    let res = await dispatch(login(employee));
    return res;
  };
  useEffect(() => {
    setShowModal(true);
  }, []);
  return (
    <div className="Login">
      <div>{contextHolder}</div>
      <Modal
        className="ModelSignIn"
        open={showModal}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <form className="login-form" initialValues={{ remember: true }}>
            <BiIcons.BiArrowBack />
            <h2 id="h2">sign in</h2>
            <div
              name="username"
              required="true"
              message="Please input your Username!"
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div
              name="password"
              required="true"
              message="Please input your Password!"
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={handleSubmit}
              >
                Sign in
              </Button>
              <Button className="login-form-button" onClick={check}>
                Register now!
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
export default SignIn;
