// import "./App.css";
import "./index.css";
import Lander from "./pages/lander.js";
import Editprofile from "./pages/editprofile.js";
import Profile from "./pages/profile.js"
import Friendprofile from "./pages/friendprofile.js";
import Main from './pages/main.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TextGpt from "./pages/textGpt.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Lander />} />
          <Route path="/editprofile" element={<Editprofile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/friendprofile" element={<Friendprofile />} />
          <Route path="/textgpt" element={<TextGpt />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
