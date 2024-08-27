import React from "react";

const ContentPage = ({ title, content }) => {
  return (
    <div className="p-4 bg-white rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-4 text-[#1E2026]">
        {title}
      </h1>
      <div className="space-y-4 text-[#3D404B]">
        {content.map((item, index) => (
          <div key={index}>
            {item.type === "text" && <div>{item.data}</div>}
            {item.type === "image" && (
              <div className="px-20">
                <img
                  src={item.imageUrl}
                  alt={item.data}
                  className="w-full h-auto rounded"
                  />
              </div>
            )}
            {item.type === "video" && (
              <video controls className="w-full h-auto rounded">
                <source src={item.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            {item.type === "link" && (
              <a href={item.url} className="text-blue-500 underline">
                {item.linkText}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentPage;
