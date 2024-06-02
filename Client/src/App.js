// import "./App.css";
import "./index.css";
import Lander from "./pages/lander.js";
import Main from './pages/main.js';
import SpeechGpt from "./pages/speechGPT.js"
import TextGpt from "./pages/textGpt.js";
import Profile from "./pages/profile.js"
import Editprofile from "./pages/editprofile.js";
import Friendprofile from "./pages/friendprofile.js";
import ToDo from "./pages/todolist.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Lander />} />
          <Route path="/main" element={<Main />} />
          <Route path="/speechgpt" element={<SpeechGpt/>}/>
          <Route path="/textgpt" element={<TextGpt />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<Editprofile />} />
          <Route path="/friendprofile" element={<Friendprofile />} />
          <Route path="/todolist" element={<ToDo/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
