import { cloudinary } from "@/lib/cloudinary";
import { envServer } from "@/utils/helpers/env";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  cloudinary.configEnvironment();

  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      // eager: "c_pad,h_300,w_400|c_crop,h_200,w_260",
      // eager: options.transformations,
      // transformations: options.transformations,
      // public_id: "sample_image",
      // ...options,
    },
    envServer.CLOUDINARY_API_SECRET,
  );

  console.log(timestamp, signature);

  const url = cloudinary.utils.api_url("upload");

  console.log(url);

  return NextResponse.json({
    url,
    options: {
      timestamp,
      signature,
      cloudName: envServer.CLOUDINARY_CLOUD_NAME,
      apiKey: envServer.CLOUDINARY_API_KEY,
    },
  });
}
