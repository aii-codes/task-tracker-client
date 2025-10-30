import { useTheme } from "../context/ThemeContext";

function TaskList({ tasks, onDelete, onEdit, onToggleComplete }) {
  const { darkMode } = useTheme(); // ✅ correct key

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`p-4 rounded-lg shadow-md border mb-3 transition-colors duration-300 ${
            task.completed
              ? darkMode
                ? "bg-green-900 border-green-700"
                : "bg-green-50 border-green-200"
              : darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="flex justify-between items-center">
            <h3
              className={`font-bold text-lg transition-colors duration-300 ${
                darkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              {task.title}{" "}
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                ({task.priority})
              </span>
            </h3>

            <div className="space-x-2">
              {/* ✅ Done / Undo button */}
              <button
                onClick={() => onToggleComplete(task)}
                className={`px-3 py-1 rounded text-white transition-all duration-300 ${
                  task.completed
                    ? darkMode
                      ? "bg-yellow-600 hover:bg-yellow-500"
                      : "bg-yellow-500 hover:bg-yellow-600"
                    : darkMode
                    ? "bg-blue-600 hover:bg-blue-500"
                    : "bg-primary hover:bg-primary-dark"
                }`}
              >
                {task.completed ? "Undo" : "Done"}
              </button>

              {/* ✅ Edit button */}
              <button
                onClick={() => onEdit(task)}
                className={`px-3 py-1 rounded text-white transition-all duration-300 ${
                  darkMode
                    ? "bg-blue-500 hover:bg-blue-400"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                Edit
              </button>

              {/* ✅ Delete button */}
              <button
                onClick={() => onDelete(task.id)}
                className={`px-3 py-1 rounded text-white transition-all duration-300 ${
                  darkMode
                    ? "bg-red-600 hover:bg-red-500"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                Delete
              </button>
            </div>
          </div>

          {/* ✅ Description */}
          <p
            className={`mt-1 transition-colors duration-300 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {task.description}
          </p>

          {/* ✅ Due date */}
          {task.due_date && (
            <p
              className={`text-sm transition-colors duration-300 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Due: {new Date(task.due_date).toLocaleDateString()}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskList;
