import React from 'react';

function ProMod({setProMod, data, over}) {
  return (
    <div className='project_modal_pc'>

      <div className='project_mod'>
        <div className='project_mod_bg'>
          <div className='mod_exit' onClick={()=>(setProMod((prev)=>(!prev)))}>
            <img src={`${process.env.PUBLIC_URL}/images/exit.svg`} alt="" />
          </div>
          <h5 className='project_mod_title'>{data.title} 페이지 간략 설명</h5>
          <ul>
            {data.desc[over].map((item)=>(
            <li key={item} className='mod_img_wrap'>
              <img src={`${process.env.PUBLIC_URL}/images/personal/${data.id}_des${over+1}_0${item}.png`} alt="" />
            </li>))}
            {/* <li>
              <img src={`${process.env.PUBLIC_URL}/images/personal/${data.id}_des${over+1}_01.png`} alt="" />
            </li>

            <li>
            <img src={`${process.env.PUBLIC_URL}/images/personal/${data.id}_des${over+1}_02.png`} alt="" />
            </li> */}
          </ul>
        </div>
      </div>
      
    </div>
  );
}

export default ProMod;