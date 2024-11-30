import React from 'react'
import Header from "./Header"
import MainDashboard from './MainDashboard';
import Main from '../PatientComponents/Main';
import Diagnose from "../DiagnosisComponents/Mdiagnosis"

import {useLocation } from 'react-router-dom';

// max-800:px-[20px]
// max-1200:pl-[90px]

const RightDash = ({toggleLeft}) => {

  const location = useLocation();

  return (
    <div className="w-[85%] min-h-screen bg-background-blue pb-[30px] max-1200:w-[100%] overflow-y-auto z-10">
      <Header toggleLeft={toggleLeft}/>
      {location.pathname === "/Dashboard"  && (
          <MainDashboard/>
        )}
        {location.pathname === "/PatientRecord"  && (
          <Main/>
        )}
        {location.pathname === "/Diagnose"  && (
          <Diagnose/>
        )}
    </div>
  )
}

export default RightDash
