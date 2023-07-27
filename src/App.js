import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./routes/landing";
import SignUp from "./routes/signUp";
import SignIn from "./routes/signIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
