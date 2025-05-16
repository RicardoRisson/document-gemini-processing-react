import { Buffer } from "buffer";
import pdfIcon from "../images/pdf-file-3382.png";
import { GoogleGenAI } from "@google/genai";
import Loader from "./Loader";

function FileUpload({ setFile }) {
  async function handleFileUpload(event) {
    const uploaded = await event.target.files[0].arrayBuffer();
    const file = {
      type: event.target.files[0].type,
      file: Buffer.from(uploaded).toString("base64"),
      imageUrl: event.target.files[0].type.includes("pdf")
        ? pdfIcon
        : URL.createObjectURL(event.target.files[0]),
    };
    setFile(file);
  }

  return (
    <section>
      <h2>Get Started</h2>
      <input
        type="file"
        accept=".pdf, .jpg, .jpeg, .png"
        onChange={handleFileUpload}
      />
    </section>
  );
}

export default FileUpload;
