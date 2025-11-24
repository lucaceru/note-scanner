"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("en"); // "en" or "fr"

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setResult(null);

    if (!file) {
      setError("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/convert", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      return;
    }

    setResult(data);
  }

  return (
    <main style={{ maxWidth: 900, margin: "0 auto" }}>
      <h1>Note Scanner</h1>
      <p>Upload your sheet music to turn it into an easy letter sheet.</p>

      {/* Language selector */}
      <div style={{ marginTop: 10 }}>
        <label>
          <input
            type="radio"
            name="lang"
            value="en"
            checked={language === "en"}
            onChange={() => setLanguage("en")}
          />{" "}
          English letters (A B C)
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="lang"
            value="fr"
            checked={language === "fr"}
            onChange={() => setLanguage("fr")}
          />{" "}
          Français (Do Ré Mi)
        </label>
      </div>

      {/* Upload form */}
      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" style={{ marginLeft: 10 }}>
          Convert
        </button>
      </form>

      {error && (
        <p style={{ marginTop: 20, color: "red" }}>
          {error}
        </p>
      )}

      {/* “Letter sheet” preview */}
      {result && (
        <section style={{ marginTop: 30 }}>
          <h2>Letter Sheet (fake data for now)</h2>
          <p>
            <strong>File:</strong> {result.filename}
          </p>

          <div
            style={{
              marginTop: 20,
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: "12px 16px",
              background: "#fafafa",
            }}
          >
            {result.measures?.map((measure) => (
              <div
                key={measure.number}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                {/* Measure number on the left, like on a real score */}
                <div
                  style={{
                    width: 70,
                    fontSize: 12,
                    color: "#666",
                    textAlign: "right",
                    paddingRight: 10,
                    borderRight: "1px solid #ccc",
                  }}
                >
                  M{measure.number}
                </div>

                {/* Notes as boxes in a “bar” */}
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    gap: 8,
                    paddingLeft: 10,
                    borderLeft: "2px solid black", // left barline
                    borderRight: "2px solid black", // right barline
                    paddingTop: 4,
                    paddingBottom: 4,
                    flexWrap: "wrap",
                  }}
                >
                  {measure.notes.map((note, idx) => {
                    const main =
                      language === "en" ? note.letter : note.solfege;
                    const secondary =
                      language === "en" ? note.solfege : note.letter;

                    return (
                      <div
                        key={idx}
                        style={{
                          border: "1px solid #999",
                          borderRadius: 6,
                          padding: "6px 10px",
                          minWidth: 40,
                          textAlign: "center",
                          background: "#fff",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            lineHeight: 1.1,
                          }}
                        >
                          {main}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "#555",
                            marginTop: 2,
                          }}
                        >
                          {secondary}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
