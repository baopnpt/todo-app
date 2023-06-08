import { useState } from "react";
import { ToDoForm } from "./ToDoForm";
import { Button } from "./Button";

export const ToDoCard = (props) => {
  const [inputs, setInputs] = useState(props.item || {});
  const [isDetailOpen, setIsOpen] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    props.onUpdate(props.index, inputs);
  };

  const onSelect = (event) => {
    const value = event.target.checked;
    if (value) {
      props.onSelected(inputs.id);
    } else {
      props.onRemoveSelected(inputs.id);
    }
  };

  const onRemove = () => {
    props.onRemove(inputs.id);
  };

  return (
    <div className="card">
      <div className="card-title">
        <div className="card-title-left">
          <input type="checkbox" onChange={onSelect}></input>
          <span>{inputs.title}</span>
        </div>
        <div className="card-title-right">
          <Button
            onClick={() => setIsOpen(!isDetailOpen)}
            style={{ backgroundColor: "#1C9AFA" }}
          >
            Detail
          </Button>
          <Button onClick={onRemove} style={{ backgroundColor: "#FF2626" }}>
            Remove
          </Button>
        </div>
      </div>
      <div
        className={"card-details " + `${isDetailOpen ? "card-details-open" : "card-details-close"}`}
      >
        <ToDoForm
          handleChange={handleChange}
          onSubmit={onSubmit}
          inputs={inputs}
          type={"edit"}
        />
      </div>
    </div>
  );
};
