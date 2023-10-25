import React from 'react';

import {Link} from 'react-router-dom';


function HomeCard({data}) {

  return (

      <article className='card'>
        <Link to={data.id < 5 ?`/team/${data.id}`:`/personal/${data.id}`}>

        <figure>
          <div className='card-img_box'>
            <img src={`${process.env.PUBLIC_URL}/images/${data.img}`} alt="" className='card_img' />
          </div>
          <figcaption className='card-txt_box'>
            {data.id < 5 ?
            // 팀 프로젝트인 경우
            <>
            <h4 className='card-txt_title'>
              {data.title}
            </h4>
            <p  className='card-txt_desc'>
              역할 : {data.my.role}
            </p>
            <p  className='card-txt_desc'>
              맡은 일 : {data.my.task}
            </p>
            {/* <p  className='card-txt_desc'>
              개발 범위 : {data.my.page}
            </p> */}
            <p className='card-txt_desc gray'>
              {data.language.join(" / ")}
            </p>
            </>
            :
            // 개인 프로젝트인 경우
            <>
              <h4 className='card-txt_title'>
                {data.title}
              </h4>
              <p className='card-txt_desc'>
                설명 : {data.point}
              </p>
            </>
            }
          
          </figcaption>
        </figure>

        </Link>
        
      </article>

  );
}

export default HomeCard;