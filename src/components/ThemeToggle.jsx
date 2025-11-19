import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react"; // 🌓 beautiful open-source icons
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
        onClick={toggleTheme}
        className="relative w-10 h-10 flex items-center justify-center rounded-full
                    border border-gray-300 dark:border-gray-700
                    bg-white dark:bg-gray-800
                    text-gray-700 dark:text-gray-200
                    hover:scale-105 transition-all duration-300"
        aria-label="Toggle theme"
    >
        <AnimatePresence initial={false} mode="wait">
            {darkMode ? (
            <motion.div
                key="moon"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.3 }}
            >
                <Moon className="w-5 h-5" />
            </motion.div>
            ) : (
            <motion.div
                key="sun"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.3 }}
            >
                <Sun className="w-5 h-5" />
            </motion.div>
            )}
        </AnimatePresence>
    </button>
  );
}
