import { message } from "antd";
import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";

interface chatMessage {
  message: string;
  user: boolean;
}
const ChatMessage = ({
  message,
  isUser,
}: {
  message: string;
  isUser: boolean;
}) => {
  const messageClass = isUser ? "bg-blue-500 text-white" : "bg-gray-300";

  return (
    <div className={`flex justify-end ${isUser ? "" : "flex-row-reverse"}`}>
      <div
        className={`max-w-xs mx-2 my-1 px-4 py-2 rounded-lg ${messageClass}`}
      >
        {message}
      </div>
    </div>
  );
};
const AIchatRoom = () => {
  const [chats, setChats] = useState<chatMessage[]>([
    { message: "Hello, how can I assist you today?", user: false },
  ]);

  const [input, setInput] = useState<string>("");

  const handleChange = async (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    try {
      if (input === null) {
        return;
      } else {
        const newChat: chatMessage = { message: input, user: true };
        setChats((prev) => [...prev, newChat]);
        setInput("");
      }

      //api part is not done
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex flex-col h-screen bg-gray-100">
        <div className="flex-1 overflow-y-auto p-4">
          {chats.map((chat, index) => (
            <ChatMessage
              message={chat.message}
              isUser={chat.user}
              key={index}
            />
          ))}
        </div>
        <div className=" p-4 flex items-center">
          <input
            type="text"
            placeholder="Type your message here..."
            className="relative w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <IoMdSend
            className=" mr-auto text-black text-2xl cursor-pointer"
            onClick={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AIchatRoom;
