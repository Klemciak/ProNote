import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Authorizations from "./pages/authorizations/Authorizations.jsx";
import GrainBackground from "./components/grainBackground/grainBackground.jsx";
import Title from "./components/Title/Title.jsx";
import Note from "./pages/note/Note.jsx";
import ActivateAccount from "./pages/activateAcc/Activate.jsx";
import ResetPassword from "./pages/resetPass/resetPassword.jsx";
import { AuthProvider } from "./components/AuthContext.jsx";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

function App() {
  return (
    <AuthProvider>
      <GoogleReCaptchaProvider reCaptchaKey="6LfHvVsqAAAAAAG0MTDLpC96OQGCL3c7hfKgtuj9">
        <div className="app-container">
          <GrainBackground />
          <Title />
          <Routes>
            <Route path="/" element={<Authorizations />} />
            <Route path="/note" element={<Note />} />
            <Route path="/activateAcc" element={<ActivateAccount />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
          </Routes>
        </div>
      </GoogleReCaptchaProvider>
    </AuthProvider>
  );
}

export default App;
