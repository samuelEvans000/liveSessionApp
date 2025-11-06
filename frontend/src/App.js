import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import StudentPage from "./pages/StudentPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminPage />} />
        <Route path="/session/:id" element={<StudentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
