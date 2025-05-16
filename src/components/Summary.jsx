import { useEffect, useState } from "react";
import { GoogleGenAI } from "@google/genai";
import Loader from "./Loader";

function Summary({ file }) {
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    async function getSummary() {
      setStatus("loading");

      try {
        const ai = new GoogleGenAI({
          apiKey: "YOUR-GEMINI-API-KEY-HERE",
        });

        const contents = [
          {
            text: `summarize the document in one short paragrath (less then 150 words) use just plain text with
            no markdowns or html tags`,
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
          contents: contents,
        });

        const text = response.text || "No summary returned";

        setSummary(text);
        setStatus("success");
      } catch (error) {
        console.error("Error generating summary:", error);
        setStatus("error");
      }
    }

    if (file?.file && file?.type) {
      getSummary();
    }
  }, [file]);

  return (
    <div className="summary">
      <img src={file.imageUrl} alt="preview-image" />
      <h2>Summary</h2>
      {status === "loading" && <Loader />}
      {status === "success" && <p>{summary}</p>}
      {status === "error" && (
        <p style={{ color: "red" }}>
          Error, try again using a supported file type.
        </p>
      )}
    </div>
  );
}

export default Summary;
