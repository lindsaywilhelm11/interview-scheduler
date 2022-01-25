export const getAppointmentsForDay = (state, day) => {
  const results = [];
  const dayObjInfo = state.days.filter(days => days.name === day)

  if (!dayObjInfo.length) {
      return results;
  }

  dayObjInfo[0].appointments.forEach(item => {
    results.push(state.appointments[item]);
})
return results;
  }

  export const getInterviewersForDay = (state, day) => {
    const results = [];
    const dayObjInfo = state.days.filter(days => days.name === day)

    if (!dayObjInfo.length) {
        return results;
    }

    dayObjInfo[0].appointments.forEach(item => {
      results.push(state.interviewers[item]);
  })
  return results;
}

  export const getInterview = (state, interview) => {
    const interviewObj = {};
    if (interview === null) {
        return null;
    } else {
        interviewObj.student = interview.student;
        interviewObj.interviewer = state.interviewers[interview.interviewer];
    }
    return interviewObj;
  }