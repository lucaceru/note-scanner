export default function Home() {
  return (
    <main>
      <h1>Note Scanner</h1>
      <p>Upload your sheet music to convert it into letters (ABC or Do Ré Mi).</p>

      <form>
        <input type="file" accept="image/*,.pdf" />
        <button type="submit">Convert</button>
      </form>
    </main>
  );
}

