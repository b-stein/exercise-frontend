import React, { useEffect, useState } from 'react';
import { Route, Redirect, withRouter, useHistory, useLocation, Switch } from "react-router-dom";
import { Show } from "./definitions/Show";
import { getAllShows } from "./apiCalls";
import ActiveShow from './ActiveShow';
import ShowList from './ShowList';
import './App.scss';

const App: React.FunctionComponent = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [width, setWidth] = useState(window.innerWidth);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {fetchAllShows()}, []);
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  
  const fetchAllShows = async (): Promise<void> => {    
    try {
      const data: Show[] = await getAllShows();
      setShows(data);

      if (location.pathname !== `/`) {
        history.push(location.pathname);
      } else {
        history.push(`/?id=${data[0].id}`);
      }
    } catch(error) {
      //TODO: Error handle
      throw new Error (error.statusText);
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
          path="/"
          render={() => <ActiveShow shows={shows} />}
        />
      </Switch>
      {width < 980 && <ShowList shows={shows} isMobile={true} />}
    </main>
  )
}

export default App;