import React,{useState} from 'react';

function TopStr({str ,topToggle, onToggle}) {

  // let [isHover, setIsHover] = useState(false);

  let [mouseHover, setMouseHover] = useState(false);

  const handleMouseEnter = () => {
    setMouseHover(true);
  }

  const handleMouseLeave = () => {
    setMouseHover(false);
  }


  let [mod, setMod] = useState(false);

  return (
    <>
      {str.id === 1?

        <li onMouseEnter={()=>(handleMouseEnter())} onMouseLeave={()=>(handleMouseLeave())}>
        <h1 className='top-str' onClick={() => onToggle((prev)=>(!prev))}>
            <img src={`${process.env.PUBLIC_URL}${str.img}`} alt="로고 아이콘" className='logo' />
        </h1>

        {topToggle && mouseHover ?
          <div className='top_bg'>
            &nbsp;
          </div>
          :
          ""
        }

        {topToggle && mouseHover ?
        <div className='top_isover'>

            <ul>
              {/* {str.list.map((list,idx)=>(<li key={idx}>{list}</li>))} */}
              <li onClick={()=>(setMod(true))}>
                {str.list[0]}
              </li>

            </ul>

        </div> :
        ""
        }


        {/* <ul className='top_isover'>
          {str.list.map((list,idx)=>(<li key={idx}>{list}</li>))}
        </ul> */}

        </li>

      :
      
        <li onMouseEnter={()=>(handleMouseEnter())} onMouseLeave={()=>(handleMouseLeave())}>
          <span className='top-str' onClick={() => onToggle((prev)=>(!prev))}>
            {str.txt}
          </span>

          {topToggle && mouseHover ?
            <div className='top_bg'>
              &nbsp;
            </div>
            :
            ""
          }
          
          {topToggle && mouseHover ?
          <div className='top_isover'>

              <ul>
                {str.list.map((list,idx)=>(<li key={idx}>{list}</li>))}
              </ul>

          </div> :
          ""
          }


          {/* <ul className='top_isover'>
            {str.list.map((list,idx)=>(<li key={idx}>{list}</li>))}
          </ul> */}

        </li>

      }

      {mod&&
      // common.css에 서식
      <div className='App-Modal_wrap'>

        <footer className='App-Modal'>
            <div className='App-Modal_header'>
              <span className='red cir_btn' onClick={()=>(setMod(false))} >
              <img src={`${process.env.PUBLIC_URL}/images/exit.svg`} alt="" className='icon' />
              </span>
            </div>

            <img src={`${process.env.PUBLIC_URL}/images/react_img.svg`} alt='리액트 로고 이미지' className='Modal-logo' />

            <h2 className='App-Modal_title'>
              전찬혁의 Portfolio 입니다.
            </h2>

            <p className='Modal_p gray'>
              React, 2023
            </p>

            <div className='Modal_desc'>
              <div className='desc-title_box'>
                <p className='Modal-p_title'>언어</p>
                <p className='Modal-p_title'>기능</p>
                <p className='Modal-p_title'>레퍼런스</p>
                <p className='Modal-p_title'>용도</p>
                <p className='Modal-p_title'>개발기간</p>
              </div>
              <div className='desc-desc_box'>
                <p className='Modal-p_desc'>React</p>
                <p className='Modal-p_desc'>Memo</p>
                <p className='Modal-p_desc'>Notion App</p>
                <p className='Modal-p_desc'>취업 포트폴리오</p>
                <p className='Modal-p_desc'>7월 - 10월</p>
              </div>
            </div>

            <address>
              Copyright © Chan-Hyeok. All Rights Reserved.

              <p>email : chan4728@kakao.com</p>
              <p>tel : 010-5833-4358</p>

            </address>


          </footer>

      </div>
      }

    </>

  );
}

export default TopStr;