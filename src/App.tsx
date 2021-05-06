import React, { useEffect, useState } from 'react';
import { Route, Redirect, withRouter, useHistory, Switch } from "react-router-dom";
import ActiveShow from './ActiveShow';
import ShowList from './ShowList';
import { Show } from "./definitions/Show";

import './App.scss';


const App: React.SFC = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [activeShow, setActiveShow] = useState<Show>();
  const history = useHistory();

  useEffect(() => {fetchAllShows()}, []);
  // useEffect(() => {
  //   console.log(activeShow)
  //   if (activeShow.id) {
  //   }
  // });
  
  const fetchAllShows = async (): Promise<any> => {
    const response: any = await fetch('http://localhost:3000/shows');
    if (response.ok) {
      const data = await response.json();
      setActiveShow(data[0]);
      setShows(data);
      history.push(`/${data[0].id}`);
    } else {
      //TODO: Error handle
      throw new Error (response.statusText);
    }
  }

  return (
    <main className='container'>
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
      <ShowList shows={shows} activeShow={activeShow} />
    </main>
  )
}

export default withRouter(App);