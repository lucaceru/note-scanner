export async function POST(request) {
  try {
    // Read the form data (file uploaded)
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
      });
    }

    // TEMP: respond with success (we'll add real OMR logic later)
    return new Response(
      JSON.stringify({
        message: "File received",
        filename: file.name,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
