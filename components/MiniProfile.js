import { useSession, signOut } from "next-auth/react";
import React from "react";

export default function MiniProfile() {
  const { data: session } = useSession();
  return (
    <div className="flex items-center justify-between mt-12 ml-8">
      <img
        src={
          session?.user?.image ||
          "https://tailus.io/sources/blocks/social/preview/images/google.svg"
        }
        className="border rounded-full p-1 h-16 w-16"
        alt=""
      />
      <div className="flex-1 mx-3">
        <h2 className="font-bold">{session?.user?.username}</h2>
        <h3 className="text-sm text-gray-400 font-light">
          {session?.user?.email}
        </h3>
      </div>
      <button onClick={signOut} className="text-blue-400 text-sm font-semibold">
        Sign Out
      </button>
    </div>
  );
}
