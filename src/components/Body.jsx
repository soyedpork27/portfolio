import React,{useState} from 'react';

// 최상단 네비게이션 컴포넌트
import TopStr from './TopStr';


// css import


import {Outlet} from 'react-router-dom';

import Header from './Header';


export default function Body({proMod}) {

  // 내부 스타일 객체
  const style = {
    background : {
      // position : `relative`,
      // left : `0`,
      // top : `25px`,
      backgroundColor : `#092345`,
      // width : `100%`,
      height : `100vh`,
    },
    content : {
      // common.css .content_body

      // backgroundColor : `#fff`,
      // borderRadius : `15px`,
      // paddingLeft : `280px`,
      // height : `calc(100% - 32px)`,
      // boxSizing : `border-box`,
      // border : `1px solid #000`,
      // position : `absolute`,
      // width : `100%`,
      // left : `0`,
      // top : `32px`,
      // zIndex : `1`,

      // display : `flex`,
      // overflow : `hidden`
    }
  }

  // topStr 상위 네비게이션 토글 제어
  let [topToggle, setTopToggle] = useState(false);

  

  // 페이지 상단 탑부분 글자
  const top_str = [
    {
      id : 1,
      img : '/images/react_img.svg',
      list : ["이 App에 관하여" , "페이지 닫기"]
    },
    {
      id : 2,
      txt : '전찬혁',
      list : ['94년생 30세','INFP','남성']
    },
    {
      id : 3,
      txt : 'Skill',
      list : ['HTML5','CSS3',"PHP","JavaScript","Git & GitHub","React"]
    },
    {
      id : 4,
      txt : 'Todo',
      list : ["React","React native","Swift","Kotlin or Java"]
    },
    {
      id : 5,
      txt : 'Record',
      list : ["Green Computer Academy","Web Design qulification"]
    },
    {
      id : 6,
      txt : 'Introduce',
      list : ["자기소개"]
    }
  ];





  return (
    <div style={style.background} className='Top_Box'>

      {/* 최 상단 */}
      <nav className='top_nav'>
        {/* 리액트 로고 이미지 */}
        {/* <h1 >
          <img src={`${process.env.PUBLIC_URL}/images/react_img.svg`} alt="" className='logo' />
        </h1> */}

        {/* 좌측 상단 네비게이션 */}
        <nav className='top_nav-nav01'>
          <ul className='nav01-ul'>

            {top_str.map((str)=>(<TopStr key={str.id} str={str} topToggle={topToggle} onToggle={setTopToggle} />))}

          </ul>
        </nav>

      </nav>

      <div style={style.content} onClick={()=>(setTopToggle(false))} className={proMod? `content_body02`:`content_body01`} >

      <input type='checkbox' id='gnb_chk' name='gnb_chk' />
        <Header />
        <Outlet />
      </div>


        <label className='gnb_toggle' htmlFor='gnb_chk' >
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
        </label>

      
    </div>
  );
}