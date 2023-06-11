import { Button, Table } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import StepsCv from "./StepsCv";

function ShowCV(props) {
  const MyEnum = {
    1: "basic",
    2: "full professional",
    3: "very high",
    4: "fluent",
    5: "mother language",
  };

  function getEmployeeData(showcv, employeeDemands, currentEmployee) {
    if (showcv) {
      return employeeDemands;
    } else {
      return currentEmployee;
    }
  }

  const showcv = useSelector((state) => state.employee.showcv);
  const employeeDemands = useSelector(
    (state) => state.employee.employeeDemands
  );
  const currentEmployee = useSelector(
    (state) => state.employee.currentEmployee
  );

  const employee = getEmployeeData(showcv, employeeDemands, currentEmployee);

  const details = [
    {
      nameEmployee: employee.nameEmployee,
      addressEmployee: employee.addressEmployee,
      email: employee.email,
      phone: employee.phone,
    },
  ];

  const [isShowCV, setIsShowCV] = useState(false);
  const columnsMyDetails = [
    {
      title: "My Name",
      dataIndex: "nameEmployee",
      key: "nameEmployee",
      width: "20%",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
    },
    {
      title: "Address",
      dataIndex: "addressEmployee",
      key: "addressEmployee",
      width: "20%",
    },
  ];

  const columnsProgrammingLanguage = [
    {
      title: "Name",
      dataIndex: "programmingLanguage",
      key: "nameLanguage",
      width: "30%",
    },
    {
      title: "Years of Experience",
      dataIndex: "numberOfYears",
      key: "numberOfYears",
      width: "20%",
    },
  ];
  const columnsLanguage = [
    {
      title: "NameLanguage",
      dataIndex: "spokenlanguage",
      key: "spokenlanguage",
      width: "30%",
    },
    {
      title: "Level of knowledge",
      dataIndex: "levelOfKnowledge",
      key: "levelOfKnowledge",
      width: "20%",
      render: (levelOfKnowledge) => MyEnum[levelOfKnowledge],
    },
  ];
  const columnsProfessionalknowledges = [
    {
      title: "NameLanguage",
      dataIndex: "nameLanguage",
      key: "nameLanguage",
      width: "30%",
    },
  ];
  const url = useSelector((state) => state.employee.pathPdf);
  const [isLouding, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [fileupload, setFileupload] = useState(false);

  const showFileuploadcomponnent = () => {
    setFileupload(true);
    setIsShowCV(false);
  };
  const showCV = () => {
    setIsShowCV(true);
    setFileupload(false);
  };
  const handleButtonClick = () => {
    // setShowPDF(true);
    window.open(url, "_blank");
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={showCV}>Show cv analyse</Button>
        <Button onClick={handleButtonClick}>Show PDF</Button>
        <Button onClick={showFileuploadcomponnent}>Update Details cv</Button>
      </div>
      {isShowCV && (
        <form
          style={{
            height: "52vh",
            width: "60vw",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                textAlign: "center",
              }}
            >
              <h2 style={{ textAlign: "center" }}>My cv Details</h2>
              {employee && (
                <Table
                  columns={columnsMyDetails}
                  dataSource={details}
                  pagination={false}
                />
              )}

              <h2 style={{ textAlign: "center" }}>Experience</h2>
              <Table
                columns={columnsProgrammingLanguage}
                dataSource={employee.experienceProgrammingLanguages}
                pagination={false}
              />

              <h2 style={{ textAlign: "center" }}>Language</h2>
              <Table
                columns={columnsLanguage}
                dataSource={Object.values(employee.languages)}
                pagination={false}
              />

              <h2 style={{ textAlign: "center" }}>Professional Knowledges</h2>
              <Table
                columns={columnsProfessionalknowledges}
                dataSource={Object.values(employee.professionalknowledges)}
                pagination={false}
              />
            </div>
          </div>
        </form>
      )}

      {fileupload && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <p style={{ textAlign: "center" }}>Upload an updated resume</p>
            <StepsCv />
          </div>
        </div>
      )}
    </>
  );
}

export default ShowCV;
