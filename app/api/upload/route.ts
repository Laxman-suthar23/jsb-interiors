import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "jsb-interiors";

    if (!cloudName) {
      return NextResponse.json({ error: "Cloudinary not configured" }, { status: 500 });
    }

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", uploadPreset);
    uploadData.append("folder", "jsb-interiors");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: uploadData }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message ?? "Upload failed");
    }

    return NextResponse.json({ url: data.secure_url, publicId: data.public_id });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
  }
}
