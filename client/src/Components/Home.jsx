import { useEffect, useState } from 'react'
import { axiosInstance, useAxiosInterceptors } from "../apis/axoisInstance";
import { Link } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";
import { formatTime } from '../utils/extractTime';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
      const [posts, setPosts] = useState([]);
      const [loading, setLoading] = useState(true);

      const fetchPosts = async () => {
        try {
          const response = await axiosInstance.get(`/posts`);
          setPosts(response.data);
        } catch (error) {
          console.error("Error fetching posts:", error);
        } finally {
          setLoading(false);
        }
      };

      console.log(posts);

      useAxiosInterceptors();

      useEffect(() => {
        fetchPosts();
      }, []);
  return (
    <div className="flex justify-center w-full mt-10">
      {loading ? (
        <div className="flex mt-4 justify-center h-full w-full">
          <div>
            <PacmanLoader color="#6947BF" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-auto">
          {posts.map((post) => (
            <Link
              to={`/posts/${post.slug}`}
              className="relative flex justify-center w-full mb-4 group"
              key={post.slug}
            >
              <div className="flex flex-col gap-1 w-full max-w-[450px] lg:max-w-[96%]">
                <div className="rounded-2xl bg-white h-56 lg:h-52 w-full border flex items-center justify-center">
                  {post.featuredImage ? (
                    <img
                      className="object-cover w-full h-full"
                      src={post.featuredImage}
                      alt={post.slug}
                    />
                  ) : (
                    <span className="text-gray-500">Featured Image</span>
                  )}
                </div>
                <div className="flex flex-col gap-3 px-0.5">
                  <div className="text-lg w-full">{post.title}</div>
                  <div className="flex text-[#3D404B] gap-2">
                    <span>{post.duration} min read</span> •
                    <span>{formatTime(post.updatedAt)}</span>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#6947BF] rounded-full size-8 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-white text-xl"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home
