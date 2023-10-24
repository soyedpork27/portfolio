import React, {useState} from 'react';
import ProMod from './ProMod';

function PersonalDetail({data,proMod,setProMod}) {


  let [toggle, setToggle] = useState(true);

  let [over, setOver] = useState(0);


  return (
    <>
      <section className='project_wrap'>
        <div className='mobile_dummy'>
          &nbsp;
        </div>

        <h2 className='project_personal_title'>
          {/* Project Name : {data.title} */}
          개인 프로젝트
        </h2>

        <div className='project_box'>

          <div className='project_img_box'>
            <div className='project_img_wrap'>
            <img src={`${process.env.PUBLIC_URL}/images/${over===0 ? data.img : `personal/${data.id}_02.png`}`} alt="메인 페이지 이미지" className='project_main_img' />
            <div className='project_img_curtain' onClick={()=>(setProMod(true))}>
              <span className='curtain_txt'>클릭 시 페이지 간략 설명</span>
            </div>
            </div>

            <div className='gallery_mobile'>

            <ul className='page_list_wrap'>
              <li className={`page_img_list`} onMouseEnter={()=>(setOver(0))}>
                <div className={`img_${data.id} ${over===0 && `img_border`}`} >
                </div>

                  <img src={`${process.env.PUBLIC_URL}/images/${data.img}`} alt="페이지 이미지01" className={`page_img`} />
              </li>

              <li className={`page_img_list`} onMouseEnter={()=>(setOver(1))}>
                <div className={`img_${data.id} ${over===1 && `img_border`}`} >
                </div>
                  <img src={`${process.env.PUBLIC_URL}/images/personal/${data.id}_02.png`} alt="페이지 이미지01" className={`page_img`} />
              </li>

              {/* <li className={`page_img_list`} onMouseEnter={()=>(setOver(2))}>
                <div className={`img_${data.id} ${over===2 && `img_border`}`} >
                </div>
                  <img src={`${process.env.PUBLIC_URL}/images/personal/${data.id}_03.png`} alt="페이지 이미지01" className={`page_img`} />
              </li> */}

            </ul>
            </div>

          </div>


          <article className='project_desc'>
            <h3 className='project_title'>Project Name : {data.title}</h3>

            <p className='desc_txt' onClick={()=>(setToggle(prev => !prev))} > <span className={!toggle&& `disabled`} >
              <span className={`icon_wrap`}>
              <img src={`${process.env.PUBLIC_URL}/images/toggle_angle.svg`} alt="토글 이미지" className={`page_toggle_icon ${!toggle&&`toggle_icon_false`}`}  />
              </span> 페이지 간략 설명</span> </p>
            {toggle ? <ol className='about_wrap'> {data.point.map((item, idx)=>(<li key={idx+1} className='about_project'>{idx + 1} : {item}</li>))}</ol> : null}
            
            <p className='point_p'><span className='good_title point'>Good Point</span> : {data.good}</p>
            <p className='point_p'><span className='weak_title point'>Weak Point</span> : {data.missing}</p>
            {data.url ? <button onClick={()=>window.open(data.url)} className='page_link_btn'>홈페이지 바로가기</button> : <button disabled className='page_link_btn'>준비중입니다...</button> }
          </article>

        </div>

        <div>

        <div className='gallery_pc'>

          <h4 className='gallery_title'>
            Gallery
          </h4>

            <ul className='page_list_wrap'>
              <li className={`page_img_list`} onMouseEnter={()=>(setOver(0))}>
                <div className={`img_${data.id} ${over===0 && `img_border`}`} >
                </div>

                  <img src={`${process.env.PUBLIC_URL}/images/${data.img}`} alt="페이지 이미지01" className={`page_img`} />
              </li>

              <li className={`page_img_list`} onMouseEnter={()=>(setOver(1))}>
                <div className={`img_${data.id} ${over===1 && `img_border`}`} >
                </div>
                  <img src={`${process.env.PUBLIC_URL}/images/personal/${data.id}_02.png`} alt="페이지 이미지01" className={`page_img`} />
              </li>

            </ul>

          </div>

        </div>
        
      </section>

      {proMod &&
        <ProMod proMod={proMod} setProMod={setProMod} data={data} over={over} />
      }
      

    </>
  );
}

export default PersonalDetail;