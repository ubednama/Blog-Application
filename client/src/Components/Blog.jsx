import React, { useEffect, useState } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import ContentPage from "./BlogSection";
import { axiosInstance, useAxiosInterceptors } from "../apis/axoisInstance";
import { useNavigate, useParams } from "react-router-dom";
import { formatTime, formatTimeInterval } from "../utils/extractTime";

const MainContent = ({ isSidebarVisible }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchPosts = async () => {
    try {
      const response = await axiosInstance.get(`/posts/${slug}`);
      console.log(response.data)
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useAxiosInterceptors();

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
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
      className={`flex-1 p-1 sm:p-4 max-w-[100%] transition-all duration-300 bg-[#E5ECF3] overflow-y-auto transition-border-radius ${
        isSidebarVisible ? "rounded-tl-2xl" : "rounded-none"
      }`}
    >
      {posts.length === 0 ? (
        <div className="flex w-full justify-center text-[#7A8196] font-semibold">
          <div>No Blogs found</div>
        </div>
      ) : (
        <div className="flex flex-col items-center pt-10">
          <div className="p-2 sm:p-0 sm:w-[90%] lg:w-[60%] relative space-y-5">
            <div className="flex mb-2">
              <div
                onClick={() => navigate("/")}
                className="border-2 py-1.5 px-4 bg-[#7A8196] text-white border-[#C1CCD6] w-fit rounded-full cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                ← Go Back
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-2">
              <div className="flex gap-2">
                {posts.tags.map((tag) => (
                  <div
                    key={tag}
                    className="border-2 py-1.5 px-4 border-[#C1CCD6] w-fit rounded-full"
                  >
                    {tag}
                  </div>
                ))}
              </div>
              <h1 className="text-4xl font-bold">{posts.title}</h1>
              <div className="flex gap-14">
                <span className="flex flex-col">
                  <div className="font-bold text-[#7A8196]">Author</div>
                  <div className="text-[#7A8196]">{posts.author.name}</div>
                </span>
                <span className="flex flex-col">
                  <div className="font-semibold text-[#7A8196]">Updated</div>
                  <div className="text-[#7A8196]">
                    {formatTime(posts.updatedAt)}
                  </div>
                </span>
                <span className="flex flex-col">
                  <div className="font-semibold text-[#7A8196]">Read Time</div>
                  <div className="text-[#7A8196]">{posts.duration} mins</div>
                </span>
              </div>
            </div>

            <div className="relative left-1/2 -translate-x-1/2 w-full sm:w-[105%] md:w-[115%] lg:w-[125%] aspect-w-2 aspect-h-1">
              <div className="border border-[#D6DFE4] p-4 rounded-2xl flex items-center justify-center">
                {posts.featuredImage ? (
                  <img
                    src={posts.featuredImage}
                    alt="Featured"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <h2 className="text-4xl font-bold text-[#C1CCD6]">
                    Title Image Placeholder
                  </h2>
                )}
              </div>
            </div>

            <div className="space-y-5 mt-5">
              {posts.sections.map((post) => (
                <ContentPage
                  key={post._id}
                  title={post.sectionTitle}
                  content={post.content}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;
