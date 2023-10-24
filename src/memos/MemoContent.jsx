import React from 'react';

import {useParams} from 'react-router-dom';
// import {useQuery} from '@tanstack/react-query';
import MemoDetail from './MemoDetail';

function MemoContent(props) {

   // 메모 데이터
  // let [memoData, setMemoData] = useState(initialData);

  let {id} = useParams();

  const style = {
    wrap : {
      // width : `calc(100% - 280px)`,
      width : `calc(100%)`
    }
  }

  return (
    <>
      <div style={style.wrap} >
        <MemoDetail id={Number(id)} />

      </div>
    </>
  );
}

export default MemoContent;

// const initialData = [
//   {
//     id : 1,
//     title : "1번 메모",
//     content : ""
//   },
//   {
//     id : 2,
//     title : "2번 메모",
//     content : ""
//   }
// ]