import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import MainContent from "./Components/Blog";
import Home from "./Components/Home";
import Auth from "./Components/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

    return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {isSidebarVisible ? (
          <Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
        ) : (
          <button
            onClick={toggleSidebar}
            className="bg-[#6947BF] text-white p-4 size-10 text-2xl flex items-center justify-center rounded-full absolute bottom-4 left-4 z-10"
          >
            <FontAwesomeIcon icon={faCaretRight} />
          </button>
        )}
        <div className="flex-1 overflow-hidden">
          <div
            className={`h-full overflow-y-auto transition-all duration-300 bg-[#E5ECF3] ${
              isSidebarVisible ? "rounded-tl-2xl" : ""
            }`}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/signup" element={<Auth isSignup={true} />} />
              <Route path="/posts/:slug" element={<MainContent />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={true}
        closeOnClick
        pauseOnFocusLoss
      />
    </div>
    );
}

export default App;
