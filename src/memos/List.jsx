import React, {useCallback, useState, useEffect} from 'react';

import TextAreaAutoResize from "react-textarea-autosize";

function List({id, memoData, focus, indent, title, list, updateMemo, addList, deleteMemo, setCursor, deleteChild, handleChildChange, handleDragStart, addVacantChild, drag, handleDragEnd}) {

  let [over, setOver] = useState(false);


  // 포커스 여부에 따라 form 태그 혹은 p 태그로 조정
  let [toggle, setToggle] = useState(focus);

  let [memo, setMemo] = useState(memoData);

  let [childIndent, setChildIndent] = useState(0);


  // console.log(id);

  // autoFocus 핸들러 함수
  const handleFocus = ()=>{
    if(toggle){
      return true;
    }
    return false;
  }

  // useEffect() 로 받아오는 메모데이터 업데이트
  useEffect(()=>{
    setMemo(memoData);
    handleFocus();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[memoData, id, indent, toggle]);

  


  // 블러 될 때 실행되는 함수
  const handleBlur = (e) => {
    // setMemo(e.target.value);
    setToggle(false);
    updateMemo(e.target.value, id);

  }

  // 미완
  const handleChange = useCallback((e) => {

    setMemo(e.target.value);
    handleChildChange(e.target.value, id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[memo]);

  // 미완 Tab 추가해야 한다.
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
      e.preventDefault();
      if(childIndent===2){
        return ;
      }
      else{
        setChildIndent((prev)=>(++prev));
      }

    }

    if(e.key === "Backspace" && (!e.target.value)){
      e.preventDefault();
      if(!childIndent){
        // childIndent값이 0일때
        deleteChild(id);

      }
      else{
        // childIndent 값이 0이 아닐 때 1 또는 2일때
        setChildIndent((prev)=>(--prev))
      }
    }


  }


  // 처음 눌리면 실행되는 함수?
  const handleKeyUp = (e) => {
    // setMemo(e.target.value);

    if((e.key ==="ArrowUp") || (e.key === "ArrowDown")){
      // setMemo(e.target.value);
      e.preventDefault();
      setCursor(e,id)
    }

    if(e.key === "Enter"){
      e.preventDefault();
    }


  }

  const style = {

    input : {
      width : `calc(100% - ${32 * (indent + 1) + childIndent * 32}px)`,
      marginLeft : `${32 * (indent+1) + (childIndent * 32)}px`
    },
    p : {
      width : `calc(100%-${32 * (indent+1) + (childIndent * 32)}px)`,
      // height : `40px`,
      marginLeft : `${32 * (indent+1) + (childIndent * 32)}px`
    },
    dropArea : {
      display : drag ? `block` : `none`,
      width : `calc(100% - 32px)`,
      opacity : over ? `1` : `0`,
      zIndex : 9999
    }

    // dropArea : {
    //   display : drag ? `block` : `none`,
    //   width : `calc(100% - 32px)`,
    //   opacity : over ? `1` : `0`,
    //   zIndex : 9999
    // }
  }


  // 드래그 시작될 때 작동하는 함수
  const handleDrag = (e)=> {
    console.log("드래그 시작됨");
    handleDragStart(e,memo,id);
  }

  // 포커스 되면 할 것
  const handleStart = (e) => {
    // 텍스트 박스 맨 뒤로 커서 두기!
    e.target.setSelectionRange(e.target.value.length ,e.target.value.length);
  }


  // 미완
  const handleSubmit = (e) => {
    e.preventDefault();
    addList(e.target.value, id);
  }

  // 드래그 오버 될 경우
  const handleDragOver = (e)=> {
    e.preventDefault();
    if(!over){
      setOver(true);
      console.log(`${memoData.id} ${over}`);
    }
    // console.log(`${id}에 드래그 오버 됨`);
  }

  const handleDragLeave = (e) => {
    e.preventDefault();
    if(over){
      setOver(false);
    }
  }

  // 드롭될 경우
  const handleDrop = (e)=>{
    handleDragEnd(e, id);
    setOver(false);
  }

  return (
    <>
      <div onClick={toggle ? ()=>(null) : ()=>{setToggle((prev)=>(!prev))}} draggable onDragStart={handleDrag} className='list_wrap_01' >

        {(toggle || focus ? <form onSubmit={handleSubmit} >
          <TextAreaAutoResize style={style.input} type="text" value={memo} autoFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} onFocus={handleStart} placeholder="메모를 입력해주세요." className="list_textArea01" />
        </form>  : <p style={style.p} className={ memo ? `list_p` : `memo_null`} >{memo ? memo : <span> 메모 없음 </span> } </p>)}

        <div style={style.dropArea} className='list_drop' draggable onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>

        </div>

      </div>
    </>
  );
}

export default List;