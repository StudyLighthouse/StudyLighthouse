import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Lander from './pages/lander';
import Main from './pages/main';
import SpeechGpt from './pages/speechGPT';
import TextGpt from './pages/textGpt';
import Profile from './pages/profile';
import Editprofile from './pages/editprofile';
import Friendprofile from './pages/friendprofile';
import ToDo from './pages/todolist';
import SolveProblem from './pages/solveproblem';
import Show from './pages/showsolutions';
import Feed from './pages/feed';
import StudyMaterials from './pages/studymaterials';
import GoogleRedirectHandler from './components/googleredirecthandler'; // Import the GoogleRedirectHandler component
import ProtectedRoute from './components/protectedRoute';
import { SessionProvider } from './contexts/SessionContext';
import ForgotPassword from './pages/forgetPassword';


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
            <Route path="/friendprofile/:id" element={<ProtectedRoute><Friendprofile /></ProtectedRoute>} />
            <Route path="/todolist" element={<ProtectedRoute><ToDo /></ProtectedRoute>} />
            <Route path="/studymaterials" element={<ProtectedRoute><StudyMaterials /></ProtectedRoute>} />
            <Route path="/solveproblem/:id" element={<ProtectedRoute><SolveProblem /></ProtectedRoute>} />
            <Route path="/solutions/:id" element={<ProtectedRoute><Show /></ProtectedRoute>} />
            <Route path="/questionsfeed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
            <Route path="/google-redirect" element={<GoogleRedirectHandler />} /> {/* Add the GoogleRedirectHandler route */}
            <Route path="/forgetpassword" element={<ForgotPassword />} />
            
          </Routes>
        </div>
      </Router>
    </SessionProvider>
  );
}

export default App;
