import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { useAppSelector } from "./redux/store/hook";

function App() {
  const darkMode = useAppSelector((state) => state.preferences.theme) === "dark";

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-black" : "bg-white text-white"}`}>
        <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App
