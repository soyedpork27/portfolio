import React from 'react';

import '../css/header.css';
import SideNav from './SideNav';

export default function Header(props) {



  return (
    <div className='header_wrap'>
      <header>
        <div className='header-top'>
          <div>
            <span className='red cir_btn' onClick={()=>(window.close())}><img src={`${process.env.PUBLIC_URL}/images/exit.svg`} alt="" className='icon' /></span>
            <span className='yel cir_btn'><img src={`${process.env.PUBLIC_URL}/images/minus.svg`} alt="" className='icon icon02' /></span>
            <span className='gre cir_btn'><img src={`${process.env.PUBLIC_URL}/images/double_angle.svg`} alt="" className='icon icon03' /></span>
          </div>
        </div>

        <div className='left_nav-wrap'>
          <SideNav />
          
        </div>
      </header>
    </div>
  );
}

