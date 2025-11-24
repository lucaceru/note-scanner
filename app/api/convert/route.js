import { mapRawMeasuresToDisplay } from "../../../shared/noteMappings";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
      });
    }

    // --- FAKE "REAL-STYLE" DATA ---
    // Imagine this came from a real scanner (OMR) in the future.
    // Each note has a pitch like "C4", "F#4", etc.
    const rawMeasures = [
      {
        number: 1,
        notes: [
          { pitch: "C4" },
          { pitch: "D4" },
          { pitch: "E4" },
          { pitch: "F#4" },
        ],
      },
      {
        number: 2,
        notes: [
          { pitch: "G4" },
          { pitch: "A4" },
          { pitch: "B4" },
          { pitch: "C5" },
        ],
      },
      {
        number: 3,
        notes: [
          { pitch: "F4" },
          { pitch: "G#4" },
          { pitch: "A4" },
          { pitch: "B4" },
        ],
      },
    ];

    // Convert to the structure the frontend uses
    const measures = mapRawMeasuresToDisplay(rawMeasures);

    return new Response(
      JSON.stringify({
        message: "File received (fake real-style notes)",
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
