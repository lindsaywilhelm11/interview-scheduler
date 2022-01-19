import React from "react"
import DayListItem from "./DayListItem";

export default function DayList(props) {
    const parsedItems = props.days.map(dayList => 
    <DayListItem  
      key={dayList.id}
      name={dayList.name}
      spots={dayList.spots}
      selected={dayList.name === props.day}
      setDay={dayList.setDay} />)

    return <ul>{parsedItems}</ul>
}