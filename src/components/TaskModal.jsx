import { useTheme } from "../context/ThemeContext";

function TaskModal({ onClose, children }) {
  const { darkMode } = useTheme();

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-md p-6 rounded-xl shadow-lg transition-colors duration-300 ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default TaskModal;
