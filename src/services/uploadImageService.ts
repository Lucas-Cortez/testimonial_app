import { UploadApiResponse } from "cloudinary";

export const uploadImageService = async (file: File) => {
  const response = await fetch("/api/upload", { method: "POST" });

  const signData = (await response.json()) as {
    url: string;
    options: {
      timestamp: number;
      signature: string;
      cloudName: string;
      apiKey: string;
    };
  };

  const options = signData.options;
  const formData = new FormData();

  formData.append("file", file);
  formData.append("api_key", options.apiKey);
  formData.append("timestamp", String(options.timestamp));
  formData.append("signature", options.signature);
  // formData.append("transformations", "ar_1.0,c_fill,g_auto,h_96,r_max,w_96");
  // formData.append("eager", "ar_1.0,c_fill,h_96,w_96|r_max");
  // formData.append("public_id", "sample_image");

  const uploadResponse = await fetch(signData.url, {
    method: "POST",
    body: formData,
  });

  const data = (await uploadResponse.json()) as UploadApiResponse;

  console.log(data);

  return { imageUrl: data.secure_url };
};
