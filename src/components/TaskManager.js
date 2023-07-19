import { useEffect, useState } from "react";
import "../style_sheets/TaskManager.css";
import { TaskCard } from "./TaskCard";

export const TaskManager = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [tasks, setTasks] = useState([]);
  const [currentNav, setCurrentNav] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("tasks")) {
      setTasks(JSON.parse(localStorage.getItem("tasks")));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && body) {
      const newTask = {
        title,
        body,
        done: false,
        priority: false,
        color: 0,
      };

      if (localStorage.getItem("tasks")) {
        let newTasks = JSON.parse(localStorage.getItem("tasks"));
        newTasks.push(newTask);
        setTasks(newTasks);
        localStorage.setItem("tasks", JSON.stringify(newTasks));
      } else {
        setTasks([newTask]);
        localStorage.setItem("tasks", JSON.stringify([newTask]));
      }

      setTitle("");
      setBody("");
    }
  };

  useEffect(() => {
    if (currentNav === 1) {
      const result = JSON.parse(localStorage.getItem("tasks")).filter(
        (current) => {
          return current.done === false;
        }
      );
      setTasks(result);
    } else if (currentNav === 2) {
      const result = JSON.parse(localStorage.getItem("tasks")).filter(
        (current) => {
          return current.done === true;
        }
      );
      setTasks(result);
    } else if(currentNav === 3) {
      const result = JSON.parse(localStorage.getItem("tasks")).filter(
        (current) => {
          return current.priority === true;
        }
      );
      setTasks(result);
    } else {
      setTasks(JSON.parse(localStorage.getItem("tasks")));
    }
  }, [currentNav]);

  const handleDelete = (taskTitle, taskPriority) => {
    if (!taskPriority) {
      let tasks = JSON.parse(localStorage.getItem("tasks"));

      const newTasks = tasks.filter((current) => current.title !== taskTitle);

      setTasks(newTasks);
      localStorage.setItem("tasks", JSON.stringify(newTasks));
    }
  };

  const handlePriority = (taskTitle) => {
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    const newTasks = tasks.map((current) => {
      if (current.title === taskTitle && current.priority) {
        current.priority = false;
        return current;
      } else if (current.title === taskTitle && !current.priority) {
        current.priority = true;
        return current;
      } else {
        return current;
      }
    });

    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  return (
    <div className="Task-manager">
      <h1>note keeper</h1>
      <form onSubmit={handleSubmit}>
        <h4>New task</h4>
        <input
          placeholder="Do laundry..."
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          placeholder="Wash the work clothes for tomorrow..."
          onChange={(e) => setBody(e.target.value)}
          value={body}
          maxLength={487}
        />
        <button>submit</button>
      </form>
      <div className="Tasks-main-container">
        <div className="Tasks-container-nav">
          <a
            className={
              currentNav === 0 ? "Tasks-container-nav-current" : ""
            }
            onClick={() => setCurrentNav(0)}
          >
            all
          </a>
          <a
            className={
              currentNav === 1 ? "Tasks-container-nav-current" : ""
            }
            onClick={() => setCurrentNav(1)}
          >
            in progress
          </a>
          <a
            className={
              currentNav === 2 ? "Tasks-container-nav-current" : ""
            }
            onClick={() => setCurrentNav(2)}
          >
            done
          </a>
          <a
            className={
              currentNav === 3 ? "Tasks-container-nav-current" : ""
            }
            onClick={() => setCurrentNav(3)}
          >
            important
          </a>
        </div>
        <div className="Tasks-container">
          {tasks
            ? tasks.map((c) => (
                <TaskCard
                  title={c.title}
                  body={c.body}
                  state={c.done}
                  priority={c.priority}
                  changePriority={() => handlePriority(c.title)}
                  color={c.color}
                  saved={()=> setTasks(JSON.parse(localStorage.getItem('tasks')))}
                  deleted={() => handleDelete(c.title, c.priority)}
                  key={c.title}
                />
              ))
            : undefined}
        </div>
      </div>
      <div className="fade-out" />
    </div>
  );
};
