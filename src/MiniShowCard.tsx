import React, { useState, useEffect} from 'react';
import { Show } from "./definitions/Show";
import { Link } from 'react-router-dom';

interface MiniShowCardProps {
  show: Show,
  index: number,
  isMobile: Boolean,
  isActive: Boolean,
}

const MiniShowCard: React.SFC<MiniShowCardProps> = ({ show, index, isMobile, isActive }) => {
  return (
    <Link to={`/?id=${show.id}`} className={isMobile ? 'mini-show-card-mobile' : 'mini-show-card'}>
      <section>
        {isMobile && <p>{ isActive ? index + 1 : '' }</p>}
        <img
          className={'show-card-img' + (isActive ? ' active-carousel-item' : '')}
          src={show.product_image_url}
          />
        {!isMobile && <p>{ isActive ? index + 1 : '' }</p>}
      </section>
    </Link>
	)
}

export default MiniShowCard;