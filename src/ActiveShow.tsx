import React from 'react';
import { Show } from "./definitions/Show";

interface ActiveShowProps {
  show: Show;
}

const ActiveShow: React.SFC<ActiveShowProps> = ({ show }) => {
	return (
    <>
    {show && (
      <section className='active-show-card'>
        <img
          className='active-card-img'
          src={show.product_image_url}
        />
        <p>{show.episodes} episodes</p>
        <h2>{show.title}</h2>
      </section>
    )}
    </>
	)
}

export default ActiveShow;