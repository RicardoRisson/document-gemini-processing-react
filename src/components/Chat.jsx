import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import "../css/chat.scss";

function Chat({ file }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSendMessage() {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((msgs) => [...msgs, userMessage]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({
        apiKey: "YOUR-GEMINI-API-KEY-HERE",
      });

      const contents = [
        {
          role: "user",
          text: `Answer the question below without using HTML, without using Markdown, without bold, without italic, and without any tags. Just plain text only, 150 word limit, be consise but not too short.\nQuestion: ${input}`,
        },
        {
          inlineData: {
            mimeType: file.type,
            data: file.file,
          },
        },
      ];

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents,
      });

      const botText = response.text || "Could not generate a response.";
      const botMessage = { role: "model", text: botText };
      setMessages((msgs) => [...msgs, botMessage]);
    } catch (err) {
      console.error(err);
      setError("Error sending your message. Please try again.");
      setMessages((msgs) => [
        ...msgs,
        {
          role: "error",
          text: "Error sending your message. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="chat-window">
      <h2>Chat</h2>

      <div className="chat">
        {messages.map((msg, idx) => (
          <div className={msg.role} key={idx}>
            <p>{msg.text}</p>
          </div>
        ))}

        {loading && (
          <div className="loader">
            <p>Loading...</p>
          </div>
        )}
      </div>

      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Ask questions about the uploaded document..."
          disabled={loading}
        />
        <button onClick={handleSendMessage} disabled={loading}>
          Send
        </button>
      </div>

      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}
    </section>
  );
}

export default Chat;
