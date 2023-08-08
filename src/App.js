import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
//import { RecoilRoot } from "recoil";

import SignUp from "./routes/SignUp";
import SignIn from "./routes/SignIn";
import Landing from "./routes/Landing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Signin" element={<SignIn />} />
        <Route path="/Signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
