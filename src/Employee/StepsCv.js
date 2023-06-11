import React, { useEffect, useState } from "react";
import { Button, message, Steps } from "antd";
import { theme } from "antd";
import { EmployeeJob } from "./EmployeeJob";
import { useDispatch, useSelector } from "react-redux";
import {
  AddEmployeeDemands,
  setEmployeeBasicDemands,
  setExperienceProgrammingLanguages,
  setId,
  setIsRegister,
} from "./EmployeeSlice";
import FileUpload from "./FileUpload";

const StepsCv = () => {
  const dispatch = useDispatch();
  const distance = useSelector((state) => state.employee.distance);
  const AddEmployee = useSelector((state) => state.employee.employeeDemands);
  const status = useSelector((state) => state.employee.status);
  const showAfterClickAnalys = useSelector(
    (state) => state.employee.showAfterClickAnalys
  );
  const [isClick, setIsclick] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [employeeJob, setemployeeJob] = useState({
    degree: "",
    army: "",
    jobType: "",
    salary: 0,
    hybrid: false,
  });
  const [selectedLevel, setSelectedLevel] = useState({});
  const sendSuccess = () => {
    messageApi.open({
      type: "success",
      content: "your proccing succesfuly !!!!!",
    });
  };
  const send = async () => {
    if (!isClick) {
      setIsclick(true);
      const newId = await dispatch(AddEmployeeDemands(AddEmployee));
      if (newId.status === 200) {
        message.success("Processing complete!");
      }
      dispatch(setId(newId.payload.id + 1));
      sendSuccess();
      dispatch(setIsRegister(false));
    } else {
      message.error(`Your data has already entered the system`);
    }
  };

  const sendProLang = (arr) => {
    dispatch(setExperienceProgrammingLanguages(arr));
  };

  const steps = [
    {
      title: "First",
      content: (
        <EmployeeJob
          employeeJobSend={setemployeeJob}
          EmployeeJob={employeeJob}
        />
      ),
    },
    {
      title: "Last",
      content: (
        <FileUpload
          setSelectedLevel={setSelectedLevel}
          SelectedLevel={selectedLevel}
          sendProLang={sendProLang}
        />
      ),
    },
  ];
  const [current, setCurrent] = useState(0);
  const next = () => {
    if (current === 0) {
      let missingFields = [];
      if (!employeeJob.jobType) {
        missingFields.push("Job Type");
      }
      if (!employeeJob.salary) {
        missingFields.push("Salary");
      }
      if (!distance) {
        missingFields.push("Distance");
      }
      if (missingFields.length > 0) {
        const missingFieldsMessage = missingFields.join(", ");
        message.error(
          `Please fill in the following required fields: ${missingFieldsMessage}`
        );
        return;
      }
      dispatch(setEmployeeBasicDemands(employeeJob));
    }
    setCurrent(current + 1);
    const employee = {
      id: Number(AddEmployee.id) + 1,
      distance: distance,
    };
    const newArray = JSON.parse(localStorage.getItem("distance"));
    newArray.push(employee);
    localStorage.setItem("distance", JSON.stringify(newArray));
  };
  useEffect(() => {
    localStorage.setItem("distance", JSON.stringify([]));
  }, []);
  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle = {
    textAlign: "center",
    color: theme.useToken().colorTextTertiary,
    backgroundColor: theme.useToken().colorFillAlter,
    borderRadius: theme.useToken().borderRadiusLG,
    border: `1px dashed ${theme.useToken().colorBorder}`,
    marginTop: -266,
    display: "flex",
    justifyContent: "center",
  };

  return (
    <>
      <Steps current={current} items={items} style={{ height: "50vh" }} />
      <div>{contextHolder}</div>
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 119 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button disabled={showAfterClickAnalys} type="primary" onClick={send}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};
export default StepsCv;
