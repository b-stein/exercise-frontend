import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Location } from 'history';
import queryString from 'query-string';
import { Show } from "./definitions/Show";

interface ActiveShowProps {
  shows: Show[];
}

const ActiveShow: React.SFC<ActiveShowProps> = (props) => {
	const [foundActiveShow, setFoundActiveShow] = useState<Show | null>(null);
  const location: Location = useLocation();

  useEffect(() => {
    const values = queryString.parse(location.search);
    const foundShow = props.shows.find(s => s.id === values.id);
    
    setFoundActiveShow(foundShow);
  }, [location]);

  return (
    <>
    {foundActiveShow && (
      <section className='active-show-card'>
        <img className='active-card-img' src={foundActiveShow.product_image_url} />
        <p>{foundActiveShow.episodes} episodes</p>
        <h1>{foundActiveShow.title}</h1>
      </section>
    )}
    </>
	)
}

export default ActiveShow;