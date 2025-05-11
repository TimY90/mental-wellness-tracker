import React, { useEffect, useState } from "react";
import axios from "axios";

const Quote = () => {
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://api.quotable.io/random")
      .then((res) => {
        if (res.data && res.data.content) {
          const fetchedQuote = {
            q: res.data.content,
            a: res.data.author,
          };
          console.log("Fetched quote:", fetchedQuote);
          setQuote(fetchedQuote);
        } else {
          setError("No quote received.");
        }
      })
      .catch((err) => {
        console.error("Quote fetch failed:", err.message);
        // Fallback quote if API fails
        setQuote({
          q: "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
          a: "Unknown",
        });
      });
  }, []);

  console.log("Rendering quote:", quote);

  return (
    <div
      style={{
        padding: '1rem',
        border: '1px solid #ccc',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
        maxWidth: '600px',
        margin: '1rem auto'
      }}
    >
      {quote ? (
        <>
          <p style={{ fontStyle: "italic", color: "#222" }}>"{quote.q}"</p>
          <p style={{ textAlign: "right", fontWeight: "bold", color: "#222" }}>
            — {quote.a}
          </p>
        </>
      ) : (
        <p style={{ color: "#888" }}>{error || "Loading quote..."}</p>
      )}
    </div>
  );
};

export default Quote;
