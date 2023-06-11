import {
  Checkbox,
  Form,
  Input,
  InputNumber,
  Radio,
  message,
} from "antd";
import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDistance } from "./EmployeeSlice";
import "../EmployeeJob.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
const schema = yup.object({
  jobType: yup.string().required(),
  salary: yup.number().min(6000).required(),
  time: yup.number().required(),
});
export const EmployeeJob = ({
  employeeJobSend,
  EmployeeJob,
}) => {

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const RadioGroup = Radio.Group;
  const [selectedOptionJob, setSelectedOptionJob] = useState("");
  const [selectedSalary, setSelectedSalary] = useState(0);
  const employee = useSelector((state) => state.employee.currentEmployee);
  const employeeDemands = useSelector(
    (state) => state.employee.employeeDemands
  );
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const setDistanceInState = (event) => {
    dispatch(setDistance(event));
  };
  const saveJobDetailsAll = (e) => {
    employeeJobSend({
      ...EmployeeJob,
      salary: selectedSalary,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <>
      <div className="Job">
        <Form>
          <h2>Complete the following details</h2>
          <div>{contextHolder}</div>
          <div className="radio">
            <div style={{ color: "red" }}>*</div>
            <p id="radio">Choose a job type</p>
            <RadioGroup
              name="jobType"
              rules={[{ required: true, message: "Please enter the jobType" }]}
              defaultValue={1}
            >
              <Radio
                type="radio"
                value="Part-Time"
                onChange={saveJobDetailsAll}
              >
                {" "}
                Part-Time
              </Radio>
              <Radio
                type="radio"
                value="Full-Time"
                onChange={saveJobDetailsAll}
              >
                {" "}
                Full-Time
              </Radio>
            </RadioGroup>
          </div>
          <Form.Item>
            <div className="travel">
              <div style={{ color: "red" }}>*</div>
              <p>Specify the desired travel time</p>
              <Input
                className="input"
                required
                name="time"
                type="number"
                onChange={(event) => setDistanceInState(event.target.value)}
              />
            </div>
          </Form.Item>
          <div className="checkbox">
            <p>Choose a hybrid job</p>
            <Checkbox
              name="hybrid"
              onChange={saveJobDetailsAll}
              defaultChecked={employeeDemands.hybrid}
            >
              Hybrid
            </Checkbox>
          </div>
          <div className="salary">
            <div style={{ color: "red" }}>*</div>

            <p>Enter Salary</p>
            <InputNumber
              required
              placeholder="Insert salary projections"
              type="number"
              min={6000}
              max={500000}
              step={1000}
              name="salary"
              onChange={(e) => {
                employeeJobSend({ ...EmployeeJob, salary: e });
              }}
              value={EmployeeJob.salary}
              defaultValue={employeeDemands.salary}
            />
          </div>
        </Form>
      </div>
    </>
  );
};
