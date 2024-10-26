import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="w-screen h-screen bg-slate-200 flex justify-center">
      <Outlet />
    </div>
  );
}

export default App;
