import Image from "next/image";
import React from "react";
import { HomeIcon, MenuIcon } from "@heroicons/react/solid";
import {
  HeartIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  UserGroupIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);

  const router = useRouter();
  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-10 py-1.5">
      <div className="flex justify-between max-w-5xl mx-5 lg:mx-auto">
        <div
          onClick={() => router.push("/")}
          className="relative hidden lg:inline-grid h-14 w-24 cursor-pointer"
        >
          <Image
            src="https://links.papareact.com/ocw"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div
          onClick={() => router.push("/")}
          className="relative h-18  w-10 lg:hidden flex-shrink-0 cursor-pointer"
        >
          <Image
            src="https://links.papareact.com/jjm "
            layout="fill"
            objectFit="contain"
          />
        </div>
        {/* middle search */}
        <div className="relative p-2 rounded-md">
          <div className="absolute p-2 flex items-center pointer-events-none">
            <SearchIcon className="h-6 w-6 text-gray-400" />
          </div>
          <input
            className="bg-gray-50 blovck w-full pl-14 sm:text-sm border-gray-100 focus:ring-gray-200 focus:border-gray-200 rounded-md"
            type="text"
            placeholder="Search"
          />
        </div>
        {/* right */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon
            onClick={() => router.push("/")}
            className="navBtn stroke-1.5"
          />
          <MenuIcon className="h-6 w-6 text-gray-700 md:hidden cursor-pointer" />
          {session ? (
            <>
              <div className="relative navBtn">
                <PaperAirplaneIcon className="navBtn rotate-45 stroke-1.5" />
                <div className="absolute p-1.5 -top-3 -right-1 text-xs h-5 w-5 bg-red-500 animate-pulse text-white flex items-center rounded-full">
                  3
                </div>
              </div>
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navBtn stroke-1.5"
              />
              <UserGroupIcon className="navBtn stroke-1.5" />
              <HeartIcon className="navBtn stroke-1.5" />
              <img
                onClick={signOut}
                src={`${session?.user?.image || "https://picsum.photos/200"}`}
                alt="profile pic"
                className="cursor-pointer h-8 rounded-full border"
              />
            </>
          ) : (
            <button onClick={signIn}>Sign in</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
