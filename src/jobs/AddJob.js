import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import React from "react";
import { Alert, Button, Checkbox, InputNumber, message } from "antd";
import CheckSelect from "./CheckSelectLanguages";
import axios from "axios";
import CheckSelectProgrammingLanguages from "./CheckSelectProgrammingLanguages";
import GoogleMapsAutocomplete from "../Employee/GoogleMaps";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Column } from "react-virtualized";
import { setIsRegisterJob } from "../Login/userSlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// מקבל את המשרה מהקומפוננטה של הצגת המשרות בעת לחיצה על הכפתורEDIT של העידכון משרה

const AddJob = ({ jobToEdit, SeteditModel }) => {
  const schema = yup.object({
    email: yup.string().email().required(),
    jobTitle: yup.string().required(),
    jobType: yup.string().required(),
    location: yup.string().required(),
    salary: yup.number().min(8).required(),
  });

  const [JobDetailsAll, setJobDetailsAll] = useState();
  const clear = () => {
    setJobDetailsAll(getInitialJobDetailsAll());
  };
  const currentJob = useSelector((state) => state.user.currentJob);
  const dispatch = useDispatch();
  const setAddress = (value) => {
    setJobDetailsAll({
      ...JobDetailsAll,
      job: { ...JobDetailsAll.job, location: value },
    });
  };

  const [messageApi, contextHolder] = message.useMessage();
  const [isEdit, setIsEdit] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    SaveNewJob(JobDetailsAll);
  };
  const setProgrammingLanguage = (newArr) => {
    setJobDetailsAll({
      ...JobDetailsAll,
      jobExperienceProgrammingLanguage: newArr,
    });
  };
  const setLanguages = (newLanguagesArr) => {
    setJobDetailsAll({ ...JobDetailsAll, jobLanguage: newLanguagesArr });
  };
  const success = () => {
    messageApi.open({
      type: "success",
      content: "This job added to your company jobs !!!!!",
    });
  };
  const saveJobDetailsAll = (e) => {
    setJobDetailsAll({
      ...JobDetailsAll,
      job: {
        ...JobDetailsAll.job,
        [e.target.name]: e.target.checked,
      },
    });
  };

  const saveJobDetails = (e) => {
    setJobDetailsAll({
      ...JobDetailsAll,
      job: { ...JobDetailsAll.job, [e.target.name]: e.target.value },
    });
  };
  const SaveNewJob = async (JobDetailsAll) => {
    try {
      const response = await axios.post(
        "https://localhost:7208/api/JobDetailsAll",
        JobDetailsAll
      );
      if (response.status === 200) {
        success();
        clear();
        dispatch(setIsRegisterJob(false));
      }

      return response.data;
    } catch (error) {
      messageApi.error("error");
      console.log(error);
    }
  };

  const getInitialJobDetailsAll = () => {
    return {
      job: {
        idJob: currentJob.id,
        jobTitle: "",
        army: false,
        degree: false,
        jobType: false,
        hybrid: false,
        location: "",
        salary: 6000,
      },
      jobExperienceProgrammingLanguage: [],
      jobLanguage: [],
    };
  };
  const edit = () => {
    messageApi.open({
      type: "success",
      content: "This job edited !!",
    });
  };
  const Edit = async (e) => {
    e.preventDefault();
    try {
      const editJob = await axios.put(
        `https://localhost:7208/api/JobDetailsAll/${currentJob.id}`,
        JobDetailsAll
      );
      if (editJob.status === 200) {
        edit();
        SeteditModel(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (jobToEdit) {
      setJobDetailsAll({
        job: {
          idJob: jobToEdit.idJob,
          jobTitle: jobToEdit.jobTitle,
          jobType: jobToEdit.jobType,
          hybrid: jobToEdit.hybrid,
          location: jobToEdit.location,
          salary: jobToEdit.salary,
          degree: jobToEdit.degree,
          army: jobToEdit.army,
        },
        jobExperienceProgrammingLanguage:
          jobToEdit.jobExperienceProgrammingLanguages,
        jobLanguage: jobToEdit.jobLanguages,
      });
    } else {
      setJobDetailsAll(getInitialJobDetailsAll());
    }
    setIsEdit(true);
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>{contextHolder}</div>
      <form
        style={{
          width: "30vw",
          border: "1px solid black",
          borderRadius: "10px",
          padding: "7px",
        }}
      >
        <DeleteOutlined onClick={() => clear()} />
        {jobToEdit ? (
          <div>
            <h2>Update Job</h2>
            {/* הוסף את האלמנטים הרלוונטיים לערך jobToEdit */}
          </div>
        ) : (
          <div>
            <h2>Add Job</h2>
            {/* הוסף את האלמנטים הרלוונטיים לערך השני */}
          </div>
        )}
        <strong id="radio">Choose a job type</strong>
        <div className="radio">
          {/* איזה סוג משרה  */}
          {/* מלאה  */}
          <input
            required="true"
            //true
            name="jobType"
            type="radio"
            value="Full"
            onChange={saveJobDetailsAll}
            checked={JobDetailsAll?.job?.jobType}
          />{" "}
          Full-Time
          {/* חלקית  */}
          <input
            name="jobType"
            type="radio"
            value="Part"
            checked={!JobDetailsAll?.job?.jobType}
            onChange={saveJobDetailsAll}
          />{" "}
          Part-Time
          <div name="hybrid" valuePropName="checked" noStyle>
            <Checkbox
              checked={JobDetailsAll?.job?.hybrid}
              name="hybrid"
              onChange={saveJobDetailsAll}
            >
              Hybrid
            </Checkbox>
            <Checkbox
              checked={JobDetailsAll?.job?.army}
              name="army"
              onChange={saveJobDetailsAll}
            >
              Army
            </Checkbox>
            <Checkbox
              checked={JobDetailsAll?.job?.degree}
              name="degree"
              onChange={saveJobDetailsAll}
            >
              Degree
            </Checkbox>
          </div>
        </div>
        {/* שם שפה ומס שנים  */}
        <strong>Select the required languages:</strong>
        <CheckSelect onArrayChangeL={setLanguages} />
        <strong>Select the required professional knowledge:</strong>
        <CheckSelectProgrammingLanguages
          onArrayChangePL={setProgrammingLanguage}
        />
        <div
          className="OptionJob"
          style={{ width: "50%", display: "flex", flexDirection: "column" }}
        >
          <strong>Choose the field of the job</strong>
          <select
            rules={[{ required: true, message: "Please enter the jobTitle" }]}
            value={JobDetailsAll?.job?.jobTitle}
            required="true"
            name="jobTitle"
            onChange={saveJobDetails}
          >
            <option value="">Choose the field of the job</option>
            <option value="Software Developer">Software Developer</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Software testing">Software testing</option>
            <option value="Algorithmic">Algorithmic</option>
            <option value="DevOps">DevOps</option>
            <option value="Automation">Automation</option>
            <option value="Junior Full Stack Engineer">
              Junior Full Stack Engineer
            </option>

            <option value="Frontend/ Full stack">Frontend/ Full stack</option>

            <option value="QA">QA</option>
            <option value="Backend">Backend</option>
          </select>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <strong>Enter job location:</strong>
            <GoogleMapsAutocomplete
              address={JobDetailsAll?.job?.location}
              setAddress={setAddress}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <strong>Enter salary: </strong>
            <InputNumber
              rules={[{ required: true, message: "Please enter the salary" }]}
              style={{ width: "50%" }}
              required="true"
              placeholder="Insert salary projections"
              type="number"
              min={6000}
              max={500000}
              step={1000}
              name="salary"
              onChange={(e) => {
                setJobDetailsAll({
                  ...JobDetailsAll,
                  job: { ...JobDetailsAll.job, salary: e },
                });
              }}
              value={JobDetailsAll?.job?.salary}
            />
          </div>
        </div>
        {jobToEdit ? (
          <div>
            <Button
              style={{ width: "50%" }}
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={Edit}
            >
              Edit Job
            </Button>
          </div>
        ) : (
          <div>
            <Button
              style={{ width: "50%" }}
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={onSubmit}
            >
              Add Job
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddJob;
