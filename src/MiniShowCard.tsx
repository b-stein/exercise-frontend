import React from 'react';
import { Show } from "./definitions/Show";
import { Link } from 'react-router-dom';

interface MiniShowCardProps {
  show: Show,
  index: number,
  isMobile: boolean,
  isActive: boolean,
}

const MiniShowCard: React.FunctionComponent<MiniShowCardProps> = ({ show, index, isMobile, isActive }) => {
  return (
    <Link to={`/?id=${show.id}`} className={isMobile ? 'mini-show-card-mobile' : 'mini-show-card'}>
      <section>
        {isMobile && <p>{ isActive && index + 1 }</p>}
        <img
          className={'show-card-img' + (isActive && ' active-carousel-item')}
          src={show.product_image_url}
          />
        {!isMobile && <p>{ isActive && index + 1 }</p>}
      </section>
    </Link>
	)
}

export default MiniShowCard;