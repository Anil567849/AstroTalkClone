
import Header from './components/Header.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import AstroLogin from './pages/astrologer/Login';
import AstroOtp from './pages/astrologer/Otp';
import Astro from './pages/astrologer/Astro';
import ChatLogs from './pages/astrologer/ChatLogs';
import CallLogs from './pages/astrologer/CallLogs';
import AstroChat from './pages/astrologer/AstroChat';
import Otp from './pages/Otp';
import Chat from './pages/Chat';
import ChatWithAstrologer from './pages/ChatWithAstrologer.jsx'
import TalkToAstrologer from './pages/TalkToAstrologer.jsx'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Redirect 
} from "react-router-dom";




function App() {
  return (
    <div>
      <Header/>
       <Routes>
          <Route exact index path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/otp" element={<Otp/>}/>
          <Route exact path="/chat-with-astrologer" element={<ChatWithAstrologer/>}/>
          <Route exact path="/talk-to-astrologer" element={<TalkToAstrologer/>}/>
          <Route exact path="/chat/:receiverId" element={<Chat/>}/>


          <Route exact path="/astrologer/login" element={<AstroLogin/>}/>
          <Route exact path="/astrologer/otp" element={<AstroOtp/>}/>
          <Route exact path="/astrologer/home" element={<Astro/>}/>
          <Route exact path="/astrologer/chat-logs" element={<ChatLogs/>}/>
          <Route exact path="/astrologer/call-logs" element={<CallLogs/>}/>
          <Route exact path="/astrologer/chat-logs/:receiverId" element={<AstroChat/>}/>

          {/* <Redirect to="/404" /> Redirect to a custom 404 page if no other routes match */}

      </Routes>
    </div>
  );
}

export default App;
