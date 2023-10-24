import React from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import PersonalDetail from './PersonalDetail';

// 프로젝트 css import
import '../css/project.css';

function PersonalContent({proMod,setProMod}) {


  let {id} = useParams();
  console.log(id);

  let {isLoading, data : personaldata} = useQuery(["personaldata"], async () => {
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


export default PersonalContent;