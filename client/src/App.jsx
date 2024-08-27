import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import MainContent from "./Components/Blog";
import Home from "./Components/Home";

function App() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const toggleSidebar = () => {
      setIsSidebarVisible(!isSidebarVisible);
    };
    
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex flex-1 relative overflow-hidden">
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
        <div
          className={`transition-all w-full p-3 duration-300 bg-[#E5ECF3] overflow-y-auto transition-border-radius ${
            isSidebarVisible ? "rounded-tl-2xl" : "rounded-none"
          }`}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:slug" element={<MainContent />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
