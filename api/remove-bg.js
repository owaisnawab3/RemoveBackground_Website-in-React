
// export default async function handler(request) {
//   if (request.method !== "POST") {
//     return new Response("Method not allowed", {
//       status: 405
//     });
//   }

//   try {
//     const apiKey = process.env.REMOVE_BG_API_KEY;

//     if (!apiKey) {
//       return new Response(
//         JSON.stringify({ error: "API key is missing." }),
//         {
//           status: 500,
//           headers: {
//             "Content-Type": "application/json"
//           }
//         }
//       );
//     }

//     const formData = await request.formData();
//     const imageFile = formData.get("image_file");
//     const imageUrl = formData.get("image_url");

//     const apiFormData = new FormData();

//     if (imageFile instanceof File) {
//       apiFormData.append(
//         "image_file",
//         imageFile,
//         imageFile.name
//       );
//     } else if (typeof imageUrl === "string" && imageUrl) {
//       apiFormData.append("image_url", imageUrl);
//     } else {
//       return new Response(
//         JSON.stringify({ error: "No image provided." }),
//         { status: 400 }
//       );
//     }

//     const response = await fetch(
//       "https://api.remove.bg/v1.0/removebg",
//       {
//         method: "POST",
//         headers: {
//           "X-Api-Key": apiKey
//         },
//         body: apiFormData
//       }
//     );

//     const result = await response.arrayBuffer();

//     return new Response(result, {
//       status: response.status,
//       headers: {
//         "Content-Type":
//           response.headers.get("content-type") ||
//           "application/octet-stream"
//       }
//     });
//   } catch (error) {
//     console.error("Background removal failed:", error);

//     return new Response(
//       JSON.stringify({ error: "API request failed." }),
//       {
//         status: 500,
//         headers: {
//           "Content-Type": "application/json"
//         }
//       }
//     );
//   }
// }



import { IncomingForm } from "formidable";
import fs from "node:fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  try {
    const apiKey = process.env.REMOVE_BG_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "API key is missing.",
      });
    }

    const form = new IncomingForm();

    const [fields, files] = await form.parse(req);

    const uploadedFile = Array.isArray(files.image_file)
      ? files.image_file[0]
      : files.image_file;

    const imageUrl = Array.isArray(fields.image_url)
      ? fields.image_url[0]
      : fields.image_url;

    const apiFormData = new FormData();

    if (uploadedFile) {
      const fileBuffer = await fs.readFile(uploadedFile.filepath);

      const imageBlob = new Blob([fileBuffer], {
        type: uploadedFile.mimetype || "application/octet-stream",
      });

      apiFormData.append(
        "image_file",
        imageBlob,
        uploadedFile.originalFilename || "image.png"
      );
    } else if (typeof imageUrl === "string" && imageUrl) {
      apiFormData.append("image_url", imageUrl);
    } else {
      return res.status(400).json({
        error: "No image provided.",
      });
    }

    const response = await fetch(
      "https://api.remove.bg/v1.0/removebg",
      {
        method: "POST",
        headers: {
          "X-Api-Key": apiKey,
        },
        body: apiFormData,
      }
    );

    const result = Buffer.from(await response.arrayBuffer());

    res.status(response.status);
    res.setHeader(
      "Content-Type",
      response.headers.get("content-type") ||
        "application/octet-stream"
    );

    return res.send(result);
  } catch (error) {
    console.error("Background removal failed:", error);

    return res.status(500).json({
      error: "API request failed.",
    });
  }
}
