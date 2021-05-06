import React, { useEffect, useState } from 'react'
import { Route } from "react-router-dom"
import ActiveShow from './ActiveShow'
import ShowList from './ShowList'
import './App.scss'


const App: React.SFC = () => {
  const [shows, setShows] = useState([]);
  const [activeShow, setActiveShow] = useState({});

  useEffect(() => {fetchAllShows()}, []);

  const fetchAllShows = async (): Promise<any> => {
    const response: any = await fetch('http://localhost:3000/shows');
    if (response.ok) {
      const data = await response.json();
      console.log(data)
    } else {
      //TODO: Error handle
      throw new Error (response.statusText);
    }
  }

  return (
    <div className='container'>
      <Route exact path="?id=:id" render={({ match }) => {
        const { id } = match.params;
        return <ActiveShow show={shows.find(s => s.id === id)} />
        }}
      />
      <ShowList />
    </div>
  )
}

export default App;