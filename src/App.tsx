import React, { useEffect, useState } from 'react'
import './App.scss'


const App: React.SFC = () => {
  const [shows, setShows] = useState('');

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
      <h1>Hello World, React!</h1>
    </div>
  )
}

export default App;