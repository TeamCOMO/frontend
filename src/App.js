import React from "react";
//import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./routes/Main";
import SignUp from "./routes/signUp";
import SignIn from "./routes/signIn";
import Mypage from "./routes/mypage";
import Post from "./routes/Post";
import Posting from "./routes/Posting";
import PostDetail from "./routes/PostDetail"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/post" element={<Post />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/posting" element={<Posting />} />
      </Routes>
    </Router>
  );
}

export default App;
