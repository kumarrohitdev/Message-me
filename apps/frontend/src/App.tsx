import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import InputEmoji from "react-input-emoji";

export default function App() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "other" }[]
  >([]);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");
      newSocket.onopen = () => {
      console.log("Connection established");
      newSocket.send("Hello Server!");
    };
    newSocket.onmessage = (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message.data, sender: "other" },
      ]);
    };
    return () => newSocket.close();
  }, []);

  const sendMessage = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender: "user" },
    ]);
    
    setMessage("");
  };

  return (
    <div className="h-screen max-w-6xl mx-auto flex flex-col">
      <div>
        <Navbar />
      </div>
      <div className="flex-grow overflow-y-auto px-4 pt-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <h1
              className={`rounded-md p-2 max-w-[70%] inline-block ${
                msg.sender === "user" ? "bg-blue-500 text-center text-right" : "bg-gray-300 text-green-400 text-left"
              }`}
            >
              {msg.text}
            </h1>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center p-4">
        {/* InputEmoji component */}
        <InputEmoji
          value={message}
          onChange={setMessage} // Pass setMessage directly to onChange
          cleanOnEnter // Clear input on Enter key press
          placeholder="Write your message"
         background="white"
         borderColor="black"
        />
        {/* Send button */}
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
}
