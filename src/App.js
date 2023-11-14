import React from "react";
//import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./routes/Main";
import SignUp from "./routes/signUp";
import SignIn from "./routes/signIn";
import Mypage from "./routes/mypage";
import Post from "./routes/Post";
import Posting from "./routes/Posting";
import Heart_p from "./routes/heart_p";
import PostDetail from "./routes/PostDetail";
import EditPost from "./routes/EditPost";
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
        <Route path="/heart_p" element={<Heart_p />} />

        <Route path="/editpost/:postId" element={<EditPost />} />
      </Routes>
    </Router>
  );
}

export default App;
