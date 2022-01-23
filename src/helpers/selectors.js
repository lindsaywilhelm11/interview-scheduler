export function getAppointmentsForDay(state, day) {
    const result = [];
    const dayObjInfo = state.days.filter(days => days.name === day)
    if (!dayObjInfo.length) {
        return result;
    }
    for (const id of dayObjInfo[0].appointments) {
      result.push(state.appointments[id]);
    }
    return result;
  }

  export function getInterview(state, interview) {
    const interviewObj = {};
    if (interview === null) {
        return null;
    } else {
        interviewObj.student = interview.student;
        interviewObj.interviewer = state.interviewers[interview.interviewer];
    }
    return interviewObj;
  }