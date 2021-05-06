import React, { useEffect, useState } from 'react';
import { Show } from "./definitions/Show";

interface ActiveShowProps {
  // show: Show;
  match: any;
}

const ActiveShow: React.SFC<ActiveShowProps> = ({match}) => {
  const [activeShow, setActiveShow] = useState<Show | null>(null);

  useEffect(() => {findActiveShow()}, null);

  const findActiveShow = () => {
    console.log(match);
  }

	return (
		<section className='about-wrapper'>
			<p className='about'>
        ACTIVE SHOW
      </p>
			
		</section>
	)
}

export default ActiveShow;