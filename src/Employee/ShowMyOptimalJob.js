import React, { useState, useEffect } from "react";
import { Button, Spin, Table, message } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setListOfApplicants } from "../Login/userSlice";

const ShowMyOptimalJob = () => {
  const dispatch = useDispatch();
  const current = useSelector((state) => state.employee.employeeDemands);
  const [data, setData] = useState([]);
  const [isLouding, setIsLoading] = useState(false);
  const employee = useSelector((state) => state.employee.employeeDemands);
  const [messageApi, contextHolder] = message.useMessage();
  const [isCheck, setIscheck] = useState(false);
  const [distance, setDistance] = useState(0);
  const [isDisplayTable, setIsDisplayTable] = useState(false);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const handleExpand = (record) => {
    if (expandedJobId === record.id) {
      setExpandedJobId(null);
    } else {
      setExpandedJobId(record.id);
    }
  };
  const [datafrom, SetDatafrom] = useState();
  const jobData = [];
  const initData = () => {
    for (let i = 0; i < data.length; i++) {
      jobData.push({
        key: i,
        mark: data[i].mark,
        jobName: data[i].jobName,
        army: data[i].job.army,
        id: data[i].job.id,
        jobLanguage: data[i].jobLanguage,
        jobExperienceProgrammingLanguage:
          data[i].jobExperienceProgrammingLanguage,
        degree: data[i].job.degree,
        hybrid: data[i].job.hybrid,
        jobType: data[i].job.jobType,
        jobTitle: data[i].job.jobTitle,
        location: data[i].job.location,
        salary: data[i].job.salary,
      });
    }

    SetDatafrom(jobData);
  };
  const MyEnum = {
    1: "basic",
    2: "full professional",
    3: "very high",
    4: "fluent",
    5: "mother language",
  };
  useEffect(() => {
    debugger;
    initData();
  }, [data]);

  const success = () => {
    messageApi.open({
      type: "success",
      content: "There are no optimal jobs for you !!!!!",
    });
  };
  const Apply = () => {
    messageApi.open({
      type: "success",
      content: "your apply success !!!!!",
    });
  };
  const columns = [
    { title: "Name", dataIndex: "jobTitle", key: "jobTitle" },
    {
      title: "Action",
      dataIndex: "",
      key: 1,

      render: (text, record) => (
        <>
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <strong>For more details </strong>
              <br />
              <Link target="_blank" to={record.link}>
                Apply on the company's website
              </Link>
            </div>
            <Button
              onClick={() =>
                sendMessageToJob(record.mark, record.id, record.jobName)
              }
            >
              Applying for this job
            </Button>
          </div>
        </>
      ),
    },
  ];
  const sendMessageToJob = (mark, id, jobName) => {
    const employee = {
      name: current.nameEmployee,
      mark: mark,
      id: id,
      jobName: jobName,
    };
    const newArray = JSON.parse(localStorage.getItem("ListOfApplicants"));

    newArray.push(employee);
    localStorage.setItem("ListOfApplicants", JSON.stringify(newArray));
    setIscheck(true);
    dispatch(setListOfApplicants(employee));
    Apply();
  };
  let distanceArray = [];
  useEffect(() => {
    setIsLoading(true);
    localStorage.setItem("ListOfApplicants", JSON.stringify([]));
    distanceArray = JSON.parse(localStorage.getItem("distance"));
    let dist;
    for (let i = 0; i < distanceArray.length; i++) {
      if (distanceArray[i].id == employee.id) dist = distanceArray[i].distance;
    }
    if (dist === undefined) {
      setDistance(30);
    } else {
      setDistance(dist);
    }
  }, []);
  useEffect(() => {
    if (distance != 0) fetchJobData();
  }, [distance]);
  const fetchJobData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://localhost:7208/api/CorectCv?distance=${distance}&Id=${employee.id}`
      );
      if (response.data) {
        setIsLoading(false);
      }
      if (response.data.length != 0) {
        let arr = response.data.filter(
          (d) =>
            d.job.degree == current.degree ||
            (current.degree == true && d.job.degree == false)
        );
        setData(arr);
        if (arr.length == 0) success();
        else {
          setIsDisplayTable(true);
        }
      } else {
        success();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLouding && (
        <Spin
          style={{ display: "flex", justifyContent: "center" }}
          size="large"
        />
      )}
      <div>{contextHolder}</div>
      {!isLouding && datafrom && isDisplayTable && (
        <Table
          columns={columns}
          expandedRowRender={(record) => (
            <>
              <div>
                <p>
                  <strong>Job company:</strong> {record.jobName}
                </p>
                <p>
                  <strong>Job Title:</strong> {record.jobTitle}
                </p>
                <p>
                  <strong>JobType:</strong>{" "}
                  {record.jobType === false ? "Part Time" : "Full Time"}
                </p>
                <p>
                  <strong>Army:</strong>{" "}
                  {record.army === true
                    ? "A background of military service is required"
                    : "No military background is necessary"}
                </p>
                <p>
                  <strong>Degree:</strong>{" "}
                  {record.degree === true
                    ? "You need a degree for this job"
                    : "No"}
                </p>
                <p>
                  <strong>Hybrid:</strong>{" "}
                  {record.hybrid === true
                    ? "This job is hybrid"
                    : "This job is not hybrid"}
                </p>

                <p>
                  <strong>Job Experience Programming Languages:</strong>
                </p>
                {record?.jobExperienceProgrammingLanguage?.map((jepl) => (
                  <p key={jepl.programmingLanguage}>
                    <strong>{jepl.programmingLanguage}:</strong>
                    {jepl.numberOfYears === 0 ? (
                      <span>Advantage</span>
                    ) : (
                      <span>{jepl.numberOfYears} years</span>
                    )}
                  </p>
                ))}

                <strong>The Languages:</strong>
                {record?.jobLanguage?.map((jepl) => (
                  <p key={jepl.spokenlanguage}>
                    <li>{jepl.spokenlanguage}</li>
                    <strong>the level of knowledge:</strong>
                    {MyEnum[jepl.levelOfKnowledge]}
                  </p>
                ))}
                <p>
                  <strong>Salary:</strong> {record.salary}
                </p>
                <p>
                  <strong>Location:</strong> {record.location}
                </p>
              </div>
            </>
          )}
          dataSource={datafrom ? datafrom : []}
          onExpand={handleExpand}
        />
      )}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "13vw",
          }}
        ></div>
      </div>
    </>
  );
};

export default ShowMyOptimalJob;
