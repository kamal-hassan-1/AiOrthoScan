import React, { useState, useEffect } from 'react'
import Elbow from "./Elbow.jpg"
import Loading from "./Loading.png"
// import Attach from "../svg/attach.svg"
import UploadButton from "./UploadButton"


const Mdiagnosis = ({Upload}) => {

  const [inputValue, setInputValue] = useState('');

  const handleUpload = () => {
    if (inputValue.trim() === '') {
      // If input is empty, show alert to enter data
      alert('Please enter data before uploading!');
    } else {
      // If there is data, show success alert
      alert('Yes, image uploaded!');
    }
  };

  const showAlert2 = () => {
    alert('Dear User, Apologoes for inconvenience but the AI OrthoScan is limited to only 2 modules for now');
  };


    const [placeholder, setPlaceholder] = useState(
      'Insert any relevant details about the files...'
    );
  
    useEffect(() => {
      const updatePlaceholder = () => {
        if (window.innerWidth <= 650) {
          setPlaceholder('Insert details...');
        } else {
          setPlaceholder('Insert any relevant details about the files...');
        }
      };
  
      updatePlaceholder();
  
      window.addEventListener('resize', updatePlaceholder);
  
      return () => window.removeEventListener('resize', updatePlaceholder);
    }, []);
  

  return (
    <div class="px-[50px] flex flex-col items-center gap-[30px] max-1200:px-[90px] max-800:px-[20px]">

      <div className='w-[100%] h-[100px] bg-gray-300 px-[20px] flex gap-[20px] justify-between items-center rounded-[10px] 
        max-1200:h-[80px] max-800:h-[75px] max-750:h-[65px] max-650:h-[55px] max-480:h-[45px] max-480:px-[10px] max-480:gap-[10px]'>
              <UploadButton Upload={handleUpload}/>
              <input 
        type="text" 
        placeholder={placeholder}
        className="input-diagnosis w-[90%] h-[40px] bg-background-blue rounded-[5px] outline-none px-[10px] text-[18px] 
        max-800:h-[35px] max-650:h-[25px] max-650:text-[16px]"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} 
      />

      </div>

      <div className="w-[100%] h-auto flex flex-col gap-[30px] items-center">
          <img src={Elbow} alt="" className="w-[130px]"/>
          <div className="flex flex-row gap-[15px] justify-center items-center">
            <img src={Loading} alt="" className="w-[80px]  max-480:w-[65px]" />
            <span className="text-green-300 text-[18px]">Scan uploaded and processed successfully</span>
          </div>
          <div className="w-[100%] h-auto flex justify-center">
          The scan reveals a non-displaced fracture of the proximal ulna, located near the elbow joint. The fracture line is clean, with no signs of displacement or bone fragmentation. Surrounding soft tissues, including the ligaments and muscles, appear intact with no significant swelling or inflammation detected. The joint space remains well-preserved, and no signs of additional fractures or dislocation are present.
          </div>
          <button className="w-[120px] px-[5px] text-[20px] py-[5px] bg-green-300 text-black rounded-[5px]" onClick={showAlert2}>    
            Treatment
          </button>
      </div>

    </div>
  )
}


export default Mdiagnosis
