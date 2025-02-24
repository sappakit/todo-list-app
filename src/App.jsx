import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { IoTrashBinSharp } from "react-icons/io5";
import { MdEditDocument } from "react-icons/md";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  // Add task
  const addTask = () => {
    if (taskInput.trim() === "") return;
    setTasks([...tasks, taskInput]);
    setTaskInput("");
  };

  // Remove task
  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#213555]">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold text-white">TO DO LIST</h1>

        {/* Input section */}
        <div className="flex gap-5">
          <div className="flex w-full items-center gap-3 rounded-md bg-white px-3 py-1">
            <FaPencilAlt className="h-3 w-3 text-gray-400" />

            <input
              type="text"
              className="w-full bg-transparent text-sm focus:outline-none"
              placeholder="Add a new task..."
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>

          <button
            className="flex items-center justify-center rounded-md bg-[#D8C4B6] px-4 py-2 text-sm font-semibold text-neutral-800 transition-colors duration-300 hover:bg-[#d4b7a2]"
            onClick={addTask}
          >
            +Add
          </button>
        </div>

        {/* Task section */}
        <div className="flex h-[25rem] w-[40rem] flex-col gap-2 overflow-y-auto rounded-xl bg-[#3E5879] p-4 text-white">
          {tasks.map((task, index) => (
            <div key={index} className="flex w-full items-center gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="relative h-6 w-6 cursor-pointer appearance-none rounded-full border border-white transition-all duration-200 before:absolute before:inset-0 before:flex before:items-center before:justify-center before:text-xs before:font-bold before:text-[#213555] before:opacity-0 before:content-['✔'] checked:border-transparent checked:bg-[#D8C4B6] checked:ring-2 checked:ring-[#d4b7a2] checked:before:opacity-100"
                />
              </div>

              <div className="flex w-full justify-between rounded-lg bg-slate-400 p-3 text-black shadow-md">
                <p>{task}</p>
              </div>

              <div className="flex gap-2">
                <button
                  className="transition-colors duration-300 hover:text-neutral-800"
                  onClick={() => removeTask(index)}
                >
                  <MdEditDocument className="h-5 w-5 text-white transition-colors duration-300 hover:text-gray-300" />
                </button>

                <button
                  className="transition-colors duration-300 hover:text-neutral-800"
                  onClick={() => removeTask(index)}
                >
                  <IoTrashBinSharp className="h-5 w-5 text-white transition-colors duration-300 hover:text-gray-300" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
