import React, { useEffect, useState } from "react";
import axios from "axios";
import PacmanLoader from "react-spinners/PacmanLoader";
import ContentPage from "./ContentPage";

const MainContent = ({ isSidebarVisible }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/post");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  if (posts.length === 0) {
    return (
      <div className="flex mt-4 justify-center h-full w-full">
        <div>
          <PacmanLoader color="#6947BF" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex-1 p-4 transition-all duration-300 bg-[#E5ECF3] overflow-y-auto transition-border-radius ${
        isSidebarVisible ? "rounded-tl-2xl" : "rounded-none"
      }`}
    >
      <div className="flex justify-center pt-10">
        <div className="w-[60%] relative space-y-5">
          <div className="border-2 py-1.5 px-4 border-[#C1CCD6] w-fit rounded-full">
            Useful Resources
          </div>
          <h1 className="text-4xl font-bold">
            Why should I use FlashCards for revision?
          </h1>
          <div className="flex gap-4">
            <span className="flex flex-col">
              <div className="font-semibold text-[#7A8196]">Published</div>
              <div className="text-[#7A8196]">12 days ago</div>
            </span>
            <span className="flex flex-col">
              <div className="font-semibold text-[#7A8196]">Read Time</div>
              <div className="text-[#7A8196]">4 mins</div>
            </span>
          </div>

          <div className="relative left-1/2 -translate-x-1/2 w-[120%] aspect-w-2 aspect-h-1">
            <div className="border border-[#D6DFE4] p-4 rounded-2xl w-full  flex items-center justify-center">
              <h2 className="text-4xl font-bold text-[#C1CCD6]">
                Title Image Placeholder
              </h2>
            </div>
          </div>

          <div className="space-y-5">
            {posts.map((post) => (
              <ContentPage
                key={post._id}
                title={post.title}
                content={post.content}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
