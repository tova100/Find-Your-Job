import { Grid, Spin, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowJob from "./ShowJob";
import { useSelector } from "react-redux";

function MyJobs() {
  const [responseData, setResponseData] = useState(null);
  const [isLouding, setIsLoading] = useState(false);
  const [isShowJob, setIsShowJob]=useState(false);
  const [height, setHeight]=useState();
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(()=>{
    setHeight(window.innerHeight-100);
},[])
  const fetchJobData = async (userId) => {
    setIsLoading(true);
    try {
      //
      const response = await axios.get(
        `https://localhost:7208/api/JobDetail/${userId}`
      );
      console.log(response.data);
      setResponseData(response.data);
      setIsLoading(false);
      //setJobs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchJobData();
  }, []);
  // const handleShowJob = (job) => {
  //   navigate("/showJob", { state: { job } });
  // };
  const DeleteJob= async()=>{
    try {
      //${userId}${userId}
      const response = await axios.delete(
        `https://localhost:7208/api/JobDetail/6`
      );
      if (response.status === 200) {
      messageApi.success('This Job Delete');
      }
      //setJobs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return(
    <div>
     <Spin size="large" />
      {/* <Grid  gap={8}> */}
   {/* <Grid container alignItems="center">
        <Grid item sx={{ display: 'flex', width: 44 }}> */}
        {/* <Grid.Item span={2}>  */}
      <div style={{overflow:'scroll',height:height, width: "200px"}}>
    {!isLouding &&
      responseData &&
      responseData.map((job, index) => (
        <div key={index}>
          {job.jobTitle}
          <button onClick={() =>setIsShowJob(true)}>Show Job</button>
          {/* <button onClick={() => ShowJob(job)}>Show Job</button> */}
          {/* <button>Edit</button>
          <button onClick={DeleteJob}>Delete</button> */}
        </div>
      ))}
      </div>
      {/* </Grid.Item>     */}
      {/* </Grid>
     <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
     { isShowJob && <ShowJob/>}
    </Grid>

      </Grid> */}

    {/* </Grid> */}
    </div>
  )
  // <div>{!isLouding && responseData && responseData.map((job, index) =>
  //   <div key={index}>{job.jobTitle}
  //    <button onClick={ShowJob(job)}>Show Job</button>
  //    <button>Edit</button>
  //    <button>Delete</button>
  //    </div>)}</div>;
  
}

export default MyJobs;
