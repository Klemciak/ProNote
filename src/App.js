import { Routes, Route } from "react-router-dom";
import "./App.css";
import Authorizations from "./pages/authorizations/Authorizations.jsx";
function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Authorizations />} />
      </Routes>
    </div>
  );
}

export default App;
