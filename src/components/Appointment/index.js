import React from 'react'
import "components/Appointment/styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";
    const SAVING = "SAVING";
    const DELETING = "DELETING"
    const CONFIRM = "CONFIRM";
    const EDIT = "EDIT";
    const ERROR_SAVE = "ERROR_SAVE";
    const ERROR_DELETE = "ERROR_DELETE";

    const save = (name, interviewer) => {
        const interview = {
          student: name,
          interviewer
        };

        transition(SAVING);

        props
        .bookInterview(props.id, interview)
        .then(() => 
            transition(SHOW))
        .catch(err => {
            transition(ERROR_SAVE, true)
            console.log(err)
        })
      }

    const deleteInterview = (e) => {
        transition(DELETING, true);
        props
         .cancelInterview(props.id)
         .then(() => transition(EMPTY))
         .catch(error => transition(ERROR_DELETE, true));
       }

    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
      );

    return (
        <article className="appointment">
            <Header time={props.time}/>
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === CREATE && <Form onSave={save} interviewers={props.interviewers} onCancel={() => back(SHOW)}/>}
            {mode === SAVING && <Status message="Saving..." /> }
            {mode === DELETING && <Status message="Deleting..."/>}
            {mode === CONFIRM && <Confirm message="Are you sure you want to delete this appointment?" onConfirm={deleteInterview} onCancel={() => back(SHOW)}/>}
            {mode === EDIT && <Form onSave={save} onCancel={() => back(SHOW)} name={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} />}
            {mode === SHOW && (
                <Show
                    id={props.id}
                    student={props.interview.student}
                    interviewer={props.interview.interviewer}
                    onSave={save}
                    onDelete={() => transition(CONFIRM)}
                    onEdit={() => transition(EDIT)}
                />
                )}
        </article>
    )
}
