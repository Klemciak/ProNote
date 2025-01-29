import { Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import Authorizations from "./pages/authorizations/Authorizations.jsx";
import GrainBackground from "./components/grainBackground/grainBackground.jsx";
import Title from "./components/Title/Title.jsx";
import Note from "./pages/note/Note.jsx";
import ActivateAccount from "./pages/activateAcc/Activate.jsx";
import ResetPassword from "./pages/resetPass/resetPassword.jsx";
import { AuthProvider } from "./components/AuthContext.jsx";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import PrivateRoute from "./components/PrivateRoute.jsx";

function App() {
  return (
    <AuthProvider>
      <GoogleReCaptchaProvider reCaptchaKey="6LfHvVsqAAAAAAG0MTDLpC96OQGCL3c7hfKgtuj9">
        <div className="app-container">
          <GrainBackground />
          <Title />
          <Routes>
            <Route path="/" element={<Authorizations />} />
            <Route
              path="/note"
              element={
                <PrivateRoute>
                  <Note />
                </PrivateRoute>
              }
            />
            <Route path="/activateAcc/:token" element={<ActivateAccount />} />
            <Route path="/resetPassword/:token" element={<ResetPassword />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </GoogleReCaptchaProvider>
    </AuthProvider>
  );
}

export default App;
