/* eslint-disable react-hooks/exhaustive-deps */
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import { isAuthenticated } from "./services/auth.service";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                page={Dashboard}
              />
            }
          />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
