import React, { useState, useEffect } from 'react';

import {useImmer} from 'use-immer';

import {Link} from 'react-router-dom';


function SideNav(props) {

  let [memoTitle, setMemoTitle ] = useState("");

  // 팀 프로젝트 데이터
  let [teamData, setTeamData] = useState([]);

  // 개인 프로젝트 데이터
  let [personalData, setPersonalData] = useState([]);

  // 메모 데이터
  let [memoData, setMemoData] = useImmer(()=>readTitleFromLocalStorage());

  // 팀 프로젝트 토글 state
  let [teamToggle, setTeamToggle] = useState(true);

  // 개인 프로젝트 토글
  let [personalToggle, setPersonalToggle] = useState(true);

  // 메모 토글 state
  let [memoToggle, setMemoToggle] = useState(true);

  
  useEffect(()=>{
    fetch(`/data/teamProject.json`)
    .then(res => (res.json()))
    .then((json) => setTeamData(json))
    .catch(()=>(console.log(msg)));

    fetch(`/data/personalProject.json`)
    .then((res) => (res.json()))
    .then((json) => setPersonalData(json))
    .catch(()=>(console.log(msg)));

    
  },[]);
  
  // 메모 제목 바꾸기
  useEffect(()=>{

    localStorage.setItem("memoTitle",JSON.stringify(memoData));

  },[memoData]);

  function readTitleFromLocalStorage() {

    const memoData =  localStorage.getItem(`memoTitle`) ;
  
    return memoData ? JSON.parse(memoData) : ini;

  }


  const handleData = (e) => {

    const id = e.target.id;

    setMemoData((prev)=>{
      prev[id-1].toggle = true;
    })

  }

  const handleChange = (e)=>{
    setMemoTitle(e.target.value);
  }

  const handleSubmit =(e) => {

    e.preventDefault();
    const id = e.target.id;

    setMemoData((prev)=>{
      prev[id-1].title = memoTitle;
      prev[id-1].toggle = false;
    })
  }


  const msg = 'json 데이터를 불러오지 못했습니다.';

  return (
    <>
      <nav className='side_nav'>
        <p className='home_btn'> <Link to="/" className="link_home link" >
          {/* <img src={`${process.env.PUBLIC_URL}/images/home_icon.svg`} alt="홈 아이콘 이미지" className='home_img' /> */}
          <span className='home_str'>
            Home
          </span>
        </Link> </p>

        {/* 팀 프로젝트 네비게이션 부분 */}
        <ul className='team-wrap list_wrap'>
          <li className='title-team'>
            {/* 토글 시 가리기 */}
            <span className='team-title toggle' onClick={()=>(setTeamToggle((prev)=>(!prev)))}>
               <img src={`${process.env.PUBLIC_URL}/images/angle_${teamToggle?`down`:`right`}.svg`} alt='토글버튼' className='team-angle' /> 팀 프로젝트
            </span>
          </li>
          <li>
            <ul>
              { teamToggle ? teamData.map((item)=>(<li key={item.id} className='li-team' ><Link to={`/team/${item.id}`}><span>{item.title}</span></Link></li>)) : ""}
            </ul>
          </li>
        </ul>


        <ul className='personal-wrap list_wrap'>
          <li className='title-team'>
            {/* 토글 시 가리기 */}
            <span className='team-title toggle' onClick={()=>(setPersonalToggle((prev)=>(!prev)))}>
               <img src={`${process.env.PUBLIC_URL}/images/angle_${personalToggle?`down`:`right`}.svg`} alt='토글버튼' className='team-angle' /> 개인 프로젝트
            </span>
          </li>
          <li>
            <ul>
              { personalToggle ? personalData.map((item)=>(<li key={item.id} className='li-team' ><Link to={`/personal/${item.id}`}><span>{item.title}</span></Link></li>)) : ""}
            </ul>
          </li>
        </ul>


        {/* 메모 리스트 */}

        <ul className='memo-wrap list_wrap'>
          <li className='title-team'>
            {/* 토글 시 가리기 */}
            <span className='team-title toggle' onClick={()=>(setMemoToggle((prev)=>(!prev)))}>
               <img src={`${process.env.PUBLIC_URL}/images/angle_${memoToggle?`down`:`right`}.svg`} alt='토글버튼' className='team-angle' /> 메모장
            </span>
          </li>
          <li>
            <ul>
              { memoToggle ? memoData.map((item)=>(<li key={item.id} className='li-team li-memo' >{item.toggle === true ? <form id={item.id} onSubmit={handleSubmit} className='title_form' > <input type="text" value={memoTitle} onChange={handleChange}  className='title_input' placeholder={item.title} /> <button type='submit' className='title_submit' >수정 완료</button> </form> :<><Link to={`/memos/${item.id}`}><span>{item.title}</span></Link> <button className='nav-memo_title_edit' id={item.id} onClick={ item.id === 1 ?  handleData : null}>제목 수정</button></> }
              </li>)) : ""}
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default SideNav;



const ini = [
  {
    id : 1,
    title : "메모장(수정 가능)",
    content : "",
    toggle : false
  },
  {
    id : 2,
    title : "메모장(수정 불가)",
    content : "",
    toggle : false
  }
];