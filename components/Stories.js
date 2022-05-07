import React, { useEffect, useState } from "react";
import faker from "@faker-js/faker";
import Story from "./Story";
import { useSession } from "next-auth/react";

export default function Stories() {
  const { data: session } = useSession();
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setSuggestions(suggestions);
  }, []);
  return (
    <div className="flex space-x-4 py-5 px-2 bg-white mt-8 border border-gray-200 rounded-sm overflow-x-scroll hide-scroll-bar">
      {session && (
        <Story img={session.user?.image} username={session.user?.username} />
      )}
      {suggestions.map((profile) => {
        return (
          <Story
            key={profile.id}
            img={profile.avatar}
            username={profile.username}
          />
        );
      })}
    </div>
  );
}
