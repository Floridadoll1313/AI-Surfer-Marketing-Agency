export async function onRequest(context) {
  const apiKey = context.env.GEMINI_API_KEY;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: "Explain how AI works in a few words." }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response";

    return new Response(text, {
      headers: { "Content-Type": "text/plain" }
    });

  } catch (err) {
    return new Response("Error: " + err.message, {
      status: 500,
      headers: { "Content-Type": "text/plain" }
    });
  }
}