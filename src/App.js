import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Main from "./routes/Main";
import SignUp from "./routes/signUp";
import SignIn from "./routes/signIn";
import SignUp2 from "./routes/signUp2";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup2" element={<SignUp2 />} />
      </Routes>
    </Router>
  );
}

export default App;
