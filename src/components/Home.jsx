import React from 'react';

import {useQuery} from '@tanstack/react-query';
import HomeCard from './HomeCard';

import "../css/home.css";


function Home(props) {

  let {isLoading : teamLoading, data:teamdata} = useQuery(["teamdata"], async ()=>{

    return(
      fetch(`/data/teamProject.json`)
      .then(res => (res.json()))
      );
    },{
      staleTime : 1000 * 60 * 3
    });

    let {isLoading : personalLoading, data : personaldata} = useQuery(["personaldata"], async () => {
      return (
        fetch(`/data/personalProject.json`)
        .then((res) => (res.json()))
        );
    },{
      staleTime : 1000 * 60 * 3
    });


    // console.log(teamdata);

  return (
    <>

    <div className='home_dummy'>
      &nbsp;
    </div>

    <h2 className='home_title'>
      Home
    </h2>


    {/* 팀 프로젝트 보이기 */}
      <section className='card_wrap'>
        <h3 className='card_title'>
          <span className='title_border border_green'>
            <span className='circle green'></span> Team Project 
          </span>
        </h3>
        {/* 카드를 감싸는 박스 */}
        <div className='card_box'>
          {teamLoading ?  <p>is Loading</p> : teamdata.map((data)=>(<HomeCard key={data.id} data={data}/>))}
        </div>


      </section>

    {/* 개인 프로젝트 보이기 */}
      <section className='card_wrap'>

        <h3 className='card_title'>
          <span className='title_border border_yellow'>
            <span className='circle yellow'></span> Personal Project
          </span>
        </h3>
        <div className='card_box'>
          {personalLoading ? <p>is Loading</p> : personaldata.map((data)=>(<HomeCard key={data.id} data={data}/>))}
        </div>

      </section>

    {/* 메모 보이기 */}
      <section>

        
      </section>


    {/* 설명 보이기 */}
      <section>

      </section>

    </>
  );
}

export default Home;