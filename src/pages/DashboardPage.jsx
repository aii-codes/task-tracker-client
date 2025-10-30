import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useTheme } from "../context/ThemeContext";
import { Plus, List, Calendar, Filter, ArrowUpAZ } from "lucide-react";
import TaskModal from "../components/TaskModal";
import TaskForm from "../components/TaskForm";
import EditTaskModal from "../components/EditTaskModal";

function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [sortConfig, setSortConfig] = useState({ type: "", direction: "" });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { darkMode } = useTheme();

  const filterRef = useRef(null);
  const menuRef = useRef(null);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await api.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  }, [token, navigate]); // ✅ Added navigate to dependencies

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    fetchTasks();
  }, [token, navigate, fetchTasks]); // Include all dependencies

  // 🔒 Click outside to close menus
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilterMenu(false);
      }

      // Check if click is on a menu button (3 dots)
      const clickedButton = e.target.closest('button');
      const isMenuButton = clickedButton && clickedButton.textContent.trim() === '⋯';

      if (menuRef.current && !menuRef.current.contains(e.target) && !isMenuButton) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddTask = () => {
    setSelectedTask(null);
    setShowAddModal(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((t) => t.id !== id));
      setActiveMenu(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleSort = (type) => {
    setSortConfig((prev) => {
      if (prev.type === type) {
        if (prev.direction === "") return { type, direction: "asc" };
        if (prev.direction === "asc") return { type, direction: "desc" };
        return { type: "", direction: "" };
      }
      return { type, direction: "asc" };
    });
  };

  // 🧮 Determine task status dynamically
  const getStatus = (task) => {
    const today = new Date();
    const due = new Date(task.due_date);
    if (task.status === "Finished") return "Finished";
    if (due < today) return "Missed";
    return "Active";
  };

  // 🔍 Filter & Search
  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const taskStatus = getStatus(t);
    const matchesFilter = filterStatus === "All" || taskStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // 🔃 Sorting
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const { type, direction } = sortConfig;
    if (!type || !direction) return 0;
    let result = 0;
    if (type === "alphabetical") result = a.title.localeCompare(b.title);
    else if (type === "priority") {
      const order = { High: 1, Normal: 2, Low: 3 };
      result = order[a.priority] - order[b.priority];
    } else if (type === "date") {
      result = new Date(a.due_date) - new Date(b.due_date);
    }
    return direction === "asc" ? result : -result;
  });

  return (
    <div
      className={`p-8 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-background-light text-gray-800"
      }`}
    >
      {/* 🔍 Search + Filter + Add + Sort */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-8">
        {/* Left Section */}
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div
            className={`flex items-center w-full rounded-lg px-3 py-2 border transition-colors duration-300 ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-gray-100"
                : "bg-white border-gray-300 text-gray-800"
            }`}
          >
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`flex-1 bg-transparent outline-none ${
                darkMode ? "placeholder-gray-400" : "placeholder-gray-500"
              }`}
            />
          </div>

          {/* 🔽 Filter */}
          <div ref={filterRef} className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className={`p-2 rounded-md ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-100 hover:bg-gray-200"
              } transition-colors`}
            >
              <Filter
                size={18}
                className={filterStatus !== "All" ? "text-blue-500" : ""}
              />
            </button>

            {showFilterMenu && (
              <div
                className={`absolute right-0 top-full mt-2 w-28 rounded-md shadow-lg z-20 ${
                  darkMode
                    ? "bg-gray-800 text-gray-100"
                    : "bg-white text-gray-800"
                }`}
              >
                {["All", "Active", "Finished", "Missed"].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setFilterStatus(status);
                      setShowFilterMenu(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      filterStatus === status
                        ? darkMode
                          ? "bg-gray-700 text-blue-400"
                          : "bg-gray-200 text-blue-600"
                        : darkMode
                        ? "hover:bg-gray-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddTask}
            className={`p-2 rounded-md ${
              darkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-100 hover:bg-gray-200"
            } transition-colors`}
          >
            <Plus size={20} />
          </button>

          {/* Sort buttons */}
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              darkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-100 hover:bg-gray-200"
            } transition-colors`}
          >
            <button
              onClick={() => handleSort("alphabetical")}
              className={sortConfig.type === "alphabetical" ? "text-blue-500" : ""}
            >
              <ArrowUpAZ size={18} />
            </button>
            <button
              onClick={() => handleSort("priority")}
              className={sortConfig.type === "priority" ? "text-blue-500" : ""}
            >
              <List size={18} />
            </button>
            <button
              onClick={() => handleSort("date")}
              className={sortConfig.type === "date" ? "text-blue-500" : ""}
            >
              <Calendar size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* 📋 Task Table */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr
            className={`text-sm font-semibold border-b ${
              darkMode
                ? "border-gray-700 text-gray-300"
                : "border-gray-300 text-gray-700"
            }`}
          >
            <th className="pb-3">Title</th>
            <th className="pb-3">Description</th>
            <th className="pb-3">Priority</th>
            <th className="pb-3">Date</th>
            <th className="pb-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.length > 0 ? (
            sortedTasks.map((task) => (
              <tr
                key={task.id}
                className={`border-b last:border-b-0 ${
                  darkMode
                    ? "border-gray-800 hover:bg-gray-800"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <td className="py-3">{task.title}</td>
                <td className="py-3">{task.description}</td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      task.priority === "High"
                        ? "bg-red-500 text-white"
                        : task.priority === "Normal"
                        ? "bg-green-500 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="py-3">
                  {task.due_date
                    ? (() => {
                        const [year, month, day] = task.due_date.split("-");
                        return `${month}/${day}/${year}`;
                      })()
                    : ""}
                </td>
                <td className="py-3">
                  <span
                    className={`font-medium ${
                      getStatus(task) === "Active"
                        ? "text-green-500"
                        : getStatus(task) === "Finished"
                        ? "text-blue-500"
                        : "text-red-500"
                    }`}
                  >
                    {getStatus(task)}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <div className="relative inline-block">
                    <button
                      onClick={() =>
                        setActiveMenu(activeMenu === task.id ? null : task.id)
                      }
                      className="px-2 py-1 hover:text-primary transition-colors"
                    >
                      ⋯
                    </button>

                    {activeMenu === task.id && (
                      <div
                        ref={menuRef}
                        className={`absolute right-0 bottom-full mb-1 w-24 rounded-md shadow-lg z-20 ${
                          darkMode
                            ? "bg-gray-800 text-gray-100"
                            : "bg-white text-gray-800"
                        }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => {
                            handleEditTask(task);
                            setActiveMenu(null);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            handleDeleteTask(task.id);
                            setActiveMenu(null);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-500">
                No tasks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ➕ Add Task Modal */}
      {showAddModal && (
        <TaskModal onClose={() => setShowAddModal(false)}>
          <TaskForm
            onSubmit={async (taskData) => {
              try {
                const res = await api.post("/tasks", taskData, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                setTasks([res.data, ...tasks]);
                setShowAddModal(false);
              } catch (err) {
                console.error(err);
              }
            }}
          />
        </TaskModal>
      )}

      {/* ✏️ Edit Task Modal */}
      {showEditModal && selectedTask && (
        <EditTaskModal
          task={selectedTask}
          onClose={() => {
            setSelectedTask(null);
            setShowEditModal(false);
          }}
          onSubmit={async (updatedData) => {
            try {
              const res = await api.put(`/tasks/${selectedTask.id}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` },
              });
              setTasks((prev) =>
                prev.map((t) => (t.id === selectedTask.id ? res.data : t))
              );
              setSelectedTask(null);
              setShowEditModal(false);
            } catch (err) {
              console.error("Update failed:", err);
            }
          }}
        />
      )}
    </div>
  );
}

export default DashboardPage;
