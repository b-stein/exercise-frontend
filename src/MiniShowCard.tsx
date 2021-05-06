import React from 'react';
import { Show } from "./definitions/Show";
import { Link } from 'react-router-dom';

interface MiniShowCardProps {
  show: Show,
}

const MiniShowCard: React.SFC<MiniShowCardProps> = (props) => {
	return (
    <Link to={`?id=${props.show.id}`}>
      <section className='mini-show-card'>
        <img
          className='show-card-img'
          src={props.show.product_image_url}
        />
      </section>
    </Link>
	)
}

export default MiniShowCard;