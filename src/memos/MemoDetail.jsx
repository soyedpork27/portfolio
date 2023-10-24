import React from 'react';
import Memo from './Memo';
import Memo02 from './Memo02';

function MemoDetail({id}) {

  

  return (
    <>
      <div className='memo_ctnt'>
        {id === 1 ? <Memo /> : <Memo02/>}
        {/* <Memo /> */}
      </div>
    </>
  );
}

export default MemoDetail;