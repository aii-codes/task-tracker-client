import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import TaskModal from "./TaskModal";

function EditTaskModal({ task, onSubmit, onClose }) {
    const { darkMode } = useTheme();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Normal");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("Active");

    useEffect(() => {
        if (task) {
        setTitle(task.title || "");
        setDescription(task.description || "");
        setPriority(task.priority || "Normal");

        // ✅ FIX: Extract date properly, handling both ISO and simple date formats
        if (task.due_date) {
            // Split at 'T' to get only the date part (YYYY-MM-DD)
            const dateOnly = task.due_date.split("T")[0];
            setDueDate(dateOnly);
        } else {
            setDueDate("");
        }

        setStatus(task.status || "Active");
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // ✅ FIX: Send date in simple YYYY-MM-DD format
        onSubmit({ 
        title, 
        description, 
        priority, 
        due_date: dueDate || null, 
        status 
        });
    };

    return (
        <TaskModal onClose={onClose}>
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
                    rows="4"
                    className={`w-full border p-2 rounded transition-colors duration-300 resize-none sm:rows-8 ${
                        darkMode
                            ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                            : "bg-white border-gray-300 text-gray-900"
                    }`}
                ></textarea>

                <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between items-stretch sm:items-center gap-3">
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className={`w-full sm:w-auto border p-2 rounded transition-colors duration-300 ${
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
                            className={`w-full sm:w-auto border p-2 rounded transition-colors duration-300 ${
                                darkMode
                                    ? "bg-gray-700 border-gray-600 text-gray-100"
                                    : "bg-white border-gray-300 text-gray-900"
                            }`}
                        />

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className={`w-full sm:w-auto border p-2 rounded transition-colors duration-300 ${
                                darkMode
                                    ? "bg-gray-700 border-gray-600 text-gray-100"
                                    : "bg-white border-gray-300 text-gray-900"
                            }`}
                        >
                            <option value="Active">Active</option>
                            <option value="Finished">Finished</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className={`w-full px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 ${
                            darkMode
                                ? "bg-blue-600 hover:bg-blue-500"
                                : "bg-primary hover:bg-primary-dark"
                        }`}
                    >
                        Update
                    </button>
                </div>
            </form>
        </TaskModal>
    );
}

export default EditTaskModal;