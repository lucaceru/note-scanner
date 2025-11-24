import { mapLettersToMeasures } from "../../../shared/noteMappings";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
      });
    }

    // --- FAKE DATA FOR TESTING (now with sharps) ---
    // Imagine this is like a real melody that had accidentals.
    const fakeMeasures = [
      { number: 1, letters: ["C", "D", "E", "F#"] },
      { number: 2, letters: ["G", "A", "B", "C"] },
      { number: 3, letters: ["F", "G#", "A", "B"] },
    ];

    const measures = mapLettersToMeasures(fakeMeasures);

    return new Response(
      JSON.stringify({
        message: "File received (fake notes with sharps)",
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
