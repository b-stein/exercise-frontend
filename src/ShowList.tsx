import React, { useRef } from 'react';
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
  const showListItems = useRef<HTMLDivElement>(null);

  const scroll = (scrollOffset: number): void => {
    showListItems.current.scrollLeft += scrollOffset;
  };

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
      <div className='show-carousel-wrapper' style={{ width: isMobile ? '95vw' : '65vw' }}>
        <button className="arrow left" onClick={() => scroll(-120)}></button>
        <section className='show-carousel' ref={showListItems}>
          {showsAtAGlance}
        </section>
        <button className="arrow right" onClick={() => scroll(120)}></button>
      </div>
      {!isMobile && <hr className="solid" />}
    </nav>  
	)
}

export default ShowList;