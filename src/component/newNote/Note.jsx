import React from "react";
import classes from './note.module.css'

function Note(props) {
  return (
    <div className={classes.note}>
      <h1>{props.title} </h1>
      <p>{props.content} </p>
      <button
        onClick={() => {
          return props.onDel(props.id);
        }}
      >
        DELETE
      </button>
    </div>
  );
}

export default Note;
