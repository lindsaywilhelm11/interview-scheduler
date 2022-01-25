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

  const bookInterview = (id, interview) => {
    console.log(id, interview);

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
        .then(() => setState({
        ...state,
        appointments
      })
    ))
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
      .then(() => setState({
        ...state,
        appointments
      })
    ))
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