import React, { useEffect, useState } from 'react';
import { Route, Redirect, withRouter, useHistory, useLocation, Switch } from "react-router-dom";
import ActiveShow from './ActiveShow';
import ShowList from './ShowList';
import { Show } from "./definitions/Show";

import './App.scss';


const App: React.SFC = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [width, setWidth] = useState(window.innerWidth);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {fetchAllShows()}, []);
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  
  const fetchAllShows = async (): Promise<any> => {
    const response: any = await fetch('http://localhost:3000/shows');
    
    if (response.ok) {
      const data = await response.json();
      setShows(data);

      if (location.pathname !== `/`) {
        history.push(location.pathname);
      } else {
        history.push(`/${data[0].id}`);
      }
    } else {
      //TODO: Error handle
      throw new Error (response.statusText);
    }
  }

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  return (
    <main className='container'>
      {width > 980 && <ShowList shows={shows} isMobile={false} />}
      <Switch>
        <Route
          path="/:id"
          render={({ match }) => {
            const { id } = match.params;
            const chosenShow = shows.find(s => s.id === id);
            return (
              <ActiveShow show={chosenShow} />
              )
            }}
            />
        <Redirect to='/' />
      </Switch>
      {width < 980 && <ShowList shows={shows} isMobile={true} />}
    </main>
  )
}

export default withRouter(App);