import Home from "../assets/home.svg";
import Book from "../assets/book.svg";
import Note from "../assets/note.svg";
import Stories from "../assets/stories.svg";
import Post from "../assets/post.svg";
import Users from "../assets/users.svg";
import Quiz from "../assets/quiz.svg";
import Account from "../assets/account.svg";
import CloseIcon from "../assets/close.svg";

const Sidebar = ({ isVisible, toggleSidebar }) => {
  return (
    <div
      className={`w-20 p-4 transition-transform duration-300 flex flex-col justify-between items-center ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex gap-4 flex-col items-center">
        <div className="bg-[#6947BF] p-3 rounded-2xl">
          <img src={Home} alt="Home" className="size-6" />
        </div>
        <div className="">
          <img src={Stories} alt="Stories" className="size-6" />
        </div>
        <div className="">
          <img src={Book} alt="Book" className="size-6" />
        </div>
        <hr className="w-full" />
        <div className="">
          <img src={Note} alt="Note" className="size-6" />
        </div>
        <div className="">
          <img src={Post} alt="Post" className="size-6" />
        </div>
        <div className="">
          <img src={Users} alt="Users" className="size-6" />
        </div>
        <div className="">
          <img src={Quiz} alt="Quiz" className="size-6" />
        </div>
        <hr className="w-full" />
        <div className="">
          <img src={Account} alt="Account" className="size-6" />
        </div>
      </div>
      <div>
        <button onClick={toggleSidebar} className="">
          <img src={CloseIcon} alt="Close" className="size-6" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;