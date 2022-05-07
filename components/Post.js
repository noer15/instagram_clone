import {
  BookmarkIcon,
  ChatIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import Moment from "react-moment";

function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showComment, setShowComment] = useState(true);
  const [likes, setLikes] = useState([]);

  const clickShow = () => {
    setShowComment(!showComment);
  };

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setComments(snapshot.docs);
        }
      ),
    [db]
  );

  const sendComment = async (e) => {
    e.preventDefault();
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: comment,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };
  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* Header */}
      <div className="flex items-center p-4">
        <img
          src={userImg}
          className="rounded-full h-12 w-12 object-contain border p-1 mr-4"
          alt="username"
        />
        <p className="flex-1 font-semibold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      {/* img */}
      <img src={img} alt={username} className="object-contain w-full" />

      {session && (
        <div className="flex justify-between px-4 pt-3">
          <div className="flex space-x-4">
            <HeartIcon className="btn" />
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn rotate-45" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}
      {/* caption */}
      <p className="px-5 pt-5 text-md font-light">
        <span className="font-semibold pr-3">{username}</span>
        {caption}
      </p>
      <button
        onClick={clickShow}
        className="text-md text-gray-400 pl-5 py-3 cursor-pointer"
      >
        View all {comments.length}
      </button>
      {/* comment */}
      {comments.length > 0 && (
        <div className={showComment ? "hidden" : "border-b block"}>
          <div className="ml-10 h-20 overflow-y-scroll mt-3">
            {comments.map((comment, index) => (
              <div key={index} className="flex items-center space-x-2 mb-1">
                {/* <img
                  className="h-6 rounded-full"
                  src={comment.data().userImage}
                  alt=""
                /> */}
                <p className="text-sm flex-1 font-normal">
                  <span className="font-semibold pr-2">
                    {comment.data().username}
                  </span>
                  {comment.data().comment}
                </p>
                <Moment fromNow className="pr-3 text-xs text-gray-500 ">
                  {comment.data().timestamp &&
                    comment.data().timestamp.toDate()}
                </Moment>
              </div>
            ))}
          </div>
        </div>
      )}
      {session && (
        <form className="flex items-center p-3">
          <EmojiHappyIcon className="h-7" />
          <input
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border-none flex-1 focus:ring-0 outline-none"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
