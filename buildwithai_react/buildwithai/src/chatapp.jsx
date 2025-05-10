import React, { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

export default function ChatScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState(() => {
    const stored = localStorage.getItem("chat_messages");
    return stored ? JSON.parse(stored) : [];
  });
  const [input, setInput] = useState("");

  //   const handleChange = (e) => {
  //     setForm({ ...form, [e.target.name]: e.target.value });
  // //   {'question': '', '': 'hello'}
  //   };

  useEffect(() => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    console.log(input);
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user" };
    // setMessages([...messages, userMessage]);
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    getAIResponse(input);
  };

  const getAIResponse = async () => {
    setLoading(true);
    //
    try {
      // const response = await registerUser(form);
      const res = await fetch("http://127.0.0.1:2000", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const data = await res.json();
      console.log("data");
      console.log(data);

      if (data.status == 200) {
        const responseMessage = {
          text: data.reply,
          sender: "assistant",
        };
        // setMessages([...messages, responseMessage]);
        setMessages((prev) => [...prev, responseMessage]);
        // setInput("");
      } else {
        setError(data.message);
      }
    } catch (err) {
      //   showNotification(err.message, "error");
      setError(err.message);
    } finally {
      setLoading(false);
    }

    //
  };

  const handleClear = () => {
    localStorage.removeItem("chat_messages");
    setMessages([]);
  };

  return (
    <div className="min-h-150 bg-gradient-to-br from-purple-900 to-indigo-900 text-white flex flex-col">
      <header className="text-center py-6 shadow-md bg-purple-800 p-5">
        <h1 className="text-3xl font-bold">BuildWithAI Aba 2025</h1>
        <p className="text-lg">Personal Assistant</p>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-md p-3 rounded-lg shadow-md ${
              msg.sender === "user"
                ? "ml-auto bg-blue-600 text-right"
                : "mr-auto bg-gray-700 text-left"
            }`}
          >
            <ReactMarkdown>{msg.text}</ReactMarkdown>
            {/* {msg.text} */}
          </div>
        ))}
      </div>

      {/* typing */}
      {loading && (
        <div className="flex items-end space-x-2 p-4">
          {/* Message bubble container */}
          <div className="bg-gray-200 dark:text-white rounded-2xl px-4 py-2 max-w-xs flex items-center">
            <div className="flex space-x-1">
              <span className="w-2 h-2 border-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-2 h-2 border-purple-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 border-purple-700 rounded-full animate-bounce"></span>
            </div>
          </div>
        </div>
      )}

      {/*  */}
      <div className="p-4 border-t border-purple-700 flex gap-2">
        <input
          type="text"
          value={input}
          //   name={form.question}
          onChange={(e) => setInput(e.target.value)}
          //   onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring focus:ring-purple-500"
        />
        <button
          onClick={handleSend}
          className="bg-purple-600 hover:bg-purple-700"
        >
          Send
        </button>
        <button onClick={handleClear} variant="destructive">
          Clear Chat
        </button>
      </div>
    </div>
  );
}
