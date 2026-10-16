import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { isCoach } from "@/lib/coachAuth";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const UPLOAD_FOLDER = "labatts-movement/equipment";

// Signed direct-upload parameters for equipment photos. Coach-only.
export async function POST() {
  if (!(await isCoach())) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    return NextResponse.json({ error: "Cloudinary is not configured on the server." }, { status: 500 });
  }

  const timestamp = Math.round(Date.now() / 1000);
  // Only timestamp + folder are signed (see the video sign route for why).
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: UPLOAD_FOLDER },
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
