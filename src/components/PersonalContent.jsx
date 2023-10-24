import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import PersonalDetail from './PersonalDetail';

// 프로젝트 css import
import '../css/project.css';

function PersonalContent({proMod,setProMod}) {


  let {id} = useParams();
  console.log(id);

  let {isLoading, data : personaldata, error} = useQuery(["personaldata"], async () => {
    return (
      fetch(`/data/personalProject.json`)
      .then((res) => (res.json()))
      );
  },{
    staleTime : 1000 * 60 * 3
  });

  if(isLoading) return <p>로딩중...</p>

  return (
    <>
    {
      isLoading ? "" : <PersonalDetail data={personaldata[id-5]} proMod={proMod} setProMod={setProMod} />
    }
      
    </>
  );
}


const modData = [

  {
    id : 5,
    title : "노티드 Knotted 홈페이지 클론코딩",
    page : [
      {
        id : "5a",
        des : "노티드 클론 코딩 메인 페이지",
        char : [
          "php로 페이지를 작성하였습니다.",
          "javascript로 슬라이드 기능을 구현하였으며 버튼 클릭 시 상품 정보 변경 시 opacity와 display 속성을 활용해 fadeIn/Out 효과를 구현했습니다.",
          "window 객체의 resize 이벤트를 활용해 자동 슬라이드의 반응형 기능을 완성했습니다."
        ]
      }
    ]
  }
  ,
  {
    id : 6,

  }
];

export default PersonalContent;