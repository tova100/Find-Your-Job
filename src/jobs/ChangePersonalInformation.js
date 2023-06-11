import React, { useState, useEffect } from "react";
import { Button, Input, message } from "antd";
import { useSelector } from "react-redux";
import {
  LockOutlined,
  UserOutlined,
  EditOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import axios from "axios";
import GoogleMapsAutocomplete from "../Employee/GoogleMaps";

const UserJobForm = () => {
  const [editMode, setEditMode] = useState(false);
  const [address, setAddress] = useState("");

  const [messageApi, contextHolder] = message.useMessage();
  const [isLouding, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const user = useSelector((state) => state.user.currentUser);
  const [UserJob, setUserJob] = useState({
    PasswordJob: "",
    JobName: "",
    Email: "",
    JobAddress: "",
  });

  const [originalUserJob, setOriginalUserJob] = useState(UserJob);
  useEffect(() => {
    if (user) {
      setUserJob({
        PasswordJob: user.passwordJob,
        JobName: user.jobName,
        Email: user.email,
        JobAddress: user.jobAddress,
      });
    }
  }, []);
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
  const saveUserJob = (e) => {
    const { name, value } = e.target;
    if (editMode) {
      setUserJob({ ...UserJob, [name]: value });
    }
  };

  const handleEdit = () => {
    setEditMode(true);
    setOriginalUserJob(UserJob);
  };
  const checkPassword = () => {
    messageApi.open({
      type: "error",
      content:
        "Incorrect password needs 8 characters and at least an English letter",
    });
  };
  const handleSave = () => {
    setEditMode(false);
    UpdateById(user.id);
  };
  const UpdateById = async (userId) => {
    console.log(UserJob);
    setIsLoading(true);
    try {
      const response = await axios.put(
        `https://localhost:7208/api/JobDetail/${userId}`,
        UserJob
      );

      console.log(response.data);
      if (response.status === 200) {
        success();
      }
    } catch (error) {
      setIsLoading(false);
      errorMessege();

      console.log(error);
    }
  };
  return (
    <div className="UpdateJob">
      <form className="login-form">
        <h2>Updating company information</h2>
        <div>
          <div>{contextHolder}</div>
          <Input
            name="JobName"
            required="true"
            prefix={<UserOutlined className="site-form-item-icon" />}
            value={UserJob.JobName}
            onChange={saveUserJob}
            disabled={!editMode}
          />
        </div>
        <GoogleMapsAutocomplete address={address} setAddress={setAddress} />
        <div>
          <Input
            name="Email"
            type="email"
            placeholder="Email"
            value={UserJob.Email}
            onChange={saveUserJob}
            disabled={!editMode}
          />
        </div>
        <div>
          <Input.Password
            name="PasswordJob"
            required="true"
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            value={UserJob.PasswordJob}
            onChange={saveUserJob}
            disabled={!editMode}
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
            disabled={!editMode}
          />
          {confirmPassword !== UserJob.PasswordJob && (
            <div style={{ color: "red" }}>
              The two passwords that you entered do not match!
            </div>
          )}
          <div>
            <Button icon={<EditOutlined />} onClick={handleEdit}>
              Edit
            </Button>
            <Button icon={<SaveOutlined />} onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserJobForm;
