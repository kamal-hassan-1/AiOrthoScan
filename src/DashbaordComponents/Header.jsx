import React from 'react'
// import Search from "../img/Search.png"
import Profile from "../img/profile-logo.jpg"
// import Notification from "../svg/notification.svg"
// import Arrow_Down from "../svg/arrow-down.svg"
import Menu from "../svg/menu.svg"
// import { Link } from 'react-router-dom';

// max-800:justify-end

const Header = ({toggleLeft}) => {

  return (
    
    <header className='w-[100%] bg-background-blue pr-[40px] py-[20px] justify-end flex items-center gap-[40px] max-1200:w-[100%]'>


      <img src={Menu} alt="" className='hidden max-1200:block absolute left-[30px] top-[30px] cursor-pointer' onClick={toggleLeft}/>
      
      {/* <div className='w-[700px] flex relative items-center max-800:hidden'>
      </div> */}

      {/* <div className="profile-box w-[30%] flex justify-end items-center gap-[20px] mr-[50px] max-800:mr-[20px]"> */}
        <img src={Profile} alt="Profile Icon" className='w-[40px] cursor-pointer rounded-full'/>
      {/* </div> */}

    </header>
  )
}

export default Header
