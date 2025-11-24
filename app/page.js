"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

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
    <main>
      <h1>Note Scanner</h1>
      <p>Upload your sheet music to convert it into letters (ABC / Do Ré Mi).</p>

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

      {result && (
        <section style={{ marginTop: 30 }}>
          <h2>Preview (fake data for now)</h2>
          <p>
            <strong>File:</strong> {result.filename}
          </p>

          {result.measures?.map((measure) => (
            <div key={measure.number} style={{ marginTop: 15 }}>
              <strong>Measure {measure.number}</strong>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  marginTop: 6,
                  flexWrap: "wrap",
                }}
              >
                {measure.notes.map((note, idx) => (
                  <div
                    key={idx}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: 6,
                      padding: "6px 10px",
                      minWidth: 40,
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: 18, fontWeight: "bold" }}>
                      {note.letter}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#555",
                        marginTop: 2,
                      }}
                    >
                      {note.solfege}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <pre style={{ marginTop: 20, fontSize: 12 }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </section>
      )}
    </main>
  );
}
