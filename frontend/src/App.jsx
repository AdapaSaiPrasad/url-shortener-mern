import { useState } from "react";
import axios from "axios";


function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
  await navigator.clipboard.writeText(shortUrl);
  setCopied(true);

  setTimeout(() => {
    setCopied(false);
  }, 2000);
};
  const handleSubmit = async () => {
      try {
    new URL(url);
  } catch {
    alert("Please enter a valid URL");
    return;
  }
    try {
      const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/url`,
  {
    originalUrl: url,
  }
);

      const shortCode = response.data.data.shortCode;

      setShortUrl(
        `${import.meta.env.VITE_API_URL}/${shortCode}`
      );
      console.log("Clearing input");
      setUrl("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h1>URL Shortener</h1>

      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => {setUrl(e.target.value);
          setShortUrl("");
        }}
        style={{
          width: "400px",
          padding: "10px",
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={!url.trim()}
        style={{
          marginLeft: "10px",
          padding: "10px",
        }}
      >
        Shorten
      </button>
      {shortUrl && (
  <button
    onClick={handleCopy}
      disabled={!shortUrl}
    style={{
      marginLeft: "10px",
      padding: "10px",
    }}
  >
    {copied ? "Copied!" : "Copy"}
  </button>
)}
      {shortUrl && (
        <div style={{ marginTop: "20px" }}>
          <h3>Short URL</h3>

          <a
            href={shortUrl}
            target="_blank"
            rel="noreferrer"
          >
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;