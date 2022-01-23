export const getAppointmentsForDay = (state, day) => {
    const results = [];
    const dayObjInfo = state.days.filter(days => days.name === day)

    if (!dayObjInfo.length) {
        return results;
    }
    
    for (const id of dayObjInfo[0].appointments) {
      results.push(state.appointments[id]);
    }
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

  export const getInterviewersForDay = (state, day) => {
    const results = [];
    const dayObjInfo = state.days.filter(days => days.name === day)

    if (!dayObjInfo.length) {
        return results;
    }

    for (const id of dayObjInfo[0].interviewers) {
      results.push(state.interviewers[id]);
    }
    return results;
  }