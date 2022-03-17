import Form from "./Form";
import { useState } from "react";
import Note from "./Note";
function ListNote() {
  const [items, setItems] = useState([]);

  function addItem(newnote) {
    console.log(newnote);
    setItems((prevalue) => {
      return [...prevalue, newnote];
    });
  }

  function deleteItem(id) {
    console.log(id);
    const del = items.filter((item, index) => {
      return id !== index;
    });
    setItems(del);
  }
  return (
    <div>
      <Form onAdd={addItem} />
      {items.map((eachitem, index) => {
        return (
          <Note
            onDel={deleteItem}
            id={index}
            key={index}
            title={eachitem.title}
            content={eachitem.content}
          />
        );
      })}
    </div>
  );
}

export default ListNote;
