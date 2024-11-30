import React from 'react'
import PatientDetail from "./PatientDetail"
import Report from "./Report"
import Elbow from "../img/Elbow.jpg"
// import Search from "../img/Search.png"


const Main = () => {
  return (
    <main className="flex justify-center gap-[40px] max-1350:px-[20px] max-800:flex-col max-800:items-center max-800:gap-[20px]">

      <div className='w-[700px] flex flex-col gap-[20px] max-800:items-center max-800:w-[90%]'>
        <PatientDetail/>
        <Report/>
      </div>

      <img src={Elbow} alt="Elbow" className="w-[30%] h-[30%]"/>

    </main>
  )
}

export default Main
