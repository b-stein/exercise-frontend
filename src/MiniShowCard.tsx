import React, { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom'
import { Show } from "./definitions/Show";
import { Link } from 'react-router-dom';

interface MiniShowCardProps {
  show: Show,
  index: number,
  isMobile: Boolean,
}

const MiniShowCard: React.SFC<MiniShowCardProps> = ({ show, index, isMobile }) => {
  const isActiveShow = useLocation().pathname.replace('/', '') === show.id;

  return (
    <Link to={`/${show.id}`} className={isMobile ? 'mini-show-card-mobile' : 'mini-show-card'}>
      <section>
        {isMobile && <p>{ isActiveShow ? index + 1 : '' }</p>}
        <img
          className={'show-card-img' + (isActiveShow ? ' active-carousel-item' : '')}
          src={show.product_image_url}
          />
        {!isMobile && <p>{ isActiveShow ? index + 1 : '' }</p>}
      </section>
    </Link>
	)
}

export default MiniShowCard;