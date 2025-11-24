export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
      });
    }

    // --- FAKE DATA FOR TESTING ---

    const solfegeMap = {
      C: "Do",
      D: "Ré",
      E: "Mi",
      F: "Fa",
      G: "Sol",
      A: "La",
      B: "Si",
    };

    const fakeMeasures = [
      { number: 1, letters: ["C", "D", "E", "F"] },
      { number: 2, letters: ["G", "A", "B", "C"] },
    ];

    const measures = fakeMeasures.map((m) => ({
      number: m.number,
      notes: m.letters.map((letter) => ({
        letter,
        solfege: solfegeMap[letter] || "",
      })),
    }));

    return new Response(
      JSON.stringify({
        message: "File received (fake notes generated)",
        filename: file.name,
        measures,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
