import React from 'react';
import { Show } from "./definitions/Show";
import MiniShowCard from './MiniShowCard';

interface ShowListProps {
  shows: Show[],
  isMobile: Boolean,
}

const ShowList: React.SFC<ShowListProps> = ({ shows, isMobile}) => {
  const showsAtAGlance = shows.map((show, i) => {
    return <MiniShowCard show={show} key={i} index={i} isMobile={isMobile} />
  })

	return (
    <div>
      {isMobile && <hr className="solid" />}
      <section className='show-carousel' style={{width: isMobile ? '95vw' : '65vw'}}>
        {showsAtAGlance}
      </section>
      {!isMobile && <hr className="solid" />}
    </div>  
	)
}

export default ShowList;