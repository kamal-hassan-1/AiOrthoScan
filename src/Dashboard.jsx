import React, { useState } from 'react';
import {useLocation } from 'react-router-dom';
import Right from './DashbaordComponents/Right';
import LeftDash from './DashbaordComponents/LeftDashboard';
import Left from './PatientComponents/LeftPatient';
import LeftDiagnosis from "./DiagnosisComponents/LeftDiagnosis"

function Dashboard() {
  const [LeftVisible, setLeftVisible] = useState(false);
  const toggleLeftPosition = () => {
    setLeftVisible((prev) => !prev);
  };

  const location = useLocation();

  return (
    <div>
      <div className='w-[100vw] min-h-screen relative text-white flex justify-end'>
        {location.pathname === "/Dashboard" && (
          <LeftDash isVisible={LeftVisible} toggleLeft={toggleLeftPosition} />
        )}
        {location.pathname === "/PatientRecord"  && (
          <Left isVisible={LeftVisible} toggleLeft={toggleLeftPosition} />
        )}
        {location.pathname === "/Diagnose"  && (
          <LeftDiagnosis  isVisible={LeftVisible} toggleLeft={toggleLeftPosition} />
        )}
        <Right toggleLeft={toggleLeftPosition} />
      </div>
    </div>
  );
}

export default Dashboard;
