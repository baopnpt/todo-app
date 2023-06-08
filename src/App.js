import "./App.scss";
import { useState, useEffect } from "react";
import { ToDoCard } from "./components/ToDoCard";
import { Button } from "./components/Button";
import { ToDoForm } from "./components/ToDoForm";

function App() {
  const [inputs, setInputs] = useState({});
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState();

  const onRemoveAll = () => {
    const newList = [];
    list.forEach((e, _) => {
      if (!selected.includes(e.id)) {
        newList.push(e);
      }
    });
    setSelected([]);
    setList(newList);
    localStorage.setItem("list", JSON.stringify(newList));
    alert("Remove task succeeded!");
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!inputs.title) {
      alert("Please input title");
      return;
    }
    const newList = [
      ...list,
      {
        ...inputs,
        id: new Date().getTime(),
        ...(!inputs.piority && { piority: "Normal" }),
        ...(!inputs.dueDate && {
          dueDate: new Date().toLocaleDateString("en-CA"),
        }),
      },
    ];
    localStorage.setItem("list", JSON.stringify(newList));
    setList(newList);
    setInputs({});
    alert("Add task succeeded");
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onSelected = (id) => {
    setSelected((prevSelected) => [...prevSelected, id]);
  };

  const onRemoveSelected = (id) => {
    setSelected((prevSelected) => prevSelected.filter((item) => item !== id));
  };

  const onRemove = (id) => {
    const newList = list.filter((item) => item.id !== id);
    localStorage.setItem("list", JSON.stringify(newList));
    setList(newList);
    alert("Remove task succeeded!");
  };

  const onUpdate = (index, newValues) => {
    const newList = [...list];
    newList[index] = newValues;
    localStorage.setItem("list", JSON.stringify(newList));
    setList(newList);
    alert("Update task succeeded!");
  };

  useEffect(() => {
    const storedList = localStorage.getItem("list");
    if (storedList) {
      setList(JSON.parse(storedList));
    }
  }, []);

  useEffect(() => {
    const storedList = localStorage.getItem("list");
    if (storedList) {
      const items = JSON.parse(storedList);
      if (search) {
        const itemFilters = items.filter((e) => e.title.indexOf(search) > -1);
        setList(itemFilters);
      } else {
        setList(items);
      }
    }
  }, [search]);

  return (
    <div className="App">
      <div className="left">
        <h1>New Task</h1>
        <div className="left-form">
          <ToDoForm
            handleChange={handleChange}
            onSubmit={onSubmit}
            inputs={inputs}
            type={"add"}
          />
        </div>
      </div>
      <div className="right">
        <h1>ToDo List</h1>
        <input
          className="search-input"
          type="text"
          placeholder="Search...."
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="list-todo">
          {list
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .map((e, index) => (
              <ToDoCard
                item={e}
                onRemove={onRemove}
                onUpdate={onUpdate}
                onSelected={onSelected}
                onRemoveSelected={onRemoveSelected}
                index={index}
                key={e.id}
              />
            ))}
        </div>
        {selected.length > 0 && (
          <div className="line-last">
            <div>
              <span>Bulk Action:</span>
            </div>
            <div>
              <Button style={{ backgroundColor: "#1C9AFA" }}>Done</Button>
              <Button
                onClick={onRemoveAll}
                style={{ backgroundColor: "#FF2626" }}
              >
                Remove
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
