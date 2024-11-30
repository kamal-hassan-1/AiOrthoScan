import React from 'react'
import { Link } from 'react-router-dom';
import Bone from "../img/bone.png"

const Module_Buttons = () => {
  return (
    <div className="w-[70%] py-[30px] flex justify-center gap-[100px] max-800:w-[70%] max-800:gap-[30px] max-650:w-[90%]">
      
      <Link to="/PatientRecord" className="moduleBox">
            <div className="w-[100px] h-[100px] rounded-full bg-gray-400 flex items-center justify-center border-[3px] border-border-blue 
             max-820:w-[75px] max-820:h-[75px] max-520:w-[50px] max-520:h-[50px]">
                <img src={Bone} alt="" className="w-[100px] max-820:w-[75px] max-520:w-[50px]"/>
             </div>
          <span className="text-[24px] max-820:text-[18px] max-520:text-[12px] max-400:text-[10px]">Patient Record</span>
      </Link>

      <Link to="/Diagnose" className="moduleBox">
          <div>
             <div className="w-[100px] h-[100px] rounded-full bg-gray-400 flex items-center justify-center border-[3px] border-border-blue 
             max-820:w-[75px] max-820:h-[75px] max-520:w-[50px] max-520:h-[50px]">
                <img src={Bone} alt="" className="w-[100px] max-820:w-[75px] max-520:w-[50px]"/>
             </div>
           </div>

           <div className='w-[100%] flex flex-col items-center'>
              <div className="text-[24px] max-820:text-[18px] max-520:text-[12px] max-400:text-[10px]">Treatment</div>
           </div>
      </Link>

    </div>
  )
}

export default Module_Buttons
