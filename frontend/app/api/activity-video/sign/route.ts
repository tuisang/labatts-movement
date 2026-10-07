import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { isCoach } from "@/lib/coachAuth";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const UPLOAD_FOLDER = "labatts-movement/activity-videos";

// Issues a Cloudinary upload signature so the browser can upload the video
// file directly to Cloudinary (bypassing our server, which can't handle
// large request bodies on Vercel's serverless functions). Only coaches may
// request a signature — this is the gate that keeps uploads admin-only.
export async function POST() {
  if (!(await isCoach())) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    return NextResponse.json(
      { error: "Cloudinary is not configured on the server." },
      { status: 500 }
    );
  }

  const timestamp = Math.round(Date.now() / 1000);

  // Only these params may be included in the signed upload — the client
  // must send exactly this set back, or Cloudinary will reject it.
  const paramsToSign = {
    timestamp,
    folder: UPLOAD_FOLDER,
    resource_type: "video",
  };

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET
  );

  return NextResponse.json({
    signature,
    timestamp,
    folder: UPLOAD_FOLDER,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  });
}
