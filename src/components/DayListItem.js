import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
    let dayClass = classNames("DayListItem", {
      "day-list__item": true,
      "day-list__item--selected": props.selected === true,
      "day-list__item--full": props.spots === 0
    })

    const formatSpots = (spots) => {
        if (!spots) {
            return 'no spots remaining';
        } 
        
        if (spots === 1) {
            return  '1 spot remaining';
        } 
        
        return `${spots} spots remaining`
        
    }

  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass}>
      <h2>{props.name}</h2> 
      <h3>{formatSpots(props.spots)}</h3>
    </li>
  );
}