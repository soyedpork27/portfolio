import React, {useCallback, useEffect, useState} from 'react';
// import MemoImmer from './MemoImmer';
import List from './List';

import TextAreaAutoResize from "react-textarea-autosize";

function MemoList({ memoData, updateMemo, id, addMemo, focus, deleteMemo, setCursor, title, list, open, children, addList, handleToggleBlur, deleteChild, handleChildChange, handleDragStart, addVacantChild, drag, handleDragEnd, idt, handleIndent}){

  let [over, setOver] = useState(false);

  let [modToggle, setModToggle] = useState(false);

  let [indent, setIndent] = useState(idt); 
  
  let [toggle, setToggle] = useState(focus);

  let [listToggle, setListToggle] = useState(false);

  const style = {
    box : {
      width : `calc(100% - ${indent * 16}px)`,
      display : `flex`,
      marginLeft : `${indent*16}px`,
      position : `relative`
    },
    innerBox : {
      width : `calc((100% - ${indent * 16}px) - 32px)`
    }
    ,
    form : {
      // width : `calc(calc(100% - ${indent*16}px) - 32px)`,
      width : `100%`,
      // height : "40px",
      margin : "0",
      padding : "0",
      border : "0"
    }
    ,
    input : {
      // width : `calc(calc(100% - ${indent*16}px) - 32px)`,
      width : `100%`,
      height : "40px",
      margin : "0",
      padding : "0",
      border : "0",
      fontSize : "16px",
      lineHeight : "40px",
      // borderBottom : `${toggle? `1px dashed #ccc` : `none` }`,
      // fontFamily : `sans-serif`,
      fontWeight : `bold`
    },
    p : {
      // width : `calc(calc(100% - ${indent*16}px) - 32px)`,
      width : `100%`,
      // height : "40px",
      margin : "0",
      padding : "0",
      border : "0",
      fontSize : "16px",
      lineHeight : "40px",
      cursor : `text`,
      fontWeight : `bold`
      // fontFamily : `sans-serif`
    },
    tool : {
      width : `32px`,
      height : `40px`,
      margin : `0`,
      padding : `0`,
      display : `flex`,
      justifyContnent : `center`,
      alignItems : `center`,
      position : `relative`
    },
    plus : {
      cursor : `pointer`
    },
    mod : {
      display : (modToggle? `block` : `none`),
      position : `absolute`,
      left : `30px`,
      top : `40px`,
      width : `150px`
    },
    modBox : {
      backgroundColor : `#ccc`
    },
    modLi : {
      cursor : `pointer`
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
    children : {
      display : `${listToggle ? `block` : `none`}`,
      width : `calc(100% - 32px)`,
      marginLeft : `32px`
    },
    dd: {
      display : `block`
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
    handleToggleBlur(memo, id);
  }

  // 키 누를 때 실행되는 함수
  const handleKeyDown = (e) => {

    if(e.key === "Enter"){
      e.preventDefault();
      if(e.nativeEvent.isComposing === false){
        handleSubmit(e);
        return ;
      }
      if(e.target.value === ""){
        handleSubmit(e);
        return ;
      }
    }
    
    if(e.key === "Tab"){

      // 포커스 이동 막기
      e.preventDefault();


      if(indent === 0){
        // setIndent(1);
        // handleIndent(e, id, indent);
        handleIndent(e, id, 1);
        return ;
      }
      if(indent === 1){
        // setIndent(2);
        // handleIndent(e, id, indent);
        handleIndent(e, id, 2);
        return ;

      }
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
        // updateMemo(e.target.value, id);
        handleToggleBlur(e.target.value, id);
        setCursor(e,id)
        if(e.key === "ArrowDown" && children.length){
          // 방향키 아래인데 자손이 있으면
          // 리스트 펼친다.
          setListToggle(true);
        }
      }
    }
  }


  const handleKeyUp = (e) => {
    // if((e.key ==="ArrowUp") || (e.key === "ArrowDown")){
    //   // setMemo(e.target.value);
    //   e.preventDefault();
    //   setCursor(e,id)
    //   if(e.key === "ArrowDown" && children.length){
    //     // 방향키 아래인데 자손이 있으면
    //     // 리스트 펼친다.
    //     setListToggle(true);
    //   }
    // }

  }


  // useEffect() 로 받아오는 메모데이터 업데이트
  useEffect(()=>{
    setMemo(memoData);
    handleFocus();
  },[memoData, id, idt]);


  // autoFocus 핸들러 함수
  const handleFocus = ()=>{
    if(toggle){
      return true;
    }
    return false;
  }

  // 엔터 시 작동하는 함수 children이 있기 때문에 children에 값을 하나 추가해야 한다.
  const handleSubmit = (e) => {
    e.preventDefault();
    // 엔터 시 자손 컴포넌트를 보이기 위해 펼쳐야 한다.
    // 첫 번째 자손 메모를 추가하기 때문이다.
    setListToggle(true);
    addMemo(e.target.value, id);
  }

  const handleDrag = (e)=> {
    // handleDragStart(e,memo,id)
  }


  const handleStart = (e) => {
    // 텍스트 박스 맨 뒤로 커서 두기!
    e.target.setSelectionRange(e.target.value.length ,e.target.value.length);
  }

  return (
    <dl draggable className='toggle_dl'>
      <div style={style.box} onClick={toggle ? ()=>(null) : ()=>{setToggle((prev)=>(!prev))}} onBlur={()=>(setToggle(false))} className='toggle_wrap' >

        <div className='toggle_tool' style={style.tool}>

          {
            list ?
            <button style={style.toolbtn} onClick={()=>setListToggle((prev)=>(!prev))} > 
              <img src={`${process.env.PUBLIC_URL}/images/toggle_angle.svg`} alt="클릭 시 도구 툴" style={style.plus} className={listToggle ? "list_toggle list_on" : "list_toggle"} />
            </button>
            :<button style={style.toolbtn} onClick={()=>setModToggle((prev)=>(!prev))} > 
              <img src={`${process.env.PUBLIC_URL}/images/plus.svg`} alt="클릭 시 도구 툴" style={style.plus} />
            </button>
          }
          
          <div style={style.mod}>
            <ul style={style.modBox}>
              <li style={style.modLi}>제목</li>
              <li style={style.modLi}>토글</li>
            </ul>
          </div>
        </div>


        <dt style={style.innerBox} className='toggle_dt'>
          

          {(toggle || focus ? <form style={style.form} onSubmit={handleSubmit}>
            
            <TextAreaAutoResize style={title ? style.titleInput : style.input} type="text" value={memo} onChange={handleChange} onBlur={handleBlur} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} autoFocus={handleFocus} onFocus={handleStart} placeholder="메모를 입력해주세요." />
            </form>  : <h3 style={title ? style.titleP :style.p} className={ memo ? `` : `memo_null`}>{memo ? memo : <span> 메모 없음 </span>} </h3>)}

        </dt>

        
      </div>
          <div style={style.children} >
          {children.map((item)=>(<dd key={item.id} style={style.dd}><List key={item.id} id={item.id} memoData={item.value} focus={item.focus} indent={indent} title={item.title} list={item.list} drag={drag} updateMemo={updateMemo} addList={addList} deleteMemo={deleteMemo} setCursor={setCursor} deleteChild={deleteChild} handleChildChange={handleChildChange} handleDragStart={handleDragStart} addVacantChild={addVacantChild} handleDragEnd={handleDragEnd} /></dd>))}
          </div>
    </dl>
  );
}

export default MemoList;