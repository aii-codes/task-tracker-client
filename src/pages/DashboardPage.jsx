import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  const addTask = async (taskData) => {
    try {
      const res = await api.post("/tasks", taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks([res.data, ...tasks]);
      setSelectedTask(null);
    } catch (err) {
      console.error(err);
    }
  };

  const updateTask = async (taskData) => {
    try {
      const updated = await api.put(
        "/tasks",
        { ...selectedTask, ...taskData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map((t) => (t.id === updated.data.id ? updated.data : t)));
      setSelectedTask(null);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleComplete = async (task) => {
    try {
      const updated = await api.put(
        "/tasks",
        { ...task, completed: !task.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map((t) => (t.id === updated.data.id ? updated.data : t)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6">🗂️ My Tasks</h2>
      <TaskForm
        onSubmit={selectedTask ? updateTask : addTask}
        selectedTask={selectedTask}
      />
      <TaskList
        tasks={tasks}
        onDelete={deleteTask}
        onEdit={setSelectedTask}
        onToggleComplete={toggleComplete}
      />
    </div>
  );
}

export default DashboardPage;
