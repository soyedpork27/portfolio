import React, {useEffect, useState} from 'react';
import MemoNormal from './MemoNormal';



import {useImmer} from 'use-immer';
import MemoList from './MemoList';

import '../css/memo.css';

function Memo02(props) {



  let [delCursor, setDelCursor] = useState([]);

  let [drag, setDrag] = useState(false);

  // 드래그되는 메모를 스테이트로 저장하기
  let [draggedMemo, setDraggedMemo] = useState('');

  // 드래그되는 아이디 스테이트로 저장
  let [draggedId, setDraggedId] = useState(null);

  let [draggedIndent, setDraggedIndent] = useState(null);

  // 중심 데이터 memos
  let [memos, setMemos] = useImmer(initialData);

  

  // // 로컬 스토리지로 데이터를 업데이트 하기
  // useEffect(()=>{

  //     localStorage.setItem(`memos`, JSON.stringify(memos));
  //     // setMemos(initialData);
    
  // },[memos]);

  // // 로컬 스토리지에서 데이터를 불러오는 함수
  // function readMemosFromLocalStorage() {



  //     const memos =  localStorage.getItem(`memos`) ;
  
  //     return memos ? JSON.parse(memos) : [];
  //   // return memos ? JSON.parse(memos) : initialData;
  // }

  // 메모 관리하기
  // 메모 데이터 추가하기
  const handleMemo = (memo,id) => {

    const getIndex = memos.findIndex((item)=>(item.id===id));

    const getMemo = memo;
    // 메모 값 입력 시 업데이트 하기
    setMemos((prev)=>([...prev.map((item,idx)=>{
      if(item.id === getIndex + 1){
        return {...item, value : getMemo, focus : false}
      }
      return item;
    })]));
  }

  // 엔터 시 (빈)메모 데이터를 하나 추가하는 함수
  const addMemo = (value, getId) => {

    // 인덱스 번호 구하기
    const index = createIndex(getId);
    // 자손 메모가 있는 경우 엔터 시 첫 번재 자손 메모 추가하기
    if(memos[index].list){
      setMemos((data)=> {

        data[index].children.forEach((item)=>( item.id = item.id + 1));

        data[index].children.splice(0,0,{
          id : Number(getId*100 + 1),
          value : "",
          focus : true,
          title : false,
          list : false
        });
      })
      return ;
    }


    setMemos((data) => {
      data.map(item => {
        if(item.id > getId){
          item.id = item.id + 1;

          // children.length 값이 0 인 경우 오류 발생을 방지하기 위해 and 연산자로 조건문을 보강하였다.
          if( (item.children.length) && item.children.length > 0){
            // 빈 데이터 생성 시 뒷부분 children 의 id 값을 100씩 추가
            item.children.forEach((item)=>{
              item.id = item.id+100;
            })
          }
        }
      })

      // splice 공부 더 필요
      // children 채우다.
      data.splice(getId, 0 ,{id : getId+1, value : "", focus : true, title : false, list : false, open : false, indent : 0, children : []});
    })

    
  }


  // 리스트 관련 함수
  // 리스트에서 블러 시 데이터 업데이트하기
  const handleList = (value, getId) => {
    // alert("핸들 리스트")
    
    // memos 업데이트 하기 시작
    const target = memos.findIndex((item)=>(item.id==Math.floor(getId / 100)));

    const targetChildren = Number(getId - (Math.floor(getId / 100) * 100) - 1);

    setMemos((data) => {

      if(value){
        data[target]["children"][targetChildren]["value"] = value;
      }
  
      data[target]["children"][targetChildren]["focus"] = false;

    })

    // memos 업데이트 하기 끝

    
  }

  // 리스트 관련 함수
  // 리스트에서 엔터 누를 시 컴포넌트 추가하기
  const addList = (value, getId) => {

    // console.log((Math.floor(getId - (Math.floor(getId / 100)) * 100 ) ));

    // memos 업데이트 하기 시작
    const target = memos.findIndex((item)=>(item.id==Math.floor(getId / 100)));

    const targetChildren = Number(getId - (Math.floor(getId / 100) * 100) - 1);

    

    // if(value){
    //   setMemos((data) => {
    //     data[target]["children"][targetChildren]["value"] = value;
    //   })
    // }




    // memos 업데이트 하기 끝

    setMemos((data) => {
      data[Math.floor(getId / 100) - 1]["children"].map(item => {
        if(item.id > getId){
          return [item , item.id = item.id + 1];
        }
      })
    })

    setMemos((data) => {
      data[Math.floor(getId / 100) - 1]["children"].map((item) => {
        return [item, item.focus = false];
      })

      // splice 공부 필요

        data[Math.floor(getId / 100) - 1]["children"].splice((Math.floor(getId - (Math.floor(getId / 100)) * 100 ) ) , 0 ,{id : getId+1, value : ``, focus : true, title : false,list : false});

      
    })


  }

  const addVacantChild = (getId) => {

    // alert("몇 번 나오지?");

    setMemos((data) => {
      data[Math.floor(getId / 100) - 1]["children"].map(item => {
        if(item.id > getId){
          return [item , item.id = item.id + 1];
        }
      })
    })

    setMemos((data) => {
      data[Math.floor(getId / 100) - 1]["children"].map((item) => {
        return [item, item.focus = false];
      })

      // splice 공부 필요
      data[Math.floor(getId / 100) - 1]["children"].splice((Math.floor(getId - (Math.floor(getId / 100)) * 100 ) ) , 0 ,{id : getId+1, value : ``, focus : true, title : false,list : false});
      
    })
  }

  // 리스트 관련 함수
  // 리스트 토글에서 블러 시 작동하는 함수
  const handleToggleBlur = (value, getId) => {

    
    setMemos((data)=>{
      // 값을 자식 컴포넌트의 값으로 업데이트
      data[getId-1]["value"] = value;
      // 포커스 false
      data[getId-1]["focus"] = false;
    });

    
  }

  // 리스트 관련 함수
  // 백스페이스 시 데이터(결과적으론 자손 컴포넌트를) 삭제하는 함수
  // 뒤에 토글 데이터의 아이디 값을 100씩 낮추는 함수
  const deleteMemo = (id)=>{

    setMemos((data) => {
      // console.log(`${id}, ${data[id].id}`);
      // alert(`${id}, ${data[id].id}`);

      // 해당 데이터(컴포넌트)를 삭제한다. 
      data.splice(id-1, 1);

      // 데이터 아이디값이 받아온 아이디 값(삭제할 아이디 값)보다 크다면 1씩 감소시킨다.
      data.map(item => {
        if(item.id > id){
          item.id = item.id-1;
          if( (item.children.length) && item.children.length > 0) {
            // 지워질 때 children id 값을 100씩 감소
            item.children.forEach(item => {item.id = item.id - 100})
          }
        }
      })

      // 해당 컴포넌트 바로 앞의 컴포넌트에 커서를 둔다.
      if(data[id-2]){
        data[id-2].focus = true;
      }
    })
  }

  // 리스트 관련 함수
  // 리스트 차일드에서 빈 인풋 요소에서 백스페이스 시 데이터가 삭제되도록 하는 함수
  const deleteChild = (id) => {

    // 인덱스 구하기
    const index = createIndex(id);

    // 차일드 인덱스 구하기
    const childIndex = createChildIndex(id);

    // 만약 마지막 차일드 인덱스인 경우
    if(Number(memos[index].children.length) === childIndex+1){
      setMemos((data)=>{

        data.forEach((item)=>{
          if(item.id > index + 1){
            return item.id = item.id + 1;
            // alert(item.id);
          }
        });


        data[index].children.splice(childIndex,1);

        data.splice(index + 1,0,{ id : index + 2,
        value : "",
        focus : true,
        title : false,
        list : false,
        open : false,
        indent : 0,
        children : [] });

        data.forEach((item)=>{
          if(item.id > index + 1){
            if(item.list){
              item.children.forEach((item)=>{
                return item.id = item.id + 100;
              })
            }
          }
        });
        
      })
    }else{
      setMemos((data)=>{
        // splice 를 쓰지 않고 새로운 배열을 복사해 할당하였다.
  
        const targetIndex = data[index]["children"].findIndex((item) => (item.id === id));
  
        data[index]["children"].splice(targetIndex,1);
        
        const child =  data[index]["children"].filter(item => (item.id !== id));
        // children 삭제 시 아이디 값 큰것 1씩 감소
        child.forEach((item)=>{
          if(item.id > id){
            item.id = item.id - 1;
          }
          if(item.id === id-1){
            item.focus = true;
          }
        })

        if(id - (Math.floor(id/100) * 100) === 1){
          data[index].focus = true;
        }
  
      });
    }



    
  }

  
  // 메모 데이터가 하나도 없는 경우 생성하는 함수
  const createMemo = () => {
    setMemos([{id : 1, value : "", focus : true, title : false}]);
  }

  // 방향키에 따라 커서 이동하는 함수
  const setCursor = (e,id) => {

    // 해당 커서에 children 값이 있는지에 따라 변수 할당
    // const exist = (memos[id-1]) && ( (memos[id-1].children.length) ? true : false ) ;
    const exist = (memos[id-1]) && ( (memos[id-1].list) ? true : false ) ;

    // 상위 컴포넌트에 children 값이 있는지에 따라 변수 할당
    // const upExist = (memos[id-2]) && ( (memos[id-2].children.length) ? true : false ) ;
    const upExist = (memos[id-2]) && ( (memos[id-2].list) ? true : false ) ;

    // 있다면 마지막 인덱스 번호 저장
    // const upLastIndex = upExist ? (memos[id-2].children.length-1) : null;
    const upLastIndex = upExist ? (memos[id-2].children.length-1) : null;


    // children이 있다면
    if(exist){
      // 아래 방향키를 눌렀을 때
      if(e.key === "ArrowDown"){
        setMemos((data)=>{
          if(data[id-1].children[0]){
            // 만약 첫 번째 자손 메모가 있다면!
            // children 첫번째에 커서 두기
            data[id-1].children[0]["focus"] = true;
            data[id-1].focus = false;
          }else{
            // 만약 첫 번째 자손 메모가 없다면!
            // 아래 메모에 커서 두기
            data[id].focus = true;
          }
        })
        return;
      }
    }

    // 차일드인 경우
    if(id > 100){

      const index = Math.floor(id / 100) - 1;

      const targetIndex = id - (Math.floor(id / 100) * 100) - 1;

      // 가장 첫 번째 차일드인 경우
      if(id - (Math.floor(id / 100) * 100 ) === 1){
        // 방향키 위를 누를 경우
        if(e.key === "ArrowUp"){
          setMemos((data)=>{
            // 부모에게 커서 두기
            data[index].focus = true;
            data[index].children[0]["focus"] = false;
          })
          return;
        }
        
      }

      // 가장 마지막 차일드인 경우
      if(id - (Math.floor(id / 100) * 100) === memos[index]["children"].length){
        // 마지막 자손의 인덱스 번호를 저장한다.
        const lastChildIndex = memos[index]["children"].length - 1;
        // alert(lastChildIndex);
        if(e.key === "ArrowDown"){
          setMemos((data)=>{
            // 아래 컴포넌트에 커서 두기
            if(data[index+1]){
              data[index+1]["focus"] = true;
              data[index].children[lastChildIndex]["focus"] = false;
            }else{
              data[index].children[lastChildIndex]["focus"]= true;
            }
          })
        }

        if(e.key === "ArrowUp"){
          // 방향키가 위인 경우
          setMemos((data)=>{
            data[index].children[lastChildIndex-1]["focus"] = true;
            data[index].children[lastChildIndex]["focus"] = false;
          })
        }
        return;
        
      }

      // children에서 방향키 위를 누를경우
      if(e.key === "ArrowUp"){
        setMemos((data)=>{
          // 위 children에 커서를 둔다
          data[index].children[targetIndex - 1]["focus"] = true;
          data[index].children[targetIndex]["focus"] = false;
        })
      }else{
        // 방향키 아래인 경우
        setMemos((data)=>{
          // 아래 children에 커서를 둔다
          data[index].children[targetIndex + 1]["focus"] = true;
          data[index].children[targetIndex]["focus"] = false;
        })
      }

    }else{
      if(e.key === "ArrowUp"){

          setMemos((data)=>{
            if(data[id-2]){
  
              // 위에 커서
              data[id-2].focus = true;
              
              // 커서 해제
              data[id-1].focus = false;
            }
          })


      }
      if(e.key === "ArrowDown"){
        setMemos((data)=>{
          if(data[id]){
            data[id].focus = true;
            data[id-1].focus = false;
          }
        })
      }
    }
  }

  // 메모 모드 선택 시 memos 업데이트 하는 함수
  const setMode = (id,value,type)=>{

    const getIndex = memos.findIndex((item)=>(item.id===id));

    const getMemo = value;

    // 0인 경우 => 타이틀
    if(!type){
      setMemos((prev)=>([...prev.map((item)=>{
        if(item.id === getIndex + 1){
          return {...item, value : getMemo, focus : false, title : true, list : false}
        }
        return item;
      })]));
    }else{
      // 1인 경우 => 토글
      setMemos((prev)=>([...prev.map((item)=>{
        if(item.id === getIndex + 1){
          return {...item, value : getMemo, focus : true, title : false, list : true, children : [{
            id : id*100+1,
            value : "",
            focus : false,
            title : false,
            list : false
          }]}
        }
        return item;
      })]));
    }

  }

  // 온 체인지 시 값 업데이트 해보기
  const handleChildChange = (value ,id) => {

    const index = Math.floor(id / 100) - 1;

    const targetIndex = Number(id - ((index + 1) * 100) - 1);

    console.log(value);

    setMemos((data)=>{
      data[index]["children"][targetIndex]["value"] = value;
    });
  }

  // 위에 토글인 경우 Tab 키 누를 시 자손으로 할당하는 함수.
  const memoToChild = (value, getId)=>{
    const index = createIndex(getId);
    if( (memos[index-1]) && memos[index-1].list){
      const add = memos[index-1].children.length;
      setMemos((data)=>{
        data[index-1].children.splice(add,0,{
          id : Number(index*100 + add + 1),
          value,
          focus : false,
          title : false,
          list : false,
          open : false
        });

        data.splice(index,1);

        data.forEach((item)=>{
          if(item.id > index){
            item.id = item.id-1;
            if(item.list){
              item.children.forEach((item)=>(item.id = item.id - 100));
            }
          }
        })

      })
    }

  }

  // 클릭 시 맨 뒤에 메모 추가하기
  const addLastMemo = ()=>{
    const lastIndex = memos.length;
    setMemos((data)=>{
      data.push({
      id : Number(data.length + 1),
      value : "",
      focus : false,
      title : false,
      list : false,
      open : false,
      indent : 0,
      children : []
      })
    })
  }

  // 드래그 스타트 함수
  const handleDragStart = (e, value, startId, getIndent) => {

    setDrag((prev)=>(!prev));

    // 그냥 메모라면
    if(startId < 100){
      // draggedMemo.value = value;
      setDraggedId(startId);
      setDraggedMemo(value);
      setDraggedIndent(getIndent);
    }

    // 차일드 메모라면
    if(startId > 100){
      setDraggedId(startId);
      setDraggedMemo(value);
    }
  }

  // 드래그 엔드 함수
  const handleDragEnd = (e, endId) => {

    const endIndex = createIndex(endId);
    const endDraggedIndex = createIndex(draggedId);

    // 만약 드래그 되는 녀석이 안으로 들어가야 한다면
    if(endId > 100 && draggedId < 100){

      const endChildIndex = createChildIndex(endId);

      setMemos((prev)=>{
        prev.splice(endDraggedIndex,1);

        prev.forEach((item)=>{
          if(item.id > draggedId){

            if(item.children.length > 0){
              item.children.forEach((item)=>{
                return item.id = item.id - 100;
              });
            }
            return item.id = item.id -1;
          }

        })

        // prev[endIndex].children.forEach((item)=>{
        //   if(item.id > endId){
        //     return item.id = item.id + 1;
        //   }
        // });

        if(endIndex > draggedId -1){

          prev[endIndex - 1].children.forEach((item)=>{
            if(item.id > endId - 100){
              return item.id = item.id + 1 ;
            }
          });

          prev[endIndex-1].children.splice(endChildIndex + 1,0,{
            id : endId + 1 - 100,
            value : draggedMemo,
            focus : false,
            title : false,
            list : false,
            open : false
          });
        }else{

          prev[endIndex].children.forEach((item)=>{
            if(item.id > endId){
              return item.id = item.id + 1;
            }
          });
          

          prev[endIndex].children.splice(endChildIndex + 1,0,{
            id : endId + 1,
            value : draggedMemo,
            focus : false,
            title : false,
            list : false,
            open : false
          });
        }


      });

      return;
    }

    // 같은 차일드 위상끼리에서 드래그되는 친구가 엔드보다 크다면
    if(endId > 100 && draggedId > 100 && endIndex === endDraggedIndex && draggedId > endId){

      // const endChildIndex = createChildIndex(endId)
      // const draggedChildIndex = createChildIndex(draggedId);

      const draggedChildIndex = createChildIndex(draggedId);
      const endChildIndex = createChildIndex(endId);


      setMemos((prev)=>{

        prev[endIndex].children.splice(draggedChildIndex,1);

        prev[endIndex].children.forEach((item)=>{
          if(item.id > endId && item.id < draggedId){
            return item.id = item.id + 1;
          }
        });
        prev[endIndex].children.splice(endChildIndex + 1, 0, {
          id : endId + 1,
          value : draggedMemo,
          focus : false,
          title : false,
          list : false,
          open : false
        })
      });
      return;
    }


    // 드래그 되는 친구가 엔드되는 친구보다 크다면
    // childMemo 포함
    if(endId < draggedId && endId < 100){

      setMemos((prev)=>{
        
        // 드래그 되는 친구 지우는 로직
        if(draggedId < 100){
          // 드래그 되는 친구가 그냥 메모라면

          // 드래그 한 것은 없애고 => 얘가 문젠데...
          prev.splice(draggedId -1, 1);
          
        }else{

          // 드래그 되는 친구가 자손 메모라면 (draggedId 가 100보다 크다면)
          const idx = createIndex(draggedId);
          const childIdx = createChildIndex(draggedId);
          
          prev[idx]["children"].splice(childIdx, 1);

        

          prev[idx].children.forEach((item)=>{
            if(item.id > draggedId){
              return item.id = item.id - 1;
            }
          })

        }

        // prev.filter((item)=>(item.id !== draggedMemo.id));


        prev.forEach((item)=>{
          if(item.id > endId){
            if( (item.children.length) && item.children.length > 0){

              if(item.id > draggedId){
                // alert("100 추가 안해도 대");
                return ;
              }
                item.children.forEach((child)=>{
                  return child.id = child.id+100;
                })

            }
            if(item.id >= draggedId){
              return ;
            }
            return item.id = item.id+1;
          }
        });

        // 드래그 이벤트 오류 해결, 그러나 원인을 명확히 알지 못함 ( 알아보기 )

        // 1. 드래그 완료 된 (스테이트로 관리하는)객체를 삽입
        // => 객체가 즉시 스테이트 값에 업데이트 되지 않으며, 버그 발생
        // 여기서의 draggedMemo는 객체로서 관리되는 State
        // prev.splice(endId, 0 , draggedMemo);

        
        // 2. 드래그된 값과 아이디를 담은 객체를 삽입
        // => 입력한 객체가 즉시 스테이트에 업데이트 된다.
        // 여기서의 draggedMemo는 문자열 State
        prev.splice(endId,0,{
          id : endId + 1,
          value : draggedMemo,
          focus : false,
          title : false,
          list : false,
          open : false,
          indent : draggedIndent,
          children : []
        });

        
        
        
      })

    }else{
      // 드래그 된 메모가 추가될 메모보다 작다면...

      const draggedIndex = createIndex(draggedId);
      const draggedChildIndex = createChildIndex(draggedId);

      const endIndex = createIndex(endId);

      // 같은 부모에서 작은녀석이 큰놈뒤로 간다면
      if(endId > 100 && draggedId > 100 && draggedIndex === endIndex){

        const endChildIndex = createChildIndex(endId);
        
        setMemos((prev)=>{
          // 일단 삭제
          prev[endIndex].children.splice(draggedChildIndex, 1);

          // 아이디값 증감
          prev[endIndex].children.forEach((item)=>{

            // 사이값은 1씩 감소
            if(item.id > draggedId && item.id <= endId){
              return item.id = item.id - 1;
            }

            // 뒷부분은 1씩 증가
            // if(item.id > endId){
            //   return item.id = item.id + 1;
            // }

          });

          prev[endIndex].children.splice(endChildIndex ,0,{
            id : endId,
            value : draggedMemo,
            focus : false,
            title : false,
            list : false,
            open : false
          });

        });

        return;

      }

      // 작은 자손에서 큰 자손으로 간다면
      if(endId > 100 && draggedId > 100 && draggedIndex !== endIndex){

        const endChildIndex = createChildIndex(endId);
        
        setMemos((prev)=>{

          // 드래그 되는 친구 삭제하기
          prev[draggedIndex].children.splice(draggedChildIndex,1);

          // 드래그 뒤로 차일드들 숫자 줄이기
          prev[draggedIndex].children.forEach((item)=>{
            if(item.id > draggedId){
              return item.id = item.id - 1 ;
            }
          })

          // 엔드 뒤로 차일드들 숫자 늘리기
          prev[endIndex].children.forEach((item)=>{
            if(item.id > endId){
              return item.id = item.id + 1;
            }
          })

          // 드래그 뒤로 데이터 삽입
          prev[endIndex].children.splice(endChildIndex + 1,0,{
            id : endId + 1,
            value : draggedMemo,
            focus : false,
            title : false,
            list : false,
            open : false
          });

        });
        return;
      }

      setMemos((prev)=>{

        prev.splice(draggedId -1, 1);
        
        // if(draggedId < 100){
        //   // 드래그 한 것은 없애고
        //   prev.splice(draggedId -1, 1);
        // }

        // if(endId > 100) {
        //   // 드래그 되는 아이디가 100보다 크다면
        //   if(draggedId > 100){
        //     prev[draggedIndex].children.forEach((item)=>{
        //     if(item.id > draggedId){
        //       return item.id = item.id-1;
        //     }
        //   })

        // }


        // }else{

        //   prev.forEach((item)=>{
        //     // 종착 메모보다 작거나 같고 드래그되는 아이디가 작으면
        //     if(item.id <= endId && draggedId < item.id){
        //       if( (item.children.length) && item.children.length > 0){
        //         item.children.forEach((child)=>{
        //           return child.id = child.id-100;
        //         })
        //       }
        //       if(item.id <= draggedId){
        //         return ;
        //       }
        //       return item.id = item.id-1;
        //     }
        //   });
  
        //   prev.splice(endId-1,0,{
        //     id : endId ,
        //     value : draggedMemo,
        //     focus : false,
        //     title : false,
        //     list : false,
        //     open : false,
        //     children : []
        //   });

        // }
        
        
        prev.forEach((item)=>{
          if(item.id <= endId && draggedId < item.id){
            if( (item.children.length) && item.children.length > 0){
              item.children.forEach((child)=>{
                return child.id = child.id-100;
              });
            }
            if(item.id <= draggedId){
              return ;
            }
            return item.id = item.id-1;
          }
        });

        prev.splice(endId-1,0,{
          id : endId ,
          value : draggedMemo,
          focus : false,
          title : false,
          list : false,
          open : false,
          // indent : draggedIndent ? draggedIndent : 0,
          children : []
        });

      });


    }


    // 드래그 끝
    setDrag((prev)=>(!prev));
    setDraggedId(null);
  }



  // 데이터 긴급 삭제 함수
  const deleteData = (e) => {
    if(prompt("삭제하겠습니까?")){
      localStorage.clear();
      setMemos(initialData);
    }else{
      return;
    }
    // localStorage.setItem("memos", JSON.stringify(initialData));
  }

  // initailData로 데이터 리셋
  const defaultData = (e) => {
    if(prompt("데이터 그렇게?")){
      localStorage.clear();
      setMemos(initialData);
    }else{
      return;
    }
  }

  // indent 조정
  const handleIndent = (e, getId, getIndent) => {


    const index = createIndex(getId);

    // memos 조정
    setMemos((prev)=>{
      prev[index].indent = getIndent;
    });

  }



  // 마지막 p 태그는 없애도 될듯 합니다.

  const memoFront = (value, getId) => {

    // 뒤에서 앞당겨지는 문자열의 길이
    setDelCursor([getId - 1, value.length + 1]);
    
    const index = createIndex(getId);

    if(index === 0){
      return;
    }

    setMemos((prev) => {

      prev.splice(index,1);

      prev[index - 1].value = prev[index - 1].value + ` ${value}`;
      
      prev.forEach((item)=>{
        if(item.id > getId){
          if(item.children.length > 0){
            item.children.forEach((item)=>{
              return item.id = item.id - 100;
            })
          }

          return item.id = item.id - 1;
        }
      });

    });

    setTimeout(()=>{
      setMemos(prev=>{
        prev[index - 1].focus = true;
      });
    },10);



  }



  return(

    <section className='MEMO'>
      <h2 className='sect_title hidden'> MEMO </h2>
      {memos.length ? memos.map((item) => (item.list ? <MemoList key={item.id} id={item.id} memoData={item.value} children={item.children} focus={item.focus} title={item.title} list={item.list} open={item.open} idt={item.indent} handleIndent={handleIndent} drag={drag} updateMemo={handleList} handleToggleBlur={handleToggleBlur} addMemo={addMemo} addList={addList} deleteMemo={deleteMemo} setCursor={setCursor} setMode={setMode} deleteChild={deleteChild} handleChildChange={handleChildChange} handleDragStart={handleDragStart} addVacantChild={addVacantChild} handleDragEnd={handleDragEnd} /> :(<MemoNormal key={item.id} id={item.id} memoData={item.value} focus={item.focus} title={item.title} list={item.list} idt={item.indent} handleIndent={handleIndent} drag={drag}  updateMemo={handleMemo} addMemo={addMemo} deleteMemo={deleteMemo} setCursor={setCursor} setMode={setMode} memoToChild={memoToChild} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} memoFront={memoFront}  delCursor={delCursor} />))) : <p onClick={createMemo}>메모가 없습니다.</p>}

      <div>
        <button onClick={addLastMemo} className='last_add_btn' > 클릭하여 메모 추가 </button>
      </div>

      <button onClick={deleteData}>데이터 삭제</button>

      <button onClick={defaultData}>데이터 디폴트로</button>


    </section>
  );
}

export default Memo02;



// 초기 데이터 로컬 스토리지 연결 후 사용 X
const initialData = [
  {
    id : 1,
    value : "이 메모는 localStorage에 저장되지 않습니다.",
    focus : false,
    title : true,
    list : false,
    open : false,
    indent : 0,
    children : []
  },
  {
    id : 2,
    value : "이 메모 기능은 Notion앱의 기능을 밴치마킹 했습니다.",
    focus : false,
    title : false,
    list : false,
    open : false,
    indent : 0,
    children : []
  },
  {
    id : 3,
    value : "이 웹/앱에 대한 설명",
    focus : false,
    title : false,
    list : true,
    open : false,
    indent : 0,
    children : [
      {
        id : 301,
        value : "1 : React로 다양한 Notion 메모 기능을 구현",
        focus : false,
        title : false,
        list : false,
        open : false
      },
      {
        id : 302,
        value : "2 : 컴포넌트를 데이터 기반으로 랜더링",
        focus : false,
        title : false,
        list : false,
        open : false
      },
      {
        id : 303,
        value : "3 : 다양한 리액트 hook을 사용",
        focus : false,
        title : false,
        list : false,
        open : false
      },
      {
        id : 304,
        value : "4 : useImmer 라이브러리를 활용하여 state를 관리",
        focus : false,
        title : false,
        list : false,
        open : false
      },
      {
        id : 305,
        value : "5 : Figma를 활용해 디자인",
        focus : false,
        title : false,
        list : false,
        open : false
      }
    ]
  },
  {
    id : 4,
    value : "상위 메모가 toggle 인 경우 tab을 누를 시 자손메모로 들어갑니다.",
    focus : false,
    title : false,
    list : false,
    open : false,
    indent : 0,
    children : []
  },
  {
    id : 5,
    value : "이 웹/앱의 문제점",
    focus : false,
    title : false,
    list : true,
    open : false,
    indent : 0,
    children : [
      {
        id : 501,
        value : "1 : 코드 재활용이 미숙 useReducer 활용 실패",
        focus : false,
        title : false,
        list : false,
        open : false
      },
      {
        id : 502,
        value : "2 : 복잡한 코드(정리 필요)",
        focus : false,
        title : false,
        list : false,
        open : false
      },
      {
        id : 503,
        value : "3 : ",
        focus : false,
        title : false,
        list : false,
        open : false
      }
    ]
  },
  {
    id : 6,
    value : "이 웹/앱의 보완 사항",
    focus : false,
    title : false,
    list : true,
    open : false,
    indent : 0,
    children : [
      {
        id : 601,
        value : "1 : 메모 컴포넌트 각각이 객체 데이터로 이루어져 있는데 다양한 이벤트로 기능을 구현한 탓에 객체의 프로퍼티를 추가/수정/삭제 하는 경우 모든 절차를 찾아 코드를 수정해야 하는 문제가 있다. 따라서 객체 데이터를 클래스로 관리 할 필요가 있다.",
        focus : false,
        title : false,
        list : false,
        open : false
      },
      {
        id : 602,
        value : "2 : 복잡한 코드를 재사용 하기 위해 useReducer hooks를 사용할 필요가 있다.",
        focus : false,
        title : false,
        list : false,
        open : false
      },
      {
        id : 603,
        value : "3 : ",
        focus : false,
        title : false,
        list : false,
        open : false
      }
    ]
  }
];


// 클래스 사용해보기
class NomallyMemo {
  constructor (id, value, focus, title, list, open, indent, children ){
    this.id = id;
    this.value = value;
    this.focus = focus;
    this.title = title;
    this.list = list;
    this.open = open;
    this.indent = indent;
    this.children = children;
  }
}

// 인덱스 번호를 구하는 함수
function createIndex(idx) {
  if(idx > 100){
    let result = Math.floor(idx / 100) - 1;
    return result;
  }
  return Number(idx - 1);
}

// 차일드 인덱스를 구하는 함수
function createChildIndex(idx){
  let result = (idx - Math.floor(idx / 100) * 100) - 1;
  return Number(result);
}

