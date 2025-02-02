import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-lightGray dark:bg-[#020817] bg-opacity-75 z-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-800"></div>
        <h2 className="mt-4 text-xl font-semibold text-gray-800">Loading...</h2>
      </div>
    </div>
  );
};

export default Loading;
