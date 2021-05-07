import React, { useEffect, useState } from 'react';
import { Route, Redirect, withRouter, useHistory, useLocation, Switch } from "react-router-dom";
import queryString from 'query-string';
import { Show } from "./definitions/Show";
import { getAllShows } from "./apiCalls";
import ActiveShow from './ActiveShow';
import ShowList from './ShowList';
import './App.scss';

const App: React.FunctionComponent = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [width, setWidth] = useState<Number>(window.innerWidth);
  const [error, setError] = useState<String>('');
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

      // Initial load pushes to first show
      if (!location.search) {
        history.push(`/?id=${data[0].id}`);
      } else {
        history.push(location.search);
      }
    } catch(error) {
      console.log('ERROR: Something went wrong.', error);
      setError(`Uh oh. Something went wrong. Try again later.`);
    }
  }

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  return (
    <main className='container'>
      {error && <h2 className="error-msg">{error}</h2>}
      
      {width > 980 && !error && <ShowList shows={shows} isMobile={false} />}
      <Switch>
        <Route
          path="/"
          render={() => <ActiveShow shows={shows} />}
        />
      </Switch>
      {width < 980 && !error && <ShowList shows={shows} isMobile={true} />}
    </main>
  )
}

export default App;