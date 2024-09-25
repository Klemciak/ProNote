import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Authorizations from "./pages/authorizations/Authorizations.jsx";
import GrainBackground from "./components/grainBackground/grainBackground.jsx";
function App() {
  return (
    <div className="app-container">
      <GrainBackground />
      <Routes>
        <Route path="/" element={<Authorizations />} />
      </Routes>
    </div>
  );
}

export default App;
