import { Checkbox } from "antd";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function ShowJob() {
  const location = useLocation();
  console.log(location.state);
  const job = location.state.job;
  console.log(job);
  const [isChecked, setIsChecked] = useState(job.jobType);
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  return (
    <div>
      <div>
        {job.jobTitle}
        <Checkbox defaultChecked={job.degree}>Degree</Checkbox>
        <Checkbox defaultChecked={job.army}>Army</Checkbox>
        <Checkbox defaultChecked={job.hybrid}>Hybrid</Checkbox>
        <Checkbox defaultChecked={job.jobType} onChange={handleCheckboxChange}>
          jobType:{job.degree ? "Full" : "Partially"}
        </Checkbox>
        <p>{job.location}</p>
      </div>

      {/* ))}  */}
    </div>
  );
}

// "job": {
//     "id": 0,
//     "idJob": 0,
//     "jobTitle": "string",
//     "degree": true,
//     "army": true,
//     "jobType": true,
//     "hybrid": true,
//     "location": "string"
//   },
//   "jobExperienceProgrammingLanguage": [
//     {
//       "id": 0,
//       "idJob": 0,
//       "numberOfYears": 0,
//       "programmingLanguage": "string"
//     }
//   ],
//   "jobLanguage": [
//     {
//       "id": 0,
//       "idJob": 0,
//       "spokenlanguage": "string",
//       "levelOfKnowledge": 0
//     }
//   ]
export default ShowJob;
