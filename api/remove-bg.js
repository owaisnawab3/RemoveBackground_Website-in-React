
export default async function handler(request) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405
    });
  }

  try {
    const apiKey = process.env.REMOVE_BG_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "API key is missing." }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    const formData = await request.formData();
    const imageFile = formData.get("image_file");
    const imageUrl = formData.get("image_url");

    const apiFormData = new FormData();

    if (imageFile instanceof File) {
      apiFormData.append(
        "image_file",
        imageFile,
        imageFile.name
      );
    } else if (typeof imageUrl === "string" && imageUrl) {
      apiFormData.append("image_url", imageUrl);
    } else {
      return new Response(
        JSON.stringify({ error: "No image provided." }),
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://api.remove.bg/v1.0/removebg",
      {
        method: "POST",
        headers: {
          "X-Api-Key": apiKey
        },
        body: apiFormData
      }
    );

    const result = await response.arrayBuffer();

    return new Response(result, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") ||
          "application/octet-stream"
      }
    });
  } catch (error) {
    console.error("Background removal failed:", error);

    return new Response(
      JSON.stringify({ error: "API request failed." }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}
