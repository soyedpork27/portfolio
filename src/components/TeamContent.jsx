import React from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import TeamDetail from './TeamDetail';


// 프로젝트 css import
import '../css/project.css';

function TeamContent(props) {

  let {id} = useParams();

  // let [teamData, setTeamData] = useState([]);


  let {isLoading, data:teamdata} = useQuery(["teamdata"], async ()=>{

  return(
    fetch(`/data/teamProject.json`)
    .then(res => (res.json()))
    );
  },{
    staleTime : 1000 * 60 * 3
  });


  if(isLoading) return <p>Loading...</p>

  return (
    <>
      {/* useEffect / useQuery 는 랜더링이 다 끝난 뒤 코드가 실행된다. */}
      {isLoading ? "" : <TeamDetail data={teamdata[id-1]} />}
    </>
  );
}

export default TeamContent;