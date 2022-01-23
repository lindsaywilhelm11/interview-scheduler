import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import "components/Application.scss";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

const schedule = appointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);

  return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
    />
  );
});

  
    useEffect(() => {
      const days = axios.get('/api/days');
      const appointments = axios.get('/api/appointments');
      const interviews = axios.get('/api/interviewers')
      Promise.all([
        days,
        appointments,
        interviews
      ]).then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
        console.log(all)
      });
    }, []);

    const dailyAppointments = getAppointmentsForDay(state, state.day);
    
    

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
