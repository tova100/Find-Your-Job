import React, { useState } from "react";
import { Button } from "antd";
import'./Home.css';
import { Navigate } from "react-router-dom";
import logo from './picture/logo.png';

export function Home() {
  const [showRecruitment, setRecruitment] = useState(false);
  const [showJobSearch, setJobSearch] = useState(false);
  return (
    <div >
    {/* <img src={logo} alt="Logo" style={{ width: '50vw', height: '50vh' }} /> */}
      {!showJobSearch && (
        <>
          <h1 id="titel">FIND YOUR JOB!!!!</h1>
          <div className="ButtonHome"style={{ display: 'flex', flexDirection: 'row' }}>
          <Button onClick={() => setRecruitment(true)}>Recruitment</Button>
          <Button onClick={() => setJobSearch(true)}>job search</Button>
          </div>
        </>
      )}

      {(showJobSearch || showRecruitment) && (
        <>
          <Navigate
            to="/signIn"
            state={{ isJobSearch: showJobSearch }}
          ></Navigate>

          {/* <Button onClick={handleSetJobSearch}>job search</Button> */}
        </>
      )}
      <image url='./picture/image__2_-removebg-preview.png'/>
    </div>
  );
}
