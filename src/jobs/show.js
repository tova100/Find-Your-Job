import React, { useState, useEffect } from "react";
import { Alert, Button, Modal, Table, message } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobData, setListOfJob } from "../Login/userSlice";
import AddJob from "./AddJob";
import { Collapse } from "antd";
import { current } from "@reduxjs/toolkit";
const MyTable = () => {
  //const [data, setData] = useState([]);
  const MyEnum = {
    1: "basic",
    2: "full professional",
    3: "very high",
    4: "fluent",
    5: "mother language",
  };
  const currentJob = useSelector((state) => state.user.currentJob);
  const dispatch = useDispatch();
  const jobList = useSelector((state) => state.user.listJob);
  // const [description, setDescription] = useState([]);
  const [editModel, SeteditModel] = useState(false);
  const [jobToEdit, SetJobToEdit] = useState([]);
  const [data, SetData] = useState();

  const jobData = [];
  const initData = () => {
    // jobList.forEach(job => {
    //   jobData.push({...job})
    // });
    for (let i = 0; i < jobList.length; i++) {
        console.log("joblist",jobList[i])
      // jobData.push({...jobData[i],key:i})
      jobData.push({

        key: i,
        id:jobList[i].id,
        army: jobList[i].army,
        jobLanguages: jobList[i].jobLanguages,
        jobExperienceProgrammingLanguages:
          jobList[i].jobExperienceProgrammingLanguages,
        degree: jobList[i].degree,
        hybrid: jobList[i].hybrid        ,
        jobType: jobList[i].jobType,
        jobTitle: jobList[i].jobTitle,
        location: jobList[i].location,
        salary: jobList[i].salary,
      });

    }
    SetData(jobData);
    // console.log("999999999999");
    // console.log(jobData);
    // console.log(data);
  };
  useEffect(() => {
    debugger;
    initData();
  }, [jobList]);

  // const columns = [
  //   { title: "Name", dataIndex: "jobTitle", key: "jobTitle" },
  //   {
  //     title: "Action",
  //     dataIndex: "",
  //     key: 1,
  //     render: (text, record) => {
  //       const listAll = JSON.parse( localStorage.getItem("ListOfApplicants"))
  //       const matchingApplicants = listAll.filter(
  //         applicant => applicant.id === record.id&& applicant.jobName===currentJob.jobName);
  //       console.log("%%5",matchingApplicants);
  //       return (
  //         <>
  //         <div >
  //         <div style={{display:'flex',justifyContent:'space-between'}}>
  //           {matchingApplicants.map(applicant => (
  //             // כאן אתה יכול להציג את פרטי המועמד מתוך הרשימה
  //             // לדוגמה: {applicant.name}, {applicant.mark}
  //             <div key={applicant.id}>
  //               Name employee:{applicant.name}, The match percentage:{applicant.mark}
  //             </div>
  //           ))}
  //           <Button onClick={() => handleEditJob(record)}>Edit Job</Button>
  //           <Button onClick={() => handleDeleteJob(record.id)}>Delete Job</Button>
  //           </div>
  //           </div>
  //         </>
  //       );
  //     },
  //   },
  // ];
  const [messageApi, contextHolder] = message.useMessage();
  const [deleteus, setDelete] = useState(false);
  const { Panel } = Collapse;
  const columns = [
    { title: "Name", dataIndex: "jobTitle", key: "jobTitle" },
    {
      title: "Action",
      dataIndex: "",
      key: 1,
      render: (text, record) => {
        const listAll = JSON.parse(localStorage.getItem("ListOfApplicants"));
        let dataSource = [];
        if (listAll) {
          // console.log(listAll);
          // console.log("88888888888888888888888888888888888");
          // console.log(record);
          const matchingApplicants = listAll.filter(
            (applicant) =>
              applicant.id === record.id &&
              applicant.jobName === currentJob.jobName
          );
          // console.log("%%5", matchingApplicants);
      if(matchingApplicants.length>0)
          dataSource = matchingApplicants.map((applicant) => ({
            key: applicant.id,
            name: applicant.name,
            mark: applicant.mark + "%",
          }));
        }

        const columns = [
          {
            title: "Name employee",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "The match percentage",
            dataIndex: "mark",
            key: "mark",
          },
        ];

        return (
          <>
            <Collapse>
              <Panel header="Show matching applicants" key="1">
                <Table
                  dataSource={dataSource}
                  columns={columns}
                  pagination={false}
                />
              </Panel>
            </Collapse>
            <Button onClick={() => handleEditJob(record)}>Edit Job</Button>
            <Button onClick={() => handleDeleteJob(record.id)}>
              Delete Job
            </Button>
          </>
        );
      },
    },
  ];
  const deletemes = () => {
    messageApi.open({
      type: "success",
      content: "This job deleted from all jobs !!",
    });
  };

  const handleEditJob = (record) => {
    console.log("in edit--------------------");
    console.log(record);
    SeteditModel(true);
    SetJobToEdit(record);
  };
  const handleDeleteJob = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `https://localhost:7208/api/JobDetailsAll/${id}`
      );
      if (response.status === 200) {
        deletemes();
        setDelete(true);
      }
    } catch (error) {
      console.log(error);
    }
  }; 
  useEffect(() => {
    let res = dispatch(fetchJobData());
    console.log(res);
  }, [deleteus]);
  const handleModalCancel = () => {
    SeteditModel(false);
  };
  const renderNumberOfYears = (jepl) => {
    if (jepl.numberOfYears === 0) {
      return <span>advantage</span>;
    } else {
      return <span>{jepl.numberOfYears} years</span>;
    }
  };

  return (
    <>
      <div>{contextHolder}</div>
      <h2 style={{ textAlign: "center" }}>All Jobs</h2>
      <Table
        columns={columns}
        expandedRowRender={(record) => (
          <>
            <div>
              <p>
                <strong>Job Title:</strong> {record.jobTitle}
              </p>
              <p>
                <strong>JobType:</strong>{" "}
                {record.jobType === true ? "Full Time" : "Part Time"}
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
              {record?.jobExperienceProgrammingLanguages?.map((jepl) => (
                <p key={jepl.programmingLanguage}>
                  <strong>{jepl.programmingLanguage}:</strong>{" "}
                  {renderNumberOfYears(jepl)}
                </p>
              ))}
              <strong>The Languages:</strong>
              {record.jobLanguages.map((jepl) => (
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
        dataSource={data}
      />
      <Modal
        title="Edit the job"
        open={editModel}
        // onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <AddJob jobToEdit={jobToEdit} SeteditModel={SeteditModel} />
      </Modal>
    </>
  );
};

export default MyTable;

// import React, { useState, useEffect } from 'react';
// import { Button, Input, Table } from 'antd';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { setListOfJob } from '../Login/userSlice';

// const columns = [
//   { title: 'Name', dataIndex: 'jobTitle', key: 'jobTitle' },
//   { title: 'Salary', dataIndex: 'jobSalary', key: 'jobSalary' },
//   { title: 'Location', dataIndex: 'address', key: 'address' },
//   {
//     title: 'Action', dataIndex: '', key: 'x', render:
//      (text, record) => (
//       <>
//         <Button
//           onClick={() =>
//             handleEditJob(record)
//           }
//         >
//           Edit Job
//         </Button>
//         <Button
//           onClick={() =>
//             handleDeleteJob(record.id)
//           }
//         >
//           Delete Job
//         </Button>
//       </>
//     ),
//   },
// ];

// const MyTable = () => {
//   const [data, setData] = useState([]);
//   const [description, setDescription] = useState([]);
//   const [editingKey, setEditingKey] = useState('');
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchJobData = async () => {
//       try {
//         const response = await axios.get(
//           "https://localhost:7208/api/JobDetail/1"
//         );
//         const jobData = response.data;
//         setData(response.data);
//         dispatch(setListOfJob(response.data))
//         setDescription([
//           {
//             title: 'Job Details',
//             content: (
//               <div>
//                 <p><strong>Job Title:</strong> {jobData.jobTitle}</p>
//                 <p><strong>Salary:</strong> {jobData.jobSalary}</p>
//                 <p><strong>Job Experience Programming Languages:</strong>
//                 {Array.isArray(jobData.jobExperienceProgrammingLanguages)
//                 ? jobData.jobExperienceProgrammingLanguages.join(', ') : 'N/A'}</p>
//               </div>
//             ),
//           },
//         ]);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchJobData();
//   }, []);

//   const handleEditJob = (record) => {
//     setEditingKey(record.id);
//   };

//   const handleSave = async (record) => {
//     try {
//       const { id, jobTitle, jobSalary, address } = record;
//       const response = await axios.put(
//         `https://localhost:7208/api/JobDetail/${id}`,
//         { jobTitle, jobSalary, location: address }
//       );
//       const updatedJob = response.data;
//       const newData = [...data];
//       const index = newData.findIndex((item) => updatedJob.id === item.id);
//       newData[index] = updatedJob;
//       setData(newData);
//       setEditingKey('');
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const isEditing = (record) => record.id === editingKey;

//   const editInput = (props) => {
//     const { dataIndex, record, children, ...restProps } = props;
//     return isEditing(record) ? (
//       <Input defaultValue={record[dataIndex]} {...restProps} />
//     ) : (
//       children
//     );
//   };

//   return (
//     <Table
//       columns={columns.map((col) => {
//         if (!col.editable) {
//           return col;
//         }
//         return {
//           ...col,
//           onCell: (record) => ({
//             record,
//             dataIndex: col.dataIndex,
//             title: col.title,
//             editing: isEditing(record),
//           }),
//         };
//       })}
//       dataSource={data}
//       components={{
//         body: {
//           cell: editInput,
//         },
//       }}
//       rowClassName="editable-row"
//       pagination={{
//         onChange: cancel,
//       }}
//     />
//   );
// };

// export default MyTable;
