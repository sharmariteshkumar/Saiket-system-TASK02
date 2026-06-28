import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") {
      alert("Please enter a task");
      return;
    }

    const newTask = {
      text: task,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const deleteTask = (indexToDelete) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(updatedTasks);
  };

  const completeTask = (indexToComplete) => {
    const updatedTasks = tasks.map((item, index) =>
      index === indexToComplete
        ? { ...item, completed: !item.completed }
        : item
    );

    setTasks(updatedTasks);
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].text);
  };

  const saveEdit = (index) => {
    if (editText.trim() === "") {
      alert("Task cannot be empty");
      return;
    }

    const updatedTasks = tasks.map((item, i) =>
      i === index ? { ...item, text: editText } : item
    );

    setTasks(updatedTasks);
    setEditIndex(null);
    setEditText("");
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((item) => item.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="app-wrapper">
      <div className="app">
        <h1>React To-Do App</h1>
        <p className="subtitle">Manage your daily tasks smartly</p>

        <div className="todo-input">
          <input
            type="text"
            placeholder="Enter a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />

          <button onClick={addTask}>Add Task</button>
        </div>

        <div className="stats">
          <span>Total: {totalTasks}</span>
          <span>Completed: {completedTasks}</span>
          <span>Pending: {pendingTasks}</span>
        </div>

        <ul className="todo-list">
          {tasks.length === 0 ? (
            <p className="empty-text">No tasks added yet.</p>
          ) : (
            tasks.map((item, index) => (
              <li key={index} className={item.completed ? "completed" : ""}>
                {editIndex === index ? (
                  <input
                    className="edit-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                ) : (
                  <span onClick={() => completeTask(index)}>{item.text}</span>
                )}

                <div className="actions">
                  {editIndex === index ? (
                    <button className="save-btn" onClick={() => saveEdit(index)}>
                      Save
                    </button>
                  ) : (
                    <button className="edit-btn" onClick={() => startEdit(index)}>
                      Edit
                    </button>
                  )}

                  <button className="delete-btn" onClick={() => deleteTask(index)}>
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;