import { Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";
import Register from "./pages/auth/register";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
