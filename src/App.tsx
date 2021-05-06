import React, { useEffect, useState } from 'react';
import { Route, withRouter, Switch } from "react-router-dom";
import ActiveShow from './ActiveShow';
import ShowList from './ShowList';
import { Show } from "./definitions/Show";

import './App.scss';


const App: React.SFC = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [activeShow, setActiveShow] = useState<Show | null>(null);

  useEffect(() => {fetchAllShows()}, []);

  const fetchAllShows = async (): Promise<any> => {
    const response: any = await fetch('http://localhost:3000/shows');
    if (response.ok) {
      const data = await response.json();
      setActiveShow(data[0]);
      setShows(data);
    } else {
      //TODO: Error handle
      throw new Error (response.statusText);
    }
  }

  return (
    <main className='container'>
      {/* <Switch> */}
        <Route path="/?id=:id" component={ActiveShow} />
      {/* </Switch> */}
      <ShowList shows={shows} activeShow={activeShow} />
    </main>
  )
}

export default withRouter(App);