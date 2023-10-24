import React, {useCallback, useEffect, useState} from 'react';
import MemoList from './MemoList';

import TextAreaAutoResize from "react-textarea-autosize";

function MemoNormal({ memoData, updateMemo, id, addMemo, focus, deleteMemo, setCursor, title, list, setMode, memoToChild, handleDragStart, handleDragEnd, drag, idt, handleIndent, memoFront, delCursor}){

  let [firstFocus, setFirstFocus] = useState(0);

  let [over, setOver] = useState(false);

  let [modToggle, setModToggle] = useState(false);

  let [indent, setIndent] = useState(idt ? idt : 0);
  
  let [toggle, setToggle] = useState(focus);

  // true 이면 펼쳐야 한다.
  // 없어도 될듯
  // let [listToggle, setListToggle] = useState(false);

  const style = {
    // 스타일
    box : {
      width : `calc(100% - ${indent * 16}px)`,
      marginLeft : `${indent*16}px`,
      // display : `flex`,
      // borderBottom : `${toggle? `1px dashed #ccc` : `none` }`,
      // position : `relative`,
      // marginTop : `8px`
    },
    innerBox : {
      // width : `calc(100% - 16px)`
    }
    ,
    form : {
      // width : `calc(calc(100% - ${indent*16}px) - 32px)`,
      // width : `100%`,
      // height : "40px",
      // margin : "0",
      // padding : "0",
      // border : "0"
    }
    ,
    input : {
      // height : `${title? `50px` : `40px`}`,
      margin : "0",
      padding : "0",
      border : "0",
      fontSize : `${title? `24px` : `16px`}`,
      lineHeight : `${title? `50px` : `40px`}`,
      fontWeight : `${title? `bold` : `400`}`,

    },
    p : {
      // height : `${title? `50px` : `40px`}`,
      margin : "0",
      padding : "0",
      border : "0",
      fontSize : `${title? `24px` : `16px`}`,
      lineHeight : `${title? `50px` : `40px`}`,
      fontWeight : `${title? `bold` : `400`}`,
    },
    tool : {
      // opacity : focus || toggle ? `1` : `0`,
      // width : `32px`,
      // height : `40px`,
      // margin : `0`,
      // padding : `0`,
      // display : `flex`,
      // justifyContnent : `center`,
      // alignItems : `center`,
      // position : `relative`
    },
    plus : {
      // cursor : `pointer`
    },
    drag : {
      cursor : `pointer`
    }
    ,
    mod : {
      display : (modToggle? `block` : `none`),
      // position : `absolute`,
      // left : `30px`,
      // top : `40px`,
      // width : `150px`,
      // zIndex : `9999`
    },
    modBox : {
      // backgroundColor : `#ccc`
    },
    modLi : {
      // cursor : `pointer`
    }
    ,
    toolbtn : {
      position : `relative`,
      background : `none`,
      padding : `0`,
      margin : `0`,
      border : `none`
    },
    // 타이틀인 경우
    titleInput : {
      width : `100%`,
      height : "50px",
      margin : "0",
      padding : "0",
      border : "0",
      // fontSize : "16px",
      fontSize : "24px",
      fontWeight : "bold",
      lineHeight : "50px"
    },
    titleP : {
      width : `calc(calc(100% - ${indent*16}px) - 32px)`,
      height : "50px",
      margin : "0",
      padding : "0",
      border : "0",
      fontSize : "24px",
      lineHeight : "50px",
      fontWeight : "bold",
      cursor : `text`
    },
    dropArea : {
      position : `absolute`,
      display : drag ? `block` : `none`,
      // display :`block` ,
      left : `30px`,
      bottom : `0px`,
      width : `calc(100% - 32px)`,
      height : `6px`,
      backgroundColor : `#AACEFF`,
      borderRadius: `5px`,
      opacity : over ? `1` : `0`,
      zIndex : 9999
    }
  }

  // 부모로부터 받은 메모 값 스테이트로 관리
  let [memo, setMemo] = useState(memoData);

  // 인풋 입력시 실행되는 함수
  const handleChange = useCallback((e) => {

    setMemo(e.target.value);

  },[memo]);

  // 블러 될 때 실행되는 함수
  const handleBlur = (e) => {
    setMemo(e.target.value);
    setToggle(false);
    updateMemo(e.target.value, id);
  }

  // 키 누를 때 실행되는 함수
  const handleKeyDown = (e) => {

    if(e.key === "Enter"){

      // textarea 줄바꿈 방지
      e.preventDefault();

      if(e.nativeEvent.isComposing === false){
        // 한글 작성시 조합 로직에 따라 두번 실행되는걸 방지하기 위해
        // isComposing 값이 엔터 누를 시 true 와 false 가 순서대로 나오기 때문에 false인 경우 실행되도록 해 한글 오류 방지
        handleSubmit(e);
        return;
      }
      if(e.target.value === ""){
        // 메모에 값이 없어도 실행되어야 하기 때문에 조건문 추가
        handleSubmit(e);
        return;
      }
    }
    
    

    if(e.key === "Tab"){

      // 포커스 이동 막기
      e.preventDefault();
      // memoToChild(memo, id);
    }

    if((e.key === "Backspace") && !(e.target.selectionStart)){

      if(indent === 2){
        setIndent(1);
        // handleIndent(e, id, indent);
        handleIndent(e, id, 1);
        return ;
      }

      if(indent === 1){
        setIndent(0);
        // handleIndent(e, id, indent);
        handleIndent(e, id, 0);
        return ;
      }

      if(indent === 0 && e.target.value){
        memoFront(e.target.value, id);
      }

      if(!indent && !e.target.value){
        // console.log(id ,'id 값');
        e.preventDefault();
        deleteMemo(id);
      }
    }

    if((e.key ==="ArrowUp") || (e.key === "ArrowDown")){
      // setMemo(e.target.value);
      e.preventDefault();

      if(e.nativeEvent.isComposing === false){

        updateMemo(e.target.value, id);
        setCursor(e,id);
        return;
      }
    }
  }

  const handleKeyUp = (e) => {

    if(e.key === "Tab"){

      if(indent === 0){
        setIndent(1);
        // handleIndent(e, id, indent);
        handleIndent(e, id, 1);

        memoToChild(memo, id);
        return ;
      }
      if(indent === 1){
        setIndent(2);
        // handleIndent(e, id, indent);
        handleIndent(e, id, 2);
        return ;

      }

    }

    


    if(e.key === "Enter"){
      e.preventDefault();
      // if(e.target.value){
      //   // 메모 벨류 값이 있다면
      //   // 핸들 서브밋 호출
      //   handleSubmit(e);
      // }else{
      //   // 메모 벨류 값이 없다면
      //   // addMemo 바로 호출
      //   addMemo(memo, id);
      // }
    }

  }


  // useEffect() 로 받아오는 메모데이터 업데이트
  useEffect(()=>{
    setMemo(memoData);
    setOver(false);
    handleFocus();
    if(delCursor[0] === id){
      setFirstFocus(delCursor[1]);
    }
  },[memoData, id, idt]);


  // autoFocus 핸들러 함수
  const handleFocus = ()=>{
    if(toggle){
      return true;
    }
    return false;
  }

  // 값이 있고 엔터 누를 시 실행되는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    addMemo(e.target.value , id);
  }


  // 모드를 조정하는 함수
  const handleMode = (e) => {

    if(e.target.classList[0] === "toggle_btn"){
      // 모드를 제어 세 번째 인자에 따라 유형을 정해 만든다.
      // 토글버튼인 경우
      setMode(id,memoData,1);
      setModToggle((prev)=>(!prev));
    }else{
      // 모드를 제어 세 번째 인자에 따라 유형을 정해 만든다.
      setMode(id,memoData,0);
      setModToggle((prev)=>(!prev));
    }
  }

  // 드래그 스타트 다루는 함수
  const handleDrag = (e)=> {
    // 부모의 스타트 다루는 함수 실행
    handleDragStart(e, memo, id, indent);
  }

  // 드롭될 경우
  const handleDrop = (e)=>{
    handleDragEnd(e, id);
    setOver(false);
  }

  // 드래그 오버 될 경우
  const handleDragOver = (e)=> {
    e.preventDefault();
    if(!over){
      setOver(true);
    }
    // console.log(`${id}에 드래그 오버 됨`);
  }

  const handleDragLeave = (e) => {
    e.preventDefault();
    if(over){
      setOver(false);
    }
  }

  // 포커스 되면 할 것
  const handleStart = (e) => {
    // 텍스트 박스 맨 뒤로 커서 두기!

      e.target.setSelectionRange(e.target.value.length - firstFocus, e.target.value.length - firstFocus);

      setFirstFocus(0);
    // e.target.setSelectionRange(e.target.value.length ,e.target.value.length);
  }

  

  return (

    // 랜더링
    // 스타일
    <div style={style.box} onClick={toggle ? ()=>(null) : ()=>{setToggle((prev)=>(!prev))}} onBlur={()=>(setToggle(false))} className='memo_box' >

{/* draggable onDragStart={handleDrag} */}
      {/* 툴 박스 */}
      <div className='text_tool' style={style.tool}>

        {
          <>
            <button style={style.toolbtn} onClick={()=>setModToggle((prev)=>(!prev))} > 
              <img src={`${process.env.PUBLIC_URL}/images/plus.svg`} alt="클릭 시 도구 툴" style={style.plus} className='tool_plus' />
              
            </button>
            <button className='drag_btn' draggable onDragStart={handleDrag} >
              <img src={`${process.env.PUBLIC_URL}/images/drag_icon.svg`} alt="드래그 아이콘" title='드래그 시 메모 이동' />
            </button>
          </>
        }

        {/* 클릭 시 보여지는 모달 */}
        <div style={style.mod} className='type_modal'>
          <ul style={style.modBox} className='modal_bg'>
            <li style={style.modLi} className='modal_list'>
              <button type='button' onClick={handleMode} className='title_btn modal_btn'><img src={`${process.env.PUBLIC_URL}/images/title_img.svg`} alt='제목 버튼 이미지' title='제목 태그를 생성합니다.' className='btn_img' />제목</button>
            </li>
            <li style={style.modLi} className='modal_list'>
              <button type='button' onClick={handleMode} className='toggle_btn modal_btn'><img src={`${process.env.PUBLIC_URL}/images/toggle_img.svg`} alt='토글 버튼 이미지' title='토글 목록을 생성합니다.' className='btn_img' />토글 목록</button>
            </li>
          </ul>
        </div>
      </div>

      {/* 인풋과 p 태그 */}
      <div style={style.innerBox} className='memo_wrap'>
        
        {(toggle || focus ? <form style={style.form} onSubmit={handleSubmit} className='memo_form01' >
          
          <TextAreaAutoResize style={style.input} type="text" value={memo} onChange={handleChange} onBlur={handleBlur} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} autoFocus={handleFocus} onFocus={handleStart} placeholder="메모를 입력해주세요." className="memo_textArea01" />
        </form>  : <p style={style.p} className={ memo ? `memo_p` : `memo_null`} >{memo ? memo : <span> 메모 없음 </span>}</p>)}

        {/* {(toggle || focus ? <form style={style.form} onSubmit={handleSubmit} className='memo_form01' >
          
          <TextAreaAutoResize style={style.input} type="text" value={memo} onChange={handleChange} onBlur={handleBlur} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} autoFocus={handleFocus} onFocus={handleStart} placeholder="메모를 입력해주세요." className="memo_textArea01" />
        </form>  : <form style={style.form} onSubmit={handleSubmit} className='memo_form01' > <p style={style.p} className={ memo ? `memo_p` : `memo_null`} >{memo ? memo : <span> 메모 없음 </span>} {id}</p> </form> )}  */}

        

      </div>

      {/* 드롭되는 영역 */}
      <div className='drop_area' style={style.dropArea} draggable onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
        &nbsp;
      </div>
      

      

    </div>
  );
}

export default MemoNormal;