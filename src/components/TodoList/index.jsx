import React, { useEffect, useState } from "react";
import css from "./style.module.css";
import { headers } from "../../../next.config";

const TodoList = () => {
  const [todo, setTodo] = useState("");
  const [task, setTask] = useState([]);

  useEffect(() => {
    const storedTodo = JSON.parse(localStorage.getItem("todoTasks")) || [];
    setTask(storedTodo);
  }, []);

  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(task));
  }, [task]);

  const inputChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAddedTask = () => {
    if (todo.trim() !== "") {
      setTask([...task, { text: todo, done: false }]);
      setTodo("");
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTask = task.filter((_, item) => item !== index);
    setTask(updatedTask);
  };
  const handleTogleChange = (index) => {
    const updatedTask = [...task];
    updatedTask[index].done = !updatedTask[index].done;
    setTask(updatedTask);
  };

  return (
    <div className={css.todo__container}>
      <h1 className={css.todo__title}>Todo</h1>
      <label>
        <input
          className={css.todo__input}
          onChange={inputChange}
          placeholder="todo"
          type="text"
          value={todo}
        />
        <button
          className={css.todo__button}
          onClick={handleAddedTask}
          type="button"
          disabled={!todo}
        >
          Submit
        </button>
      </label>
      <ul>
        {task.map((item, index) => (
          <li key={index} className={css.todo__li}>
            <input
              type="checkBox"
              checked={item.done}
              onChange={() => handleTogleChange(index)}
            />
            <span className={css.todo__text}>{item.text}</span>
            <button
              className={css.del__button}
              onClick={() => handleDeleteTask(index)}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
