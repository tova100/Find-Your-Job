import "./App.css";
import "./index.css";
import JobDetails from "./JobDetails";
import SignUpJob from "./jobs/Sign-Up-Job";
import SignIn from "./Login/Sign-In";
import { SignUp } from "./Employee/Sign-Up";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import JobMenu from "./jobs/JobMenu";
import AddJob from "./jobs/AddJob";
import EmployeeMenu from "./Employee/EmployeeMenu";
import MyJobs from "./jobs/myJobs";
import ShowGoogleMaps from "./Employee/GoogleMaps";
import Show from "./jobs/show";
import Header from "./Header";

function App() {
  return (
    <div>
      <Header />
      <div>
        <BrowserRouter className="Router">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/SignUpJob" element={<SignUpJob />} />
            <Route path="/SignUpEmployee" element={<SignUp />} />
            <Route path="/EmployeeMenu" element={<EmployeeMenu />} />
            <Route path="/jobMenu" element={<JobMenu />} />
            <Route path="signIn" element={<SignIn />} />
            <Route path="/Login/Sign-Up" element={<SignUp />} />
            <Route path="/Login/SignIn" element={<SignIn />} />
            <Route path="/jobs/SignUpJob" element={<SignUpJob />} />
            <Route path="./JobDetails" element={<JobDetails />} />
            <Route path="addJob" element={<AddJob />} />
            <Route path="myJobs" element={<MyJobs />} />
            <Route path="signUpEmployee" element={<SignUp />} />
            <Route path="show" element={<Show />} />
            <Route path="map" element={<ShowGoogleMaps />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
export default App;
