import React from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Show } from "./definitions/Show";
import MiniShowCard from './MiniShowCard';

interface ShowListProps {
  shows: Show[],
  isMobile: Boolean,
}

const ShowList: React.FunctionComponent<ShowListProps> = ({ shows, isMobile }) => {
  const location = useLocation();

  const showsAtAGlance = shows.map((show, i) => {
    const isActive = queryString.parse(location.search).id === show.id;

    return (
      <MiniShowCard
        show={show}
        key={i}
        index={i}
        isMobile={isMobile}
        isActive={isActive}
      />
    )
  })

	return (
    <nav>
      {isMobile && <hr className="solid" />}
      <section className='show-carousel' style={{ width: isMobile ? '95vw' : '65vw' }}>
        {showsAtAGlance}
      </section>
      {!isMobile && <hr className="solid" />}
    </nav>  
	)
}

export default ShowList;