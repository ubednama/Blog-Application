import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Home from "../assets/home.svg";
import Book from "../assets/book.svg";
import Note from "../assets/note.svg";
import Stories from "../assets/stories.svg";
import Post from "../assets/post.svg";
import Users from "../assets/users.svg";
import Quiz from "../assets/quiz.svg";
import Account from "../assets/account.svg";
import CloseIcon from "../assets/close.svg";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/AuthContext";

const SvgIcon = ({ src, alt, isSelected }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`size-6 ${
        isSelected ? "brightness-0 invert" : "brightness-0"
      }`}
    />
  );
};

const Sidebar = ({ isVisible, toggleSidebar }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setSelectedItem("Home");
    } else if (path === "/login" || path === "/signup") {
      setSelectedItem("Account");
    } else if (path === "/create-post") {
      setSelectedItem("Post");
    } else {
      setSelectedItem("Home");
    }
  }, [location.pathname]);

  const handleItemClick = (item) => {
    const underConstructionItems = ["Users", "Stories", "Book", "Note", "Quiz"];

    if (underConstructionItems.includes(item)) {
      toast("Under Construction");
    } else {
      setSelectedItem(item);
      if (item === "Home") {
        navigate("/");
      } else if (item === "Post") {
        isAuthenticated
          ? navigate("/create-post")
          : toast("Please log in to create a post.");
      } else if (item === "Account") {
        isAuthenticated ? navigate("/account") : navigate("/login");
      }
    }
  };

  const menuItems = [
    { name: "Home", icon: Home, action: () => handleItemClick("Home") },
    { name: "Users", icon: Users, action: () => handleItemClick("Users") },
    {
      name: "Stories",
      icon: Stories,
      action: () => handleItemClick("Stories"),
    },
    { name: "Book", icon: Book, action: () => handleItemClick("Book") },
    { name: "Note", icon: Note, action: () => handleItemClick("Note") },
    { name: "Post", icon: Post, action: () => handleItemClick("Post") },
    { name: "Quiz", icon: Quiz, action: () => handleItemClick("Quiz") },
    {
      name: "Account",
      icon: Account,
      action: () => handleItemClick("Account"),
    },
  ];

  return (
    <div
      className={`w-20 p-4 transition-transform duration-300 flex flex-col justify-between items-center ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      } `}
    >
      <div className="flex gap-4 flex-col items-center">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`sidebar-item group ${
              selectedItem === item.name
                ? "bg-[#6947BF] rounded-2xl p-2"
                : "p-2"
            }`}
            onClick={item.action}
          >
            <SvgIcon
              src={item.icon}
              alt={item.name}
              isSelected={selectedItem === item.name}
            />
            <span
              className={`sidebar-item-title ${
                selectedItem === item.name ? "text-white" : "text-black"
              }`}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
      <div>
        <button onClick={toggleSidebar} className="p-2">
          <SvgIcon src={CloseIcon} alt="Close" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;