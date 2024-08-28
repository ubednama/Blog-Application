import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faVideo, faTrash } from "@fortawesome/free-solid-svg-icons";
import { axiosInstance, useAxiosInterceptors } from "../apis/axoisInstance";
import { toast } from "react-toastify";

const CreatePost = () => {
  const [selectedTab, setSelectedTab] = useState("write");

  const [postData, setPostData] = useState({
    title: "",
    tags: [],
    author: { name: "" },
    featuredImage: "",
    duration: 0,
    excerpt: "",
    sections: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleTagsChange = (e) => {
    setPostData({
      ...postData,
      tags: e.target.value.split(",").map((tag) => tag.trim()),
    });
  };

  const addSection = () => {
    setPostData({
      ...postData,
      sections: [...postData.sections, { sectionTitle: "", content: [] }],
    });
  };

  const addContentToSection = (sectionIndex) => {
    const sections = [...postData.sections];
    sections[sectionIndex].content.push({ type: "text", data: "" });
    setPostData({
      ...postData,
      sections,
    });
  };

  const handleSectionChange = (sectionIndex, e) => {
    const { name, value } = e.target;
    const sections = [...postData.sections];
    sections[sectionIndex] = {
      ...sections[sectionIndex],
      [name]: value,
    };
    setPostData({
      ...postData,
      sections,
    });
  };

  const handleContentChange = (sectionIndex, contentIndex, e) => {
    const { name, value } = e.target;
    const sections = [...postData.sections];
    sections[sectionIndex].content[contentIndex][name] = value;
    setPostData({
      ...postData,
      sections,
    });
  };

  const handleContentTypeChange = (sectionIndex, contentIndex, e) => {
    const { value } = e.target;
    const sections = [...postData.sections];
    sections[sectionIndex].content[contentIndex].type = value;
    setPostData({
      ...postData,
      sections,
    });
  };

  const handleMarkdownChange = (sectionIndex, contentIndex, value) => {
    const sections = [...postData.sections];
    sections[sectionIndex].content[contentIndex].data = value;
    setPostData({
      ...postData,
      sections,
    });
  };

  const handleDeleteSection = (sectionIndex) => {
    const sections = [...postData.sections];
    sections.splice(sectionIndex, 1);
    setPostData({
      ...postData,
      sections,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(postData);
    try {
      const response = await axiosInstance.post("/posts", postData);
      toast("Post created successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error creating post:", error);
      toast("Error creating post");
    }
  };
  useAxiosInterceptors();

  return (
    <div className="flex-1 p-1 sm:p-4 max-w-[100%] transition-all duration-300 bg-[#E5ECF3] text-[#5B6170] overflow-y-auto transition-border-radius">
      <div className="flex flex-col items-center pt-10">
        <div className="p-2 sm:p-0 sm:w-[90%] lg:w-[60%] relative space-y-5">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex mb-2">
              <button
                type="submit"
                className="border-2 py-1.5 px-4 bg-[#7A8196] text-white border-[#C1CCD6] w-fit rounded-full cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                Create Post
              </button>
            </div>
            <div className="flex flex-col gap-2 mb-2">
              <div>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter title here"
                  value={postData.title}
                  onChange={handleChange}
                  required
                  className="text-4xl font-bold bg-inherit w-full break-words"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="excerpt"
                  placeholder="Enter Excerpt here"
                  value={postData.excerpt}
                  onChange={handleChange}
                  required
                  className="text-xl bg-inherit w-full break-words"
                />
              </div>
              <div className="border-2 border-[#C1CCD6] rounded-full w-fit">
                <input
                  type="text"
                  name="tags"
                  placeholder="Enter tags here (comma separated)"
                  value={postData.tags.join(",")}
                  onChange={handleTagsChange}
                  required
                  className="py-2 px-5 rounded-full bg-inherit w-full break-words"
                />
              </div>
              <div className="flex items-center gap-1">
                <div className="font-semibold text-[#7A8196]">Duration</div>
                <input
                  type="number"
                  name="duration"
                  value={postData.duration}
                  onChange={handleChange}
                  required
                  className="w-20 p-2 bg-inherit rounded-2xl border border-[#C1CCD6] text-[#7A8196] "
                />{" "}
                in minutes
              </div>
            </div>

            <div className="relative left-1/2 -translate-x-1/2 w-full sm:w-[105%] md:w-[115%] lg:w-[125%] aspect-w-2 aspect-h-1">
              <div className="border border-[#D6DFE4] p-4 rounded-2xl flex flex-col items-center justify-center">
                <FontAwesomeIcon icon={faImage} className="size-20 " />
                <div className="text-4xl font-bold text-[#C1CCD6] bg-inherit">
                  <span className="line-through">Drag and drop here or</span>{" "}
                  paste Title Image URL below
                </div>
                <input
                  type="text"
                  name="featuredImage"
                  placeholder=""
                  value={postData.featuredImage}
                  onChange={handleChange}
                  className="text-4xl font-bold text-[#C1CCD6] bg-inherit border-b border-[#C1CCD6]"
                />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-[#1E2026]">
                Sections
              </h2>
              {postData.sections.map((section, sectionIndex) => (
                <div
                  key={sectionIndex}
                  className="relative mb-4 p-4 bg-white rounded-2xl shadow"
                >
                  <button
                    type="button"
                    onClick={() => handleDeleteSection(sectionIndex)}
                    className="absolute bottom-3 right-3 p-1 px-2  cursor-pointer  transition-transform duration-300 hover:scale-105"
                  >
                    <FontAwesomeIcon icon={faTrash} className="text-red-700" />
                  </button>
                  <div className="text-2xl font-bold mb-4 text-[#1E2026]">
                    <input
                      type="text"
                      name="sectionTitle"
                      placeholder="Section Title"
                      value={section.sectionTitle}
                      onChange={(e) => handleSectionChange(sectionIndex, e)}
                      required
                      className="w-full p-2"
                    />
                  </div>
                  {section.content.map((content, contentIndex) => (
                    <div key={contentIndex} className="mt-2">
                      <label className="block text-[#7A8196] font-semibold">
                        Type:
                      </label>
                      <select
                        name="type"
                        value={content.type}
                        onChange={(e) =>
                          handleContentTypeChange(sectionIndex, contentIndex, e)
                        }
                        className="p-2 pb-1.5 bg-white border border-[#C1CCD6] rounded-lg mb-2 ml-1"
                      >
                        <option value="text">Text</option>
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                        <option value="link">Link</option>
                      </select>
                      {content.type === "text" && (
                        <div>
                          <textarea
                            name="data"
                            placeholder="Enter Text here"
                            value={content.data}
                            onChange={(e) =>
                              handleContentChange(sectionIndex, contentIndex, e)
                            }
                            required
                            className="w-full p-2 bg-inherit border border-[#C1CCD6] rounded-lg"
                          />
                          {selectedTab === "preview" && (
                            <div className="p-2 mt-2 bg-white border border-[#C1CCD6] rounded-md">
                              <ReactMarkdown>{content.data}</ReactMarkdown>
                            </div>
                          )}
                        </div>
                      )}

                      {content.type === "image" && (
                        <div className="px-20 min-h-40 border rounded-xl  flex flex-col items-center justify-center">
                          <FontAwesomeIcon
                            icon={faImage}
                            className="size-14 "
                          />
                          <div className="text-xl font-bold text-[#C1CCD6] bg-inherit text-center">
                            <span className="line-through">
                              Drag and drop here or
                            </span>{" "}
                            paste Image URL below
                          </div>
                          <input
                            type="text"
                            name="imageUrl"
                            placeholder=""
                            value={content.imageUrl}
                            onChange={(e) =>
                              handleContentChange(sectionIndex, contentIndex, e)
                            }
                            required
                            className="text-[#C1CCD6] bg-inherit border-b border-[#C1CCD6]"
                          />
                        </div>
                      )}
                      {content.type === "video" && (
                        <div className="px-20 min-h-40 border rounded-xl  flex flex-col items-center justify-center">
                          <FontAwesomeIcon
                            icon={faVideo}
                            className="size-14 "
                          />
                          <div className="text-xl font-bold text-[#C1CCD6] bg-inherit text-center">
                            <span className="line-through">
                              Drag and drop here or
                            </span>{" "}
                            paste Video URL below
                          </div>
                          <input
                            type="text"
                            name="url"
                            placeholder=""
                            value={content.url}
                            onChange={(e) =>
                              handleContentChange(sectionIndex, contentIndex, e)
                            }
                            required
                            className="text-[#C1CCD6] bg-inherit border-b border-[#C1CCD6]"
                          />
                        </div>
                      )}
                      {content.type === "link" && (
                        <div className="mx-2">
                          <input
                            type="text"
                            name="url"
                            value={content.url}
                            onChange={(e) =>
                              handleContentChange(sectionIndex, contentIndex, e)
                            }
                            required
                            className="w-full p-2 pb-0 bg-white border-b border-[#C1CCD6] mb-2"
                            placeholder="Link URL"
                          />
                          <input
                            type="text"
                            name="linkText"
                            value={content.linkText}
                            onChange={(e) =>
                              handleContentChange(sectionIndex, contentIndex, e)
                            }
                            required
                            className="w-full p-2 pb-0 bg-white border-b border-[#C1CCD6] text-blue-500 underline"
                            placeholder="Link Text"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addContentToSection(sectionIndex)}
                    className="mt-4 border-2 py-1.5 px-4 bg-[#7A8196] text-white border-[#C1CCD6] w-fit rounded-full cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    Add Content
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addSection}
                className="mt-4 ml-4 border-2 py-1.5 px-4 bg-[#7A8196] text-white border-[#C1CCD6] w-fit rounded-full cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                Add Section
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;