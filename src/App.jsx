import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import todoSlice from "./redux/slice/todo.slice";

const TodoItem = ({ title, completed, id }) => {
  const _clr = id % 2 === 0 ? "red" : "yellow";
  const dispatch = useDispatch();

  const handleCompleted = () => {
    const payload = { id };
    dispatch(todoSlice.actions.markAsCompleted(payload));
  };

  const handleRemove = () => {
    const payload = { id };
    dispatch(todoSlice.actions.removeTodo(payload));
  };

  return (
    <div className={`list-item ${_clr}`}>
      <div className="list-item-details">
        <div>
          <input
            checked={completed}
            onChange={handleCompleted}
            type="checkbox"
          />
        </div>
        <p className={`todo-text ${completed ? "completed" : ""}`}>{title}</p>
      </div>
      <div className="todo-item-action">
        <button onClick={handleRemove} className="remove">
          Remove
        </button>
      </div>
    </div>
  );
};

function App() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todo);

  const handleAdd = () => {
    if (inputRef.current.value.trim() === "") return;
    const payload = { title: inputRef.current.value };
    dispatch(todoSlice.actions.addTodo(payload));
  };

  return (
    <div className="todo-page-wrapper">
      <section className="todo-form">
        <h1 className="todo-page-title">Enter New Todo's</h1>
        <div className="todo-form-actions">
          <input ref={inputRef} type="text" placeholder="Enter your note" />
          <div className="hgap"></div>
          <button onClick={handleAdd}>Add</button>
        </div>
      </section>

      <section className="todo-lists">
        <h1 className="todo-page-title">Your Todo Lists</h1>

        {todo.todos.map((el) => (
          <TodoItem
            title={el?.title}
            key={el?.id}
            completed={el?.completed}
            id={el?.id}
          />
        ))}
      </section>
    </div>
  );
}

export default App;
