import { useState } from "react";
import axios from "axios";

function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [customAlias, setCustomAlias] =
    useState("");
  const [error, setError] = useState("");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      shortUrl
    );

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
      const token =
        localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      setError("");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/url`,
        {
          originalUrl: url,
          customAlias,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const shortCode =
        response.data.data.shortCode;

      setShortUrl(
        `${import.meta.env.VITE_API_URL}/${shortCode}`
      );

      setUrl("");
      setCustomAlias("");

    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h1>URL Shortener</h1>

      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
          setShortUrl("");
        }}
        style={{
          width: "400px",
          padding: "10px",
        }}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Custom Alias (optional)"
        value={customAlias}
        onChange={(e) =>
          setCustomAlias(e.target.value)
        }
        style={{
          width: "400px",
          padding: "10px",
        }}
      />

      <br />
      <br />

      <button
        onClick={handleSubmit}
        disabled={!url.trim()}
        style={{
          padding: "10px",
        }}
      >
        Shorten
      </button>

      {shortUrl && (
        <button
          onClick={handleCopy}
          style={{
            marginLeft: "10px",
            padding: "10px",
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      )}

      {error && (
        <p style={{ marginTop: "20px" }}>
          {error}
        </p>
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

export default Home;