// import logo from './logo.svg';
import React, { useState } from 'react';
import Body from './components/Body';


// router-dom import
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


// css import
import './css/reset.css';
import './css/common.css';
import NotFound from './pages/NotFound';
import Home from './components/Home';
import TeamContent from './components/TeamContent';
import PersonalContent from './components/PersonalContent';
import MemoContent from './memos/MemoContent';

export default function App() {

  const queryClient = new QueryClient();

  let [proMod, setProMod] = useState(false);


  const router = createBrowserRouter([
    {
      path : "/",
      element : <Body proMod={proMod} />,
      errorElement : <NotFound/>,
      children : [
        {
          index : true,
          element : <Home />
        },
        {
          path : "/team/:id",
          element : <TeamContent />
        },
        {
          path : "/personal/:id",
          element : <PersonalContent proMod={proMod} setProMod={setProMod}/>
        },
        {
          path : "/memos/:id",
          element : <MemoContent/>
        }
      ]
    }
  ])

  return (
    <QueryClientProvider client={queryClient}>

      <RouterProvider router={router} />

    </QueryClientProvider>

  );


}