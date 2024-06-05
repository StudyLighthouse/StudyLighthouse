import "./index.css";
import Lander from "./pages/lander.js";
import Main from './pages/main.js';
import SpeechGpt from "./pages/speechGPT.js";
import TextGpt from "./pages/textGpt.js";
import Profile from "./pages/profile.js";
import Editprofile from "./pages/editprofile.js";
import Friendprofile from "./pages/friendprofile.js";
import ToDo from "./pages/todolist.js";
import SolveProblem from "./pages/solveproblem.js";
import Show from "./pages/showsolutions.js";
import Feed from "./pages/feed.js";
import StudyMaterials from "./pages/studymaterials.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from './components/protectedRoute';
import { SessionProvider } from './contexts/SessionContext';

function App() {
  return (
    <SessionProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route index element={<Lander />} />
            <Route path="/main" element={<ProtectedRoute><Main /></ProtectedRoute>} />
            <Route path="/speechgpt" element={<ProtectedRoute><SpeechGpt /></ProtectedRoute>} />
            <Route path="/textgpt" element={<ProtectedRoute><TextGpt /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/editprofile" element={<ProtectedRoute><Editprofile /></ProtectedRoute>} />
            <Route path="/friendprofile" element={<ProtectedRoute><Friendprofile /></ProtectedRoute>} />
            <Route path="/todolist" element={<ProtectedRoute><ToDo /></ProtectedRoute>} />
            <Route path="/studymaterials" element={<ProtectedRoute><StudyMaterials /></ProtectedRoute>} />
            <Route path="/solveproblem" element={<ProtectedRoute><SolveProblem /></ProtectedRoute>} />
            <Route path="/solutions" element={<ProtectedRoute><Show /></ProtectedRoute>} />
            <Route path="/questionsfeed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
    </SessionProvider>
  );
}

export default App;
