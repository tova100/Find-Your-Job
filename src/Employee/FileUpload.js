import { Input, Select, Spin, Table, message } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmployeeBasicDemands,
  setEmployeeDemandsFromaAnalayse,
  setLanguages,
  setpathPdf,
  setshowAfterClickAnalys,
} from "./EmployeeSlice";
import ProgrammingLanguageSelect from "./ProgrammingLanguageSelect";
import { Button } from "antd";
import { Option } from "antd/es/mentions";

function FileUpload({ SelectedLevel, setSelectedLevel, sendProLang, isEdit }) {
  const columns = [
    {
      title: "DetailsCV",
      dataIndex: "detailsCV",
      key: "detailsCV",
    },
  ];
  const LanguageProficiency = {
    "no data": "0",
    "very high": "3",
    "mother language": "5",
    fluent: "4",
    basic: "1",
    "native language": "5",
    "mother tongue": "5",
    "full professional": "2",
    "high level": "4",
  };

  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [analayseResult, setAnalayseResult] = useState(null);
  const employee = useSelector((state) => state.employee.currentEmployee);
  const AddEmployee = useSelector((state) => state.employee.employeeDemands);
  const [Army, setArmy] = useState();
  const [Degree, setDegree] = useState();
  const [url, setUrl] = useState();
  const [isLouding, setisLouding] = useState(false);
  const [isDisplayTable, setIsDisplayTable] = useState(false);
  const [isClick, setiIsClick] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [isNotLevel, setIsNotLevel] = useState(false);
  const [showbuttoncvanalyse, Setshowbuttoncvanalyse] = useState(false);

  const handleButtonClick = () => {
    window.open(url, "_blank");
  };
  useEffect(() => {
    if (!isLouding && isClick) {
      debugger;
      const arraytemp = [];
      AddEmployee.languages.map((l) =>
        l.levelOfKnowledge != "no data"
          ? arraytemp.push({
              spokenlanguage: l.namelanguage,
              levelOfKnowledge: LanguageProficiency[l.levelOfKnowledge],
            })
          : setIsNotLevel(true)
      );
      setSelectedLevel(arraytemp);
      dispatch(setLanguages(arraytemp));
      setiIsClick(false);
    }
  }, [isLouding, isNotLevel]);
  useEffect(() => {
    if (isNotLevel) {
      complitelevel();
    }
  }, [isNotLevel]);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUrl(event.target.files[0]);
    setUrl(`http://localhost:8080/${event.target.files[0].name}`);
    Setshowbuttoncvanalyse(true);
    dispatch(setpathPdf(url));
  };
  const [filteredLanguages, setFilteredLanguages] = useState({});
  useEffect(() => {
    if (Army !== undefined && Degree !== undefined) {
      const employeeJob = {
        degree: Degree,
        army: Army,
        hybrid: AddEmployee.hybrid,
        jobType: AddEmployee.jobType,
        salary: AddEmployee.salary,
      };
      dispatch(setEmployeeBasicDemands(employeeJob));
    }
  }, [Degree, Army]);
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setiIsClick(true);
    debugger;
    setisLouding(true);
    if (!selectedFile) {
      message.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    if (isEdit) {
    }
    try {
      setisLouding(true);
      let response = await axios.post(
        `https://localhost:7208/api/CorectCv?id${employee.id}`,
        formData
      );
      if (response.data) {
        setisLouding(false);
        setIsDisplayTable(true);

        const analayseResult = {
          experienceProgrammingLanguages: response.data.experienceProgramming,
          languages: response.data.language.sort(),
          professionalknowledges: response.data.nameProgramminglanguage,
        };
        setArmy(response.data.isArmy);
        setDegree(response.data.detailsEducation);
        setTableData([...tableData, analayseResult]);
        setAnalayseResult(analayseResult);
        dispatch(setshowAfterClickAnalys(false));
        await dispatch(setEmployeeDemandsFromaAnalayse(analayseResult));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLevelChange = (language, event) => {
    const value = event;
    setSelectedLevel({
      ...SelectedLevel,
      [language]: {
        spokenlanguage: language,
        levelOfKnowledge: value,
      },
    });
    dispatch(
      setLanguages(
        Object.values({
          ...SelectedLevel,
          [language]: { spokenlanguage: language, levelOfKnowledge: value },
        })
      )
    );
  };

  const columnsProfessionalknowledges = [
    {
      title: "nameLanguage",
      dataIndex: "nameLanguage",
      width: "30%",
    },
  ];
  const languages = [
    {
      title: "NameLanguage",
      dataIndex: "namelanguage",
      key: "namelanguage",
      width: "30%",
    },
    {
      title: "levelOfKnowledge",
      dataIndex: "levelOfKnowledge",
      key: "levelOfKnowledge",
      width: "30%",

      render: (text, record) => {
        if (
          record.levelOfKnowledge === "no data" &&
          record.namelanguage !== ""
        ) {
          return (
            <div>
              <Select
                defaultValue="basic"
                style={{ width: 200 }}
                onChange={(value) => {
                  handleLevelChange(
                    record.namelanguage,
                    LanguageProficiency[value]
                  );
                }}
              >
                <Option value="basic">basic</Option>
                <Option value="high level">high level</Option>
                <Option value="fluent">fluent</Option>
                <Option value="mother language">mother language</Option>
                <Option value="very high">very high</Option>
              </Select>
              {/* <Input
                type="number"
                min={1}
                max={5}
                style={{ padding: "5px", width: 100 }}
                onChange={(e) => handleLevelChange(record.namelanguage, e)}
              /> */}
            </div>
          );
        } else {
          if (record.namelanguage !== "") {
            return (
              <>
                <span>{text}</span>
              </>
            );
          }

          return null;
        }
      },
    },
  ];
  const complitelevel = () => {
    messageApi.open({
      type: "success",
      content: "complite your level of languges !!!!!",
    });
  };

  const data = [
    {
      key: 1,
      detailsCV: "Exprience",

      description: analayseResult?.experienceProgrammingLanguages && (
        <ProgrammingLanguageSelect
          experienceProgrammingLanguages={
            analayseResult.experienceProgrammingLanguages
          }
          sendProLang={sendProLang}
        />
      ),
    },
    {
      key: 2,
      detailsCV: "Professional knowledge",

      description: analayseResult &&
        analayseResult.professionalknowledges &&
        analayseResult.professionalknowledges.length > 0 && (
          <Table
            columns={columnsProfessionalknowledges}
            dataSource={analayseResult.professionalknowledges}
            pagination={false}
          />
        ),
    },
    {
      key: 3,
      detailsCV: "Languages",
      description: analayseResult &&
        analayseResult.languages &&
        analayseResult.languages.length > 0 && (
          <Table
            columns={languages}
            dataSource={filteredLanguages}
            pagination={false}
          />
        ),
    },
    {
      key: 4,
      detailsCV: "Degree",
      description: Degree,
    },
    {
      key: 5,
      detailsCV: "Army",
      description: Army,
    },
  ];
  const renderProgrammingLanguages = (record) => {
    if (record.key == 1) {
      if (!record.description.props.experienceProgrammingLanguages) {
        return null;
      } else {
        return (
          <>
            <ProgrammingLanguageSelect
              experienceProgrammingLanguages={
                analayseResult.experienceProgrammingLanguages
              }
              sendProLang={sendProLang}
            />
          </>
        );
      }
    } else if (record.key == 2) {
      debugger;
      if (record.description == false) {
        return <span> no data</span>;
      } else {
        return (
          <>
            <Table
              columns={columnsProfessionalknowledges}
              dataSource={AddEmployee.professionalknowledges}
              pagination={false}
            />
          </>
        );
      }
    } else if (record.key == 3) {
      if (record.description == false) {
        return <span> no data</span>;
      } else {
        return (
          <>
            <Table
              columns={languages}
              dataSource={analayseResult.languages}
              pagination={false}
            />
          </>
        );
      }
    } else {
      if (record.key == 5) {
        return (
          <span>
            Army,
            {record.description === false
              ? "No military background"
              : "Has a military background"}
          </span>
        );
      }
    }
    {
      if (record.key == 4) {
        return (
          <span>
            Degree:,
            {record.description === false ? "No degree" : " have a degree"}
          </span>
        );
      }
    }
  };
  return (
    <>
      <form onSubmit={handleFormSubmit} style={{ height: "45vh" }}>
        <div>{contextHolder}</div>

        {isLouding == true ? (
          <Spin
            style={{ display: "flex", justifyContent: "center" }}
            size="large"
          />
        ) : (
          ""
        )}
        {isDisplayTable == true ? (
          <Table
            style={{ width: "60vw" }}
            columns={columns}
            expandedRowRender={renderProgrammingLanguages}
            dataSource={data}
            pagination={false}
          />
        ) : (
          ""
        )}
        <h2>Upload your CV </h2>
        <Input
          style={{ width: "15vw" }}
          type="file"
          id="file-selector"
          accept=".pdf"
          onChange={handleFileInputChange}
        />
        <div>
          {url && <Button onClick={handleButtonClick}>Show PDF</Button>}
        </div>
        {showbuttoncvanalyse && (
          <Button onClick={handleFormSubmit}>CV analysis</Button>
        )}
      </form>
    </>
  );
}

export default FileUpload;
