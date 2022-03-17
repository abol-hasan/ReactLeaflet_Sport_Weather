import React, { useState } from "react";
import classes from "./form.module.css";

function Form(props) {
  const [input, setInput] = useState({
    title: "",
    content: "",
  });

  function handelChange(event) {
    const { name, value } = event.target;
    setInput((preValue) => {
      return { ...preValue, [name]: value };
    });
  }

  return (
    <div>
      <form className={classes.form}>
        <input
          onChange={handelChange}
          type="text"
          name="title"
          placeholder="Title"
          value={input.title}
          autoFocus
        />
        <textarea
          onChange={handelChange}
          name="content"
          rows="3"
          placeholder="It is the Content"
          value={input.content}
        />
        <button
          type="button"
          onClick={() => {
            
            setInput({
              title: "",
              content: "",
            });
            return props.onAdd(input);
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default Form;
