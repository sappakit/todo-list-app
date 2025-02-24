import { useEffect, useRef, useState } from "react";
import { FaPencilAlt, FaPlus } from "react-icons/fa";
import { IoCheckmarkSharp, IoTrashBinSharp } from "react-icons/io5";
import { MdEditDocument } from "react-icons/md";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const editInputRef = useRef(null);

  // Add task
  const addTask = () => {
    if (taskInput.trim() === "") return;
    const newTasks = [...tasks, { text: taskInput.trim(), completed: false }];
    setTasks(newTasks);
    setTaskInput("");
  };

  // Remove task
  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Start editing task
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedTask(tasks[index].text);

    setTimeout(() => {
      if (editInputRef.current) {
        editInputRef.current.focus();
      }
    }, 0);
  };

  // Save edited task
  const saveTask = () => {
    setTasks(
      tasks.map((task, index) =>
        index === editingIndex
          ? { ...task, text: editedTask.trim() === "" ? task.text : editedTask }
          : task,
      ),
    );
    setEditingIndex(null);
    setEditedTask("");
  };

  // Task completion check
  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task,
    );
    setTasks(updatedTasks);
  };

  // Handle Enter key for adding and editing
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (editingIndex !== null) {
        saveTask();
      } else {
        addTask();
      }
    }
  };

  // Load tasks
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      localStorage.removeItem("tasks");
    }
  }, [tasks]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#213555]">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold text-white">TO DO LIST</h1>

        {/* Input section */}
        <div className="flex gap-5">
          <div className="flex w-full items-center gap-3 rounded-md bg-white px-3">
            <FaPencilAlt className="h-3 w-3 text-gray-400" />

            <input
              type="text"
              className="w-full bg-transparent py-3 text-sm placeholder:text-gray-400 focus:outline-none"
              placeholder="Add a new task..."
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>

          <button
            className="flex items-center justify-center gap-1 rounded-md bg-[#D8C4B6] px-4 py-2 text-sm font-medium text-black transition-colors duration-300 hover:bg-[#d4b7a2]"
            onClick={addTask}
          >
            <FaPlus className="h-3 w-3" />
            <span>Add</span>
          </button>
        </div>

        {/* Task section */}
        <div className="flex h-[25rem] w-[40rem] flex-col gap-2 overflow-y-auto rounded-xl bg-[#3E5879] p-5 text-white">
          {tasks.length > 0 ? (
            <>
              {tasks.map((task, index) => (
                <div key={index} className="flex w-full items-center gap-4">
                  {/* Task checkbox */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(index)}
                      className="relative h-6 w-6 cursor-pointer appearance-none rounded-full border border-white transition-all duration-200 before:absolute before:inset-0 before:flex before:items-center before:justify-center before:text-xs before:font-bold before:text-[#213555] before:opacity-0 before:content-['✔'] checked:border-transparent checked:bg-[#D8C4B6] checked:ring-2 checked:ring-[#d4b7a2] checked:before:opacity-100"
                    />
                  </div>

                  <div className="flex w-full justify-between rounded-lg bg-slate-400 p-3 text-black shadow-md">
                    {editingIndex === index ? (
                      <input
                        type="text"
                        ref={editInputRef}
                        className="w-full bg-transparent text-black focus:outline-none"
                        value={editedTask}
                        onChange={(e) => setEditedTask(e.target.value)}
                        onKeyDown={handleKeyPress}
                      />
                    ) : (
                      <p>{task.text}</p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {editingIndex === index ? (
                      // Save button
                      <button
                        className="transition-colors duration-300 hover:text-neutral-800"
                        onClick={saveTask}
                      >
                        <IoCheckmarkSharp className="h-5 w-5 text-white transition-colors duration-300 hover:text-gray-300" />
                      </button>
                    ) : (
                      // Edit button
                      <button
                        className="transition-colors duration-300 hover:text-neutral-800"
                        onClick={() => startEditing(index)}
                      >
                        <MdEditDocument className="h-5 w-5 text-white transition-colors duration-300 hover:text-gray-300" />
                      </button>
                    )}

                    {/* Delete button */}
                    <button
                      className="transition-colors duration-300 hover:text-neutral-800"
                      onClick={() => removeTask(index)}
                    >
                      <IoTrashBinSharp className="h-5 w-5 text-white transition-colors duration-300 hover:text-gray-300" />
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p>No tasks added yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
