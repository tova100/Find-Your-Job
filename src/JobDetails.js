import { InputNumber } from 'antd';
import React, { useState } from 'react';

export default function JobDetails() {
  const [location, setLocation] = useState('');
const [EmployeeJob,setEmployeeJob]=useState({


  
})
  function handleLocationChange(event) {
    setLocation(event.target.value);
  }

  return (
    <div className="Login">
      <h1>JobDetails</h1>
      <div name="location" required="true" message="Please select your location!">
        <select value={location} placeholder="select your location" onChange={handleLocationChange}>
          <option value="">Select your location</option>
          {/* מרכז */}
          <option value="coordinator">Coordinator</option>
          {/* צפון */}
          <option value="north">North</option>
          {/* דרום  */}
          <option value="south">South</option>
        </select>
        <br />
      </div>

      <div className="radio">
        {/* איזה סוג משרה  */}
        <p id="radio">Choose a job type</p>
        {/* מלאה  */}
        <input type="radio" value="Full" name="JobType" /> Full
        {/* חלקית  */}
        <input type="radio" value="partially" name="JobType" /> Partially
      </div>
                <InputNumber
                    min={6000}
                    max={500000}
                    style={{ padding: 24, width: 500 }}
                  type='number'/>
                  onChange={}
    </div>
  );
}
