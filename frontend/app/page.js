"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!file) {
      setResponse("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/backend/api/convert", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResponse(JSON.stringify(data, null, 2));
  }

  return (
    <main>
      <h1>Note Scanner</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Convert</button>
      </form>

      <pre style={{ marginTop: 20 }}>{response}</pre>
    </main>
  );
}
