import React, { useState, useEffect } from "react";
import faker from "@faker-js/faker";
import { useSession } from "next-auth/react";
import { LockClosedIcon } from "@heroicons/react/outline";

export default function Suggestions() {
  const { data: session } = useSession();
  const [suggestion, setSugesstion] = useState([]);
  useEffect(() => {
    const suggestion = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setSugesstion(suggestion);
  }, []);
  return (
    <>
      <div className="mt-4 ml-8">
        <div className="flex justify-between text-sm mb-5">
          <h3 className="text-sm font-bold text-gray-400">
            Sugesstion for you
          </h3>
          <button className="text-gray-600 font-semibold">See All</button>
        </div>
        {suggestion.map((profile) => (
          <div
            key={profile.id}
            className={`flex items-center justify-between mt-3 cursor-pointer ${
              !session && "cursor-not-allowed"
            }`}
          >
            <img
              className="w-10 h-10 rounded-full border p-1"
              src={profile.avatar}
              alt=""
            />
            <div className="flex-1 ml-4">
              <h2 className="font-semibold text-sm">{profile.username}</h2>
              <h3 className="text-gray-400 text-xs truncate">
                Work at {profile.company.name}
              </h3>
            </div>
            {session ? (
              <button className="text-blue-400 font-semibold text-xs">
                Follow
              </button>
            ) : (
              <LockClosedIcon className="h-5 w-5 stroke-1" />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
