import React from "react";

function Story({ img, username }) {
  return (
    <div>
      <img
        className="h-14 w-14 rounded-full p-0.5 border-2 border-red-500 object-contain cursor-pointer hover:scale-110 transition transform duration-150 ease-out"
        src={img}
        alt={username}
      />
      <p className="text-xs w-14 truncate text-center">{username}</p>
    </div>
  );
}

export default Story;
