function TaskList({ tasks, onDelete, onEdit, onToggleComplete }) {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`p-4 rounded-lg shadow-md border mb-3 ${
            task.completed ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
          }`}
        >

          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">
              {task.title}{" "}
              <span className="text-sm text-gray-500">
                ({task.priority})
              </span>
            </h3>
            <div className="space-x-2">
              <button
                onClick={() => onToggleComplete(task)}
                className={`px-3 py-1 rounded text-white transition-all duration-300 ${
                  task.completed
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-primary hover:bg-primary-dark"
                }`}
              >
                {task.completed ? "Undo" : "Done"}
              </button>

              <button
                onClick={() => onEdit(task)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
          <p className="text-gray-700">{task.description}</p>
          {task.due_date && (
            <p className="text-sm text-gray-500">
              Due: {new Date(task.due_date).toLocaleDateString()}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskList;
