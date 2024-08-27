import { useState } from "react";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

const Body = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className={`flex flex-1 relative overflow-hidden`}>
      {isSidebarVisible ? (
        <Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
      ) : (
        <button
          onClick={toggleSidebar}
          className="bg-[#6947BF] text-white p-4 size-10 text-2xl flex items-center justify-center rounded-full absolute bottom-4 left-4 z-10">
          <FontAwesomeIcon icon={faCaretRight} />
        </button>
      )}
      <MainContent isSidebarVisible={isSidebarVisible} />
    </div>
  );
};

export default Body;
