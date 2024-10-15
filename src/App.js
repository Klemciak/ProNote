import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Authorizations from "./pages/authorizations/Authorizations.jsx";
import GrainBackground from "./components/grainBackground/grainBackground.jsx";
import Title from "./components/Title/Title.jsx";
import Note from "./pages/note/Note.jsx";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

function App() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LfHvVsqAAAAAAG0MTDLpC96OQGCL3c7hfKgtuj9">
      <div className="app-container">
        <GrainBackground />
        <Title />
        <Routes>
          <Route path="/d" element={<Authorizations />} />
          <Route path="/" element={<Note />} />
        </Routes>
      </div>
    </GoogleReCaptchaProvider>
  );
}

export default App;
