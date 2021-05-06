import React, { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom'
import { Show } from "./definitions/Show";
import { Link } from 'react-router-dom';

interface MiniShowCardProps {
  show: Show,
}

const MiniShowCard: React.SFC<MiniShowCardProps> = ({ show }) => {
  const isActiveShow = useLocation().pathname.replace('/', '') === show.id;

  console.log(isActiveShow)
	return (
    <Link to={`/${show.id}`} className='mini-show-card'>
      <section>
        <img
          className={'show-card-img' + (isActiveShow ? ' active-carousel-item' : '')}
          src={show.product_image_url}
        />
      </section>
    </Link>
	)
}

export default MiniShowCard;