import { cloudinary } from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export function POST(request: NextRequest) {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request({ opa: "op" }, cloudinary.config().api_secret!);

  const signedUrl = cloudinary.utils.api_url("upload", {
    cloud_name: cloudinary.config().cloud_name,
    api_key: cloudinary.config().api_key,
    timestamp: timestamp,
    signature: signature,
    upload_preset: "seu-upload-preset",
  });

  // console.log(signedUrl);

  return NextResponse.json({ signedUrl });
}
