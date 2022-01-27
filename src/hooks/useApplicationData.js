import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {
const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  const getSpotsForDay = (day, appointments) => {
    // Iterate through the day's appt id's
    // Count how many have null interview
    let spots = 0;
    for (const id of day.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    return spots;
  }

  const updateSpots = function (state, appointments) {
    // Get the day object
      const dayObj = state.days.find(day => day.name === state.day);
      const spots = getSpotsForDay(dayObj, appointments)
      const day = {...dayObj, spots}
      const newDays = state.days.map(d => d.name === state.day ? day : d);
  
    // Return days array
  
        return newDays;
  }

  const bookInterview = (id, interview) => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      return (
        axios.put(`/api/appointments/${id}`, {
        interview
      })
      .then(() => {
        updateSpots(state, appointments);
      })
    )
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
  }
    return (
      axios.delete(`/api/appointments/${id}`)
      .then(() => {
        updateSpots(state, appointments);
      })
    )
  }

  useEffect(() => {
    const days = axios.get('/api/days');
    const appointments = axios.get('/api/appointments');
    const interviewers = axios.get('/api/interviewers')
    Promise.all([
      days,
      appointments,
      interviewers
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      console.log(all)
    });
  }, []); 


  return { state, setDay, bookInterview, cancelInterview }
}