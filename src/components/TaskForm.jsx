import { useState, useEffect } from "react";

function TaskForm({ onSubmit, selectedTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("normal");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setPriority(selectedTask.priority);
      setDueDate(selectedTask.due_date ? selectedTask.due_date.slice(0, 10) : "");
    } else {
      setTitle("");
      setDescription("");
      setPriority("normal");
      setDueDate("");
    }
  }, [selectedTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, priority, due_date: dueDate });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 p-4 rounded-lg shadow-md mb-6 space-y-3"
    >
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
      ></textarea>
      <div className="flex justify-between items-center">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="urgent">Urgent</option>
          <option value="normal">Normal</option>
          <option value="low">Low</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-all duration-300"
        >
          {selectedTask ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
