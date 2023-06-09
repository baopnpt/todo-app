import { Button } from "./Button";

export const ToDoForm = ({ inputs, handleChange, onSubmit, type }) => {
  const NOW_DAY = new Date().toLocaleDateString("en-CA");
  return (
    <form onSubmit={onSubmit}>
      <div className="form">
        <div>
          <input
            placeholder="Add new task...."
            onChange={handleChange}
            name="title"
            value={inputs.title || ""}
            className="form-title"
            type="text"
          />
        </div>

        <div className="form-description">
          <h5 className="form-description-title">Description</h5>
          <textarea
            onChange={handleChange}
            name="description"
            value={inputs.description || ""}
          />
        </div>

        <div className="form-footer">
          <div className="due-date">
            <h5>Due date</h5>
            <input
              type="date"
              name="dueDate"
              onChange={handleChange}
              value={inputs.dueDate || NOW_DAY}
              min={NOW_DAY}
            ></input>
          </div>
          <div className="piority">
            <h5>Piority</h5>
            <select
              onChange={handleChange}
              name="piority"
              value={inputs.piority || "Normal"}
            >
              <option value={"Low"}>Low</option>
              <option value={"Normal"}>Normal</option>
              <option value={"High"}>High</option>
            </select>
          </div>
        </div>
        <Button type="submit">{type === "edit" ? "Update" : "Add"}</Button>
      </div>
    </form>
  );
};
