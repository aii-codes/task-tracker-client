import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

function TaskForm({ onSubmit }) {
  const { darkMode } = useTheme();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // ✅ FIX: Ensure date is sent in local timezone format
    // Convert the date string to YYYY-MM-DD format explicitly
    const normalizedDate = dueDate ? dueDate : null;
    
    onSubmit({ 
      title, 
      description, 
      priority, 
      due_date: normalizedDate 
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-4 rounded-lg shadow-md space-y-3 transition-colors duration-300 ${
        darkMode ? "bg-gray-800" : "bg-gray-50"
      }`}
    >
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={`w-full border p-2 rounded transition-colors duration-300 ${
          darkMode
            ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
            : "bg-white border-gray-300 text-gray-900"
        }`}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="8"
        className={`w-full border p-2 rounded transition-colors duration-300 resize-none ${
          darkMode
            ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
            : "bg-white border-gray-300 text-gray-900"
        }`}
      ></textarea>

      <div className="flex justify-between items-center gap-2">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className={`border p-2 rounded transition-colors duration-300 ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-gray-100"
              : "bg-white border-gray-300 text-gray-900"
          }`}
        >
          <option value="High">High</option>
          <option value="Normal">Normal</option>
          <option value="Low">Low</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={`border p-2 rounded transition-colors duration-300 ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-gray-100"
              : "bg-white border-gray-300 text-gray-900"
          }`}
        />

        <button
          type="submit"
          className={`px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 ${
            darkMode
              ? "bg-blue-600 hover:bg-blue-500"
              : "bg-primary hover:bg-primary-dark"
          }`}
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default TaskForm;