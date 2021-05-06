import React from 'react';
import { Show } from "./definitions/Show";
import MiniShowCard from './MiniShowCard';

interface ShowListProps {
  shows: Show[],
  activeShow: Show,
}

const ShowList: React.SFC<ShowListProps> = (props) => {
  const showsAtAGlance = props.shows.map((show, i) => {
    return <MiniShowCard show={show} />
  })

	return (
		<section className='show-carousel'>
      {showsAtAGlance}
		</section>
	)
}

export default ShowList;