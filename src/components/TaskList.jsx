import { useTheme } from "../context/ThemeContext";

function TaskList({
    tasks,
    onDelete,
    onEdit,
    onToggleComplete,
    expandedTaskId,
    toggleExpand,
}) {
    const { darkMode } = useTheme();

    return (
        <div className="space-y-3">
            {tasks.map((task) => (
                <div
                    key={task.id}
                    onClick={() => toggleExpand(task)}
                    className={`
                        relative
                        p-4 rounded-lg shadow-md border mb-3 transition-all duration-300 cursor-pointer
                        ${
                            task.completed
                                ? darkMode
                                    ? "bg-green-900 border-green-700"
                                    : "bg-green-50 border-green-200"
                                : darkMode
                                ? "bg-gray-800 border-gray-700"
                                : "bg-white border-gray-200"
                        }
                        ${
                            expandedTaskId === task.id
                                ? "max-h-[500px]"
                                : "max-h-28 overflow-hidden"
                        }
                    `}
                >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <h3
                            className={`font-bold text-lg break-words transition-colors duration-300 ${
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

                        <div className="flex flex-wrap gap-2 sm:space-x-2 mt-1">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleComplete(task);
                                }}
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

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(task);
                                }}
                                className={`px-3 py-1 rounded text-white transition-all duration-300 ${
                                    darkMode
                                        ? "bg-blue-500 hover:bg-blue-400"
                                        : "bg-blue-500 hover:bg-blue-600"
                                }`}
                            >
                                Edit
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(task.id);
                                }}
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

                    <p
                        className={`mt-1 break-words transition-colors duration-300 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                    >
                        {task.description}
                    </p>

                    {expandedTaskId !== task.id &&
                        task.description.length > 120 && (
                            <div
                                className={`
                                    absolute bottom-0 left-0 right-0 h-10 pointer-events-none
                                    ${
                                        darkMode
                                            ? "bg-gradient-to-t from-gray-900/40 to-transparent"
                                            : "bg-gradient-to-t from-white to-transparent"
                                    }
                                `}
                            ></div>
                        )}

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
